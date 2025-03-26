"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Privacypolicy() {
    return (
        <div className="container  mx-auto p-4">
            <div className="bg-gray-100 p-4">
                <h2 className="text-center font-bold text-2xl">Privacy Policy</h2>
                <div className="p-2 justify-between" >
                    <Link href="/">
                        <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className=" w-full p-4">
                    <div className="overflow-x-auto">
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <ul className="list-disc list-inside mb-6">
                            <li><strong>Personal Data:</strong> When you register or interact with our platform, we may collect your name, email address, and contact information.</li>
                            <li><strong>Device Data:</strong> We may gather data about your device, browser, and IP address for analytical purposes.</li>
                            <li><strong>Cookies:</strong> We use cookies to enhance your user experience and analyze website traffic.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <ul className="list-disc list-inside mb-6">
                            <li>To provide personalized product comparisons and recommendations.</li>
                            <li>To analyze website performance and improve our services.</li>
                            <li>To communicate updates, offers, and support messages.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
                        <p className="mb-6">
                            ChoosePhone contains links to third-party websites like Amazon, Flipkart, Croma, TataCliq, Reliance Digital, Vijay Sales, and Poorvika. Please review their privacy policies before providing any personal data.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                        <p className="mb-6">
                            You have the right to access, modify, or delete your data. For any privacy concerns, please contact us at support@choosephone.com.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p>
                            If you have any questions regarding this Privacy Policy, feel free to reach out to us at support@choosephone.com.
                        </p>

                        <p className="text-lg font-semibold mt-6">Thank you for choosing ChoosePhone!</p>
                    </div>
                </div>
            </div>
        </div>

    );
}