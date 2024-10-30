"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/app/products/products.api";

export function TaskCard({ task }: any) {
    const router = useRouter();
    async function handleRemoveTask(id: string){
        const result = await deleteTask(id);
        router.push("/dashboard")
    }
    return (
    <Card>
        <CardHeader>
        <CardTitle className="flex justify-between">
            {task.title}
            <span className="text-sm font-bold text-gray-500">
            {task.status}
            </span>
        </CardTitle>
        </CardHeader>
        <CardContent>
            <p><span className="font-bold">Descripción: </span>{task.description}</p>
            <p><span className="font-bold">Fecha: </span>{task.dueDate}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button
            className="mt-5"
            onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${task.id}/edit`);
            }}
            >
            Editar
            </Button>
            <Button
            className="mt-5"
            variant="destructive"
            onClick={(e) => {
                e.stopPropagation();
                handleRemoveTask(task.id);
            }}
            >
            Eliminar
            </Button>
        </CardFooter>
    </Card>
    );
}