"use client"; // Ensure this is a Client Component

import React, { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { Backdrop } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./global.css"


const useStyles = makeStyles((theme) => ({
    backdrop: {
        color: '#F5F5F7',
    },
}));
export default function Spinner() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        // Simulate loading for 3 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Change duration as needed

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div className="spinner">
            <Backdrop className={classes.backdrop} open={true}>
                <ScaleLoader size={80} color="#705C53" />
            </Backdrop>
        </div>
    );
}