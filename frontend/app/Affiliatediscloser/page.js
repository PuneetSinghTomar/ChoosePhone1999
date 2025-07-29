"use client";

import React from "react";
import Link from "next/link";

export default function Affiliatediscloser() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Affiliate Disclosure</h2>
        <div className="p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-4">
          <div className="overflow-x-auto">
            <h1 className="text-3xl font-bold mb-6">Affiliate Disclosure</h1>

            <section className="mb-8">
              <p>
                At <strong>ChoosePhone</strong>, we are committed to full transparency and providing honest, unbiased information to our users.
                <br />
                Please note that some of the links on our website are affiliate links. This means that if you click on these links and make a purchase, we may earn a small commission — at no extra cost to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How Affiliate Links Work</h2>
              <p>
                When you click through an affiliate link and complete a qualifying purchase, we may receive a commission from the affiliate partner. These earnings help us maintain and grow the platform, continue creating high-quality content, and keep our services free for users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Editorial Integrity</h2>
              <ul className="list-disc list-inside">
                <li>We only recommend products and services that we believe are genuinely useful and offer value.</li>
                <li>Commissions do not affect our editorial content, reviews, comparisons, or recommendations.</li>
                <li>Your trust is essential, and we strive to maintain honesty, accuracy, and transparency in all content we publish.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Affiliate Partners</h2>
              <p>
                We are a participant in affiliate programs offered by reputable brands, including but not limited to:
                Amazon, Flipkart, Croma, TataCliq, Reliance Digital, Vijay Sales, and Poorvika.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Legal Notice</h2>
              <p>
                ChoosePhone is a participant in the Amazon Services LLC Associates Program and other similar programs.
                These affiliate advertising programs are designed to provide a means for sites to earn fees by advertising and linking to affiliate partner websites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
              <p>
                If you have any questions about this Affiliate Disclosure or how affiliate links work on ChoosePhone,
                please contact us at <a className="text-blue-600 underline" href="mailto:support@choosephone.com">support@choosephone.com</a>.
              </p>
            </section>

            <p className="text-lg font-semibold">Thank you for supporting ChoosePhone!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
