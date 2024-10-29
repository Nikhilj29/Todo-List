
"use client"

import React, { useState, useEffect, useReducer, useRef } from 'react';
import SideBar from '../Sidebar';
import "../dateStyles.css";
import { Button } from '@mui/material';
import useStore from '../store';
import axios from 'axios';

const Navbar = ({ viewType, setViewType }) => {
    return (
        <center>
            <div style={{ marginBottom: "10px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "#705C53", width: "60rem", height: "3rem" }}>
                <Button style={{ backgroundColor: viewType === "month" ? "#F5F5F7" : "#705C53", color: viewType === "month" ? "#705C53" : "#F5F5F7" }} onClick={() => setViewType('month')} disabled={viewType === 'month'}>
                    Month View
                </Button>
                <Button style={{ backgroundColor: viewType === "week" ? "#F5F5F7" : "#705C53", color: viewType === "week" ? "#705C53" : "#F5F5F7" }} onClick={() => setViewType('week')} disabled={viewType === 'week'}>
                    Week View
                </Button>
                <Button style={{ backgroundColor: viewType === "day" ? "#F5F5F7" : "#705C53", color: viewType === "day" ? "#705C53" : "#F5F5F7" }} onClick={() => setViewType('day')} disabled={viewType === 'day'}>
                    Day View
                </Button>
            </div>
        </center>
    );
};

const Calendar = () => {
    const [todo, setTodo] = useState({});
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [viewType, setViewType] = useState('month');
    const [selectedDate, setSelectedDate] = useState(null);
    const { todos } = useStore();
    const hasRunned = useRef(false);

    useEffect(() => {

        // if (hasRunned.current) return;
        // if (todos.length !== 0) {
        //     todos.map(todo => {
        //         addTodo(todo.fdate, todo.todo);
        //     });
        // }
        // hasRunned.current = true;
        // console.log("Add");
        getTodo();
    }, []);

    async function getTodo() {
        const response = await axios.post("http://localhost:5000/getAll");
        const data = response.data;

        if (data.length !== 0) {
            data.map((t) => {
                if (t.completed !== "false") {
                    console.log(t);
                    addTodo(t.fdate, t.todo);
                }
            })
        }
    }

    const addTodo = (date, eventData) => {
        const dateString = date;
        setTodo(prevTodo => ({
            ...prevTodo,
            [dateString]: [...(prevTodo[dateString] || []), eventData]
        }));
    };

    const renderWeekdays = () => {
        const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return (
            <tr>
                {weekdays.map(day => (
                    <th key={day} className="weekday">{day}</th>
                ))}
            </tr>
        );
    };

    const DayView = ({ date, onBack }) => {
        const dateString = date.toDateString();
        const dailyEvents = todo[dateString] || [];
        return (
            <div>
                <h3>{date.toDateString()}</h3>
                {dailyEvents.length > 0 ? (
                    <ul>
                        {dailyEvents.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No events for this day.</p>
                )}
                <Button style={{ color: "#705C53", backgroundColor: "#F5F5F7" }} onClick={onBack}>Back to Calendar</Button>
            </div>
        );
    };

    const renderCalendar = () => {
        if (viewType === 'month') {
            const totalDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
            const days = [];
            const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
            const startOffset = firstDay === 0 ? 6 : firstDay - 1;

            for (let i = 0; i < startOffset; i++) {
                days.push(<td key={`empty-${i}`} className="day empty"></td>);
            }

            for (let i = 1; i <= totalDays; i++) {
                const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
                const dateString = currentDate.toDateString();
                days.push(
                    <td key={i} className="day" onClick={() => {
                        setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
                        setViewType('day');
                    }}>
                        {i}
                        {todo[dateString] && todo[dateString].map((event, index) => (
                            <div key={index} className="event">{event}</div>
                        ))}
                    </td>
                );
            }

            const calendarRows = [];
            while (days.length) {
                calendarRows.push(<tr key={calendarRows.length}>{days.splice(0, 7)}</tr>);
            }
            return calendarRows;

        } else if (viewType === 'week') {
            const weekStart = new Date(currentMonth);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Move to Monday
            const days = [];

            for (let i = 0; i < 7; i++) {
                const dateToRender = new Date(weekStart);
                const dateString = dateToRender.toDateString();
                days.push(
                    <td key={i} className="day" onClick={() => {
                        setSelectedDate(new Date(weekStart));
                        setViewType('day');
                    }}>
                        {weekStart.getDate()}
                        {todo[dateString] && todo[dateString].map((event, index) => (
                            <div key={index} className="event">{event}</div>
                        ))}
                    </td>
                );
                weekStart.setDate(weekStart.getDate() + 1);
            }

            return <tr>{days}</tr>;

        } else {
            return null; // Return null if not in month or week view
        }
    };

    const goToPrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <SideBar style={{ position: "fixed" }} />
            <div style={{ flex: 1, textAlign: "center", height: "90vh", width: "95%", marginTop: "0px" }}>
                <h2>
                    {viewType === 'month' ? `${monthName} ${year}` :
                        viewType === 'week' ? 'Week View' :
                            selectedDate ? selectedDate.toDateString() : 'Day View'}
                </h2>
                <Navbar viewType={viewType} setViewType={setViewType} />

                <center>
                    <div>
                        <Button style={{ color: "#705C53", backgroundColor: "#F5F5F7" }} onClick={goToPrevMonth}>Previous</Button>
                        <Button style={{ color: "#705C53", backgroundColor: "#F5F5F7" }} onClick={goToNextMonth}>Next</Button>
                    </div>
                </center>
                <table className="calendar" style={{ margin: "0 auto", border: "2px #705C53 solid" }}>
                    <thead>
                        {renderWeekdays()}
                    </thead>
                    <tbody>
                        {renderCalendar()}
                    </tbody>
                </table>
                {viewType === 'day' && selectedDate && (
                    <div style={{ marginTop: "20px" }}>
                        <DayView date={selectedDate} onBack={() => setViewType('month')} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
