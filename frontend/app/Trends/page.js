"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Trends() {
    return (
        <div className="container  mx-auto p-4">
            <div className="bg-gray-100 p-4">
                <h2 className="text-center font-bold text-2xl">Trends</h2>
                <div className="p-2 justify-between" >
                    <Link href="/">
                        <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className=" w-full p-4">
                    <div className="overflow-x-auto">
                        <div className="flex flex-col items-center justify-center h-screen text-center">
                            <h1 className="text-4xl font-bold mb-4">🚧 Under Construction 🚧</h1>
                            <p className="text-lg mb-6">Our Trends page is currently in the works! Stay tuned for the latest updates.</p>
                            <Link href="/">
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Back to Home</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}