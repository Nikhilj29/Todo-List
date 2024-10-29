"use client"

import React from "react";
import "./global.css";
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import { useRouter } from "next/router";
import Link from "next/link";

export default function SideBar() {


    return (
        <div className="sidebar">
            <div className="space">
                <Link href="/home" >
                    <PermContactCalendarRoundedIcon sx={{ width: "2.5rem", height: "2.5rem", color: "#705C53" }} />
                </Link>
                <Link href="/input">
                    <CheckBoxRoundedIcon sx={{ width: "2.5rem", height: "2.5rem", color: "#705C53" }} />
                </Link>
                <Link href="/Date">
                    <CalendarMonthRoundedIcon sx={{ width: "2.5rem", height: "2.5rem", color: "#705C53" }} />
                </Link>

            </div>
            <div className="space">
                // <NotificationsRoundedIcon sx={{ width: "2.5rem", height: "2.5rem", color: "#705C53" }} />
                // <HelpRoundedIcon sx={{ width: "2.5rem", height: "2.5rem", color: "#705C53" }} />
            </div>
        </div>
    );
}
