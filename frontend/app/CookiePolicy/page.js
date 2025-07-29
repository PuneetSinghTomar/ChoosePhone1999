"use client";

import React from "react";
import Link from "next/link";

export default function Cookiepolicy() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Cookie Policy</h2>
        <div className="p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-4">
          <div className="overflow-x-auto">
            <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

            <section className="mb-8">
              <p>
                This Cookie Policy explains how <strong>ChoosePhone</strong> uses cookies and similar technologies on our website.
                By using our site, you consent to the use of cookies in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files placed on your device to help the website recognize you, store preferences, improve your experience,
                and analyze usage data. Some cookies are essential for site functionality, while others help us improve performance or deliver personalized ads.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <ul className="list-disc list-inside">
                <li>To remember your preferences and settings</li>
                <li>To analyze website traffic and user interactions</li>
                <li>To display personalized advertisements using services like Google AdSense</li>
                <li>To track affiliate link performance (e.g., Amazon, Flipkart)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
              <p>
                We may use third-party services such as Google AdSense and Google Analytics, which set their own cookies to collect usage
                statistics and display ads based on your interests. You can opt out of Google personalized ads by visiting{" "}
                <a className="text-blue-600 underline" href="https://www.google.com/settings/ads" target="_blank">Google Ads Settings</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p>
                You can control or delete cookies from your browser settings at any time. Disabling cookies may affect the functionality of some parts of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Please revisit this page regularly to stay informed about our use of cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at{" "}
                <a className="text-blue-600 underline" href="mailto:support@choosephone.com">support@choosephone.com</a>.
              </p>
            </section>

            <p className="text-lg font-semibold">Thank you for using ChoosePhone!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
