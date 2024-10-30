"use client"
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";

const AppBar = () => {
    return (
        <header className="text-lg font-bold flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
            <Link className="transition-colors hover:text-blue-500" href={"/"}>
                Pagina de Inicio
            </Link>
            <Link
                className="text-lg font-bold transition-colors hover:text-blue-500"
                href={"/dashboard"}
            >
            DashBoard
            </Link>
            <SignInButton/>
        </header>
    );
};

export default AppBar;