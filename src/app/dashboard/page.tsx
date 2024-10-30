import React from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { getTasks } from "../products/products.api";
import { TaskCard } from "@/components/TaskCard";

const DashboardPage = async () => {
    
    const tasks = await getTasks()
    console.log(tasks)
    
    return <div className="p-5 w-full">
        <div className="flex justify-between w-full">    
            <h1 className="text-2xl font-bold" >Manejo de tareas</h1>
            <Link href="/products/new" className=" p-2 bg-green-600 font-semibold text-lg rounded-xl text-white">
                Crear Tarea
            </Link>
            
        </div>
        <div className="mt-5 grid md:grid-cols-2 xl:grid-cols-4 gap-3">
            {tasks.map((task: any) => (
                <TaskCard task={task} key={task.id} />
            ))}
        </div>
    </div>;
    
};

export default DashboardPage;