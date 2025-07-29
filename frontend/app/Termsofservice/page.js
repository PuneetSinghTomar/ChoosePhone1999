"use client";

import React from "react";
import Link from "next/link";

export default function Termsofservice() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Terms of Service</h2>
        <div className="p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-4">
          <div className="overflow-x-auto">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to <strong>ChoosePhone</strong>. By accessing or using our website, you agree to comply with and be bound by the following Terms of Service. Please review these terms carefully before using our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
              <p>
                By accessing or using ChoosePhone, you accept and agree to be legally bound by these terms. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Use of Services</h2>
              <p>
                You agree to use the website only for lawful purposes. You are prohibited from using the site to:
                <ul className="list-disc list-inside mt-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Harm, harass, or disrupt others</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                </ul>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p>
                All content on ChoosePhone, including but not limited to text, images, logos, and graphics, is the intellectual property of ChoosePhone or its licensors and protected by applicable copyright and trademark laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Affiliate Disclaimer</h2>
              <p>
                ChoosePhone participates in affiliate marketing programs, including Amazon Associates and others. We may earn commissions when you click on or make purchases via affiliate links. These commissions do not affect our product recommendations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Advertisements</h2>
              <p>
                ChoosePhone displays third-party advertisements, including from Google AdSense. These ads may use cookies or tracking technologies to serve personalized content. We do not control the content of these ads and are not responsible for any third-party offerings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p>
                ChoosePhone provides comparisons and recommendations based on available data. While we strive for accuracy, we do not guarantee it. Final purchasing decisions are your responsibility. We are not liable for any direct or indirect damages arising from use of the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p>
                We may update these Terms of Service at any time without prior notice. It is your responsibility to review them periodically. Continued use of the website after changes constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the jurisdiction of Indian courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions or concerns regarding these Terms of Service, please contact us at <a className="text-blue-600 underline" href="mailto:support@choosephone.com">support@choosephone.com</a>.
              </p>
            </section>

            <p className="text-lg font-semibold">Thank you for using ChoosePhone!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
