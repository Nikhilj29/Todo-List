"use client"

import Home from "./home/page";
import React from "react";
import Spinner from "./Spinner";
import Head from "next/head";

export default function Page() {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 5000)
    }, []);

    return (
        <>
            <Head><title>Todo List</title></Head>
            {show ? <Home /> : <Spinner />}
        </>
    )
}