"use client";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
    username: string;
    email: string;
    password: string;
};

const SignupPage = () => {
    const register = async () => {
    const res = await fetch(Backend_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify({
        username: data.current.username,
        email: data.current.email,
        password: data.current.password,
        }),
        headers: {
        "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        alert(res.statusText);
        return;
    }
    const response = await res.json();
    alert("Usuario Registrado!");
    console.log({ response });
    };
    const data = useRef<FormInputs>({
        username: "",
        email: "",
        password: "",
    });
    return (
    <div className="m-2 border rounded overflow-hidden shadow">
        <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Registrarse
        </div>
        <div className="p-2 flex flex-col gap-6">
        <InputBox
            autoComplete="off"
            name="name"
            labelText="Nombre de usuario"
            required
            onChange={(e) => (data.current.username = e.target.value)}
        />
        <InputBox
            name="email"
            labelText="Correo Electrónico"
            required
            onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
            name="password"
            labelText="Contraseña"
            type="password"
            required
            onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
            <Button onClick={register}>Registrarse</Button>
            <Link className="" href={"/"}>
            Cancelar
            </Link>
        </div>
        </div>
    </div>
    );
};

export default SignupPage;