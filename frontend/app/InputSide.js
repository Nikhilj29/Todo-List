import React from "react";
import "./global.css"
import Link from "next/link";
import { Button } from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function InputSide() {
    return (
        <>
            <div className="inputSide">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Link href="/Daily">
                        <Button style={{ color: "black", marginTop: "1rem" }}><AddBoxRoundedIcon sx={{ color: "#705C53", height: "1.5rem", width: "1.5rem" }} />Today</Button>
                    </Link>
                    <Link href="/NXTWeek">
                        <Button style={{ color: "black", marginTop: "1rem" }}> <AddBoxRoundedIcon sx={{ color: "#705C53", height: "1.5rem", width: "1.5rem" }} />Next Week</Button>
                    </Link>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Link href="/input">
                        <Button style={{ color: "black", marginTop: "1rem" }}> <CheckCircleRoundedIcon sx={{ color: "#705C53", height: "1.5rem", width: "1.5rem" }} />Completed</Button>
                    </Link>
                    <Link href="/input">
                        <Button style={{ color: "black", marginTop: "1rem" }}> <DeleteRoundedIcon sx={{ color: "#705C53", height: "1.5rem", width: "1.5rem" }} />Delete</Button>
                    </Link>
                </div>

            </div>
        </>
    )
}