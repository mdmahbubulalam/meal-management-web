"use client"
import { Spinner } from "@material-tailwind/react";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex justify-center"><Spinner className="h-10 w-10 text-blue-700/20"/> </div>
}