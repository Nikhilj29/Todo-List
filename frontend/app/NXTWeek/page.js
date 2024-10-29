"use client";

import React, { useReducer } from "react";
import SideBar from "../Sidebar";
import InputSide from "../InputSide";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { Button, Card, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useStore from "../store";
import dayjs from "dayjs";
import axios from "axios";

function Today() {
    const { todos, addTodo, clearTodo } = useStore();
    const [todo, setTodo] = React.useState("");
    const [fdate, setFDate] = React.useState(dayjs());
    const [tdate, setTDate] = React.useState(dayjs());
    const [select, setSelect] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false); // Modal open state
    const [modalPosition, setModalPosition] = React.useState({ top: 0, left: 0 }); // Modal position state
    const onceCall = React.useRef(false);

    React.useEffect(() => {
        if (!onceCall.current) {
            clearTodo();
            getNext();
        }
        onceCall.current = true
    }, [])


    async function sendCompleted(e) {
        const todo = todos[e];
        await axios.post("http://localhost:5000/update", { todo });
    }


    async function getNext() {
        const today = dayjs();
        const tooday = today.format("ddd MMM DD YYYY")
        try {
            const res = await axios.post("http://localhost:5000/sendNext", {});
            const data = res.data;

            if (data.length !== 0) {

                data.forEach((e) => {
                    addTodo(e.fdate, e.tdate, e.todo);
                });
            }
        } catch (err) {
            alert("ERROR");
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const formatfDate = fdate.format("ddd MMM DD YYYY");
        const formattDate = tdate.format("ddd MMM DD YYYY");
        addTodo(formatfDate, todo);
        setFDate(dayjs());
        setTDate(dayjs());
        setTodo("");
        let newdata = { todo, formatfDate, formattDate, select };

        try {
            await axios.post("http://localhost:5000/getTodo", { newdata });
        } catch (err) {
            alert("error");
        }
    }

    const handleToggle = (event) => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            const { top, left, height } = event.currentTarget.getBoundingClientRect();
            const modalHeight = 300; // Set the height of your modal
            const viewportHeight = window.innerHeight;

            // Calculate the position ensuring the modal stays within the viewport
            const calculatedTop = top + height + window.scrollY;
            const newTop = calculatedTop + modalHeight > viewportHeight ? top - modalHeight + window.scrollY : calculatedTop;

            setModalPosition({ top: newTop, left: left + window.scrollX });
        }
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <SideBar />
                <InputSide />
                <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                    <Card sx={{ height: "13rem" }}>
                        <div style={{ display: "flex", flexDirection: "row", margin: "1rem" }}>
                            <MenuOpenRoundedIcon sx={{ width: "2.5rem", height: "2.5rem", color: "#705C53", marginTop: "1.3rem" }} />
                            <h1 style={{ marginLeft: "1rem" }}>Next Week Task</h1>
                        </div>
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            fullWidth={true}
                            sx={{ width: "95%", marginLeft: "2rem" }}
                            onChange={(e) => { setTodo(e.target.value) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button onClick={handleToggle}>
                                            <MenuOpenRoundedIcon sx={{ width: "2.5rem", height: "2.5rem", color: "#705C53" }} />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Card>

                    {todos.length === 0 ? <h1 style={{ marginLeft: "2rem" }}>No Task till Next Week Take Chill!!</h1> : (
                        <ul>
                            {todos.map((todo, index) => (
                                <li key={index}>{todo.todo}
                                    <Button onClick={() => { sendCompleted(index) }} sx={{ color: "#705C53" }}>Completed</Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Modal / Pop-up component */}
            {isOpen && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: "12rem",
                        left: "70rem",
                        backgroundColor: 'white',
                        boxShadow: 3,
                        borderRadius: 2,
                        padding: 3,
                        zIndex: 10,
                        width: 300,
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="From Date"
                            value={fdate}
                            onChange={(newValue) => setFDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="To Date"
                            value={tdate}
                            onChange={(newValue) => setTDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel>Repeat</InputLabel>
                        <Select
                            value={select}
                            label="Recurression"
                            onChange={(e) => setSelect(e.target.value)}
                        >
                            <MenuItem value={"Daily"}>Daily</MenuItem>
                            <MenuItem value={"Weekly"}>Weekly</MenuItem>
                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                            <MenuItem value={"Yearly"}>Yearly</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 2 }}>
                        <Button onClick={handleToggle}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" sx={{ marginLeft: 1 }}>
                            Add
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Today;
