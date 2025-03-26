"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Affiliatediscloser() {
    return (
        <div className="container  mx-auto p-4">
            <div className="bg-gray-100 p-4">
                <h2 className="text-center font-bold text-2xl">Affiliate Discloser</h2>
                <div className="p-2 justify-between" >
                    <Link href="/">
                        <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className=" w-full p-4">
                    <div className="overflow-x-auto">
                        <h1 className="text-3xl font-bold mb-6">Affiliate Disclosure</h1>

                        <section className="mb-8">
                            <p>
                                At <strong>ChoosePhone</strong>, we believe in transparency and are committed to providing honest information to our users. As part of our service, we participate in various affiliate marketing programs. This means we may earn a commission when you make a purchase through links on our site.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">How Affiliate Links Work</h2>
                            <p>
                                Some of the links on ChoosePhone are affiliate links, which means we may receive a small commission at no extra cost to you when you click through and complete a purchase. These commissions help us keep our platform running and continue to offer valuable content.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
                            <ul className="list-disc list-inside">
                                <li>We only recommend products and services that we believe offer value to our users.</li>
                                <li>Affiliate commissions do not influence our product comparisons, reviews, or recommendations.</li>
                                <li>Your trust is our priority, and we strive to provide unbiased, accurate information.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Affiliate Partners</h2>
                            <p>
                                Our site may contain links from trusted affiliate partners such as Amazon, Flipkart, Croma, TataCliq, Reliance Digital, Vijay Sales, and Poorvika. By purchasing through these links, you are supporting ChoosePhone without incurring any additional cost.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
                            <p>
                                If you have any questions about our affiliate disclosure or would like further information, please contact us at <strong>support@choosephone.com</strong>.
                            </p>
                        </section>

                        <p className="text-lg font-semibold">Thank you for supporting ChoosePhone!</p>
                    </div>
                </div>
            </div>
        </div>

    );
}