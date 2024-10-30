"use client";
import { createTask } from "../products.api";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { isAfter, startOfToday } from "date-fns";

export default function TaskForm({ task }: any) {
    const [dueDate, setDueDate] = useState<Date | null>(task?.dueDate ? new Date(task.dueDate) : null);
    const [status, setStatus] = useState(task?.status || ""); 
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        // Validar que la fecha de vencimiento no sea anterior a la fecha actual
        if (dueDate && !isAfter(dueDate, startOfToday())) {
            setError("dueDate", { type: "manual", message: "La fecha de vencimiento debe ser hoy o una fecha futura." });
            return;
        }

        const formData = { ...data, dueDate, status };
        await createTask({ ...formData });
        router.push("/dashboard");
    });

    return (
        <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Titulo</Label>
                    <Input 
                        id="title" 
                        defaultValue={task?.title} 
                        {...register("title", { required: "El título es obligatorio." })} 
                        placeholder="Nombre tarea" 
                    />
                    {errors.title && <span className="text-red-500">{errors.title.message as string}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Descripción</Label>
                    <Input 
                        id="description" 
                        defaultValue={task?.description} 
                        {...register("description", { required: "La descripción es obligatoria." })} 
                        placeholder="Descripción de la tarea" 
                    />
                    {errors.description && <span className="text-red-500">{errors.description.message as string}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="dueDate">Fecha Vencimiento</Label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="input w-full p-2"
                        placeholderText="Selecciona la fecha de vencimiento"
                    />
                    {errors.dueDate && <span className="text-red-500">{errors.dueDate.message as string}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">Estado</Label>
                    <Select
                        onValueChange={(value) => setStatus(value)}
                        value={status}
                    >
                        <SelectTrigger id="state">
                            <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="en progreso">En progreso</SelectItem>
                            <SelectItem value="completada">Completada</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Crear Tarea
                </button>
            </div>
        </form>
    );
}
