"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Termsofservice() {
    return (
        <div className="container  mx-auto p-4">
            <div className="bg-gray-100 p-4">
                <h2 className="text-center font-bold text-2xl">Terms of Policy</h2>
                <div className="p-2 justify-between" >
                    <Link href="/">
                        <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className=" w-full p-4">
                    <div className="overflow-x-auto">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p>
                                Welcome to <strong>ChoosePhone</strong>. By using our website, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
                            <p>
                                By accessing and using our website, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to abide by these terms, please do not use our services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. Use of Our Services</h2>
                            <p>
                                You agree to use ChoosePhone only for lawful purposes. You are prohibited from using the site in any way that may harm others, disrupt the service, or violate any applicable laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                            <p>
                                All content, including text, graphics, logos, and images, on ChoosePhone is the property of ChoosePhone or its content providers and protected by applicable intellectual property laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
                            <p>
                                ChoosePhone is not responsible for any damages arising from your use of our website. Our platform provides comparisons and recommendations, but final purchasing decisions are your responsibility.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
                            <p>
                                We may update these Terms of Service from time to time. It is your responsibility to review them periodically. Continued use of our website constitutes acceptance of the updated terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                            <p>
                                If you have any questions or concerns regarding these Terms of Service, please contact us at <strong>support@choosephone.com</strong>.
                            </p>
                        </section>

                        <p className="text-lg font-semibold">Thank you for using ChoosePhone!</p>
                    </div>
                </div>
            </div>
        </div>

    );
}