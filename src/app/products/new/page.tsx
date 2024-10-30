import * as React from "react";
import "react-datepicker/dist/react-datepicker.css";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import TaskForm from "./task-form"; 
import { getTask } from "../products.api"; 

interface Props {
    params: {
        id: string;
    }
}

export default async function CardWithForm({ params }: Props) {
    // Asegúrate de que `params` se resuelva antes de acceder a sus propiedades
    const { id } = await params; // Espera a que se resuelva `params`
    const task = id ? await getTask(id) : null; // Obtener la tarea si hay un ID

    return (
        <Card className="w-[500px] mx-auto mt-10">
            <CardHeader>
                <CardTitle>{task ? "Editar Tarea" : "Crear Tarea"}</CardTitle>
                <CardDescription>Describe lo que quieres hacer.</CardDescription>
            </CardHeader>
            <CardContent>
                <TaskForm task={task} />
            </CardContent>
        </Card>
    );
}
