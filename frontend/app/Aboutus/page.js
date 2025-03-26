"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Aboutus() {
    return (
        <div className="container  mx-auto p-4">
            <div className="bg-gray-100 p-4">
                <h2 className="text-center font-bold text-2xl">About Us</h2>
                <div className="p-2 justify-between" >
                    <Link href="/">
                        <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className=" w-full p-4">
                    <div className="overflow-x-auto">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="mb-6">
                            At <strong>ChoosePhone</strong>, our mission is simple: to help you make informed purchasing decisions by providing accurate comparisons, detailed specifications, and real-time pricing from trusted online retailers. We bring you all the essential information in one place, saving you time and effort.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">Why ChoosePhone?</h2>
                        <ul className="list-disc list-inside mb-6">
                            <li><strong>Comprehensive Comparisons:</strong> Compare the latest smartphones, tablets, laptops, smartwatches, and other electronic devices effortlessly.</li>
                            <li><strong>Real-Time Prices:</strong> Get updated pricing from popular retailers like Amazon, Flipkart, Croma, TataCliq, Reliance Digital, Vijay Sales, and Poorvika.</li>
                            <li><strong>Expert Insights:</strong> Our platform offers honest reviews and insightful recommendations to help you make the best choice.</li>
                            <li><strong>User-Friendly Experience:</strong> With an intuitive interface, finding your ideal device has never been easier.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                        <ul className="list-disc list-inside mb-6">
                            <li><strong>Transparency:</strong> We prioritize accurate and up-to-date information.</li>
                            <li><strong>Convenience:</strong> All comparisons, reviews, and prices are available in one place.</li>
                            <li><strong>Trust:</strong> We collaborate only with reliable online retailers to ensure you get the best deals.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                        <p className="mb-6">
                            Have questions or need assistance? Our dedicated support team is here to help. Connect with us anytime for personalized recommendations and guidance.
                        </p>

                        <p className="text-lg font-semibold">
                            <strong>ChoosePhone</strong> – Your Smart Shopping Companion!
                        </p>
                        <blockquote className="italic mt-6">
                            “Empowering Your Choices, One Device at a Time.”
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
  );
}