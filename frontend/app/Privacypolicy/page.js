"use client";

import React from "react";
import Link from "next/link";

export default function Privacypolicy() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Privacy Policy</h2>
        <div className="p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-4">
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <ul className="list-disc list-inside mb-6">
              <li><strong>Personal Data:</strong> We may collect your name, email address, and contact details when you register or interact with our platform.</li>
              <li><strong>Device Data:</strong> We collect browser type, IP address, and device information to analyze usage trends.</li>
              <li><strong>Cookies:</strong> Cookies are used to personalize content, analyze traffic, and improve your experience on our site.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside mb-6">
              <li>To provide personalized product comparisons and recommendations.</li>
              <li>To analyze website performance and enhance our services.</li>
              <li>To send updates, promotional offers, and customer support messages.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Third-Party Services and Ads</h2>
            <p className="mb-6">
              ChoosePhone includes links to external websites such as Amazon, Flipkart, Croma, TataCliq, Reliance Digital, Vijay Sales, and Poorvika. We are not responsible for their privacy practices.  
              <br /><br />
              We also use third-party vendors, including Google AdSense, to display ads. These vendors may use cookies and similar technologies to serve ads based on your prior visits to this and other websites.  
              <br /><br />
              Google uses the <strong>DoubleClick (DART) cookie</strong> to enable interest-based advertising. You can opt out of personalized advertising by visiting <a className="text-blue-600 underline" href="https://www.google.com/settings/ads" target="_blank">Google Ads Settings</a>. Learn more on <a className="text-blue-600 underline" href="https://policies.google.com/technologies/ads" target="_blank">Google’s Privacy & Terms</a> page.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-6">
              You have the right to access, update, or delete your personal information. You may also withdraw consent, object to processing, or request data portability where applicable.  
              <br /><br />
              To exercise any of these rights, please contact us at <a className="text-blue-600 underline" href="mailto:support@choosephone.com">support@choosephone.com</a>.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Cookie Consent</h2>
            <p className="mb-6">
              By using our website, you agree to our use of cookies in accordance with this privacy policy. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              For any questions about this privacy policy, feel free to contact us at <a className="text-blue-600 underline" href="mailto:support@choosephone.com">support@choosephone.com</a>.
            </p>

            <p className="text-lg font-semibold mt-6">Thank you for choosing ChoosePhone!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
