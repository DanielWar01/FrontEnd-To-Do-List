"use server"
import { Backend_URL } from "@/lib/Constants";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function createTask(taskData: any){
    const session = await getServerSession(authOptions);
    const userId = session?.user.id
    
    const res = await fetch(Backend_URL+"/task", {
        method: "POST",
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...taskData, userId})
    })
    const data = await res.json()
}

export async function getTasks(){
    const session = await getServerSession(authOptions);
    const userId = session?.user.id
    
    const res = await fetch(Backend_URL+"/task", {
        method: "GET",
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        }
    })
    const data = await res.json()
    return data.filter((task : any) => userId == task.userId)
}

export async function deleteTask(id: string){
    const session = await getServerSession(authOptions);
    
    const res = await fetch(`${Backend_URL}/task/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        }
    })
    const data = await res.json()
    return data
}

export async function getTask(id: string){
    const session = await getServerSession(authOptions);
    
    const res = await fetch(`${Backend_URL}/task/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        }
    })
    const data = await res.json()
    return data
}

