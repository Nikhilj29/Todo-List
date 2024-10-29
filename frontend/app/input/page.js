import React from "react";
import SideBar from "../Sidebar";
import InputSide from "../InputSide";

export default function Input() {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <SideBar />
            <InputSide />
        </div>
    )
}
