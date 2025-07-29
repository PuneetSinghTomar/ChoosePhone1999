"use client";

import Image from "next/image";
import { useState ,useEffect} from "react";
import Link from "next/link";
import { Dialog,DialogPanel,Popover,PopoverButton,PopoverGroup,PopoverPanel,} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {AirVent,Camera,Headphones,Laptop,Smartphone,Tablet,Tv,WashingMachine,Watch,Refrigerator,} from "lucide-react";

const products = [
  { name: "Phone", description: "Find the best smartphones", href: "/Category/Phone/PhonePage", icon: Smartphone },
  { name: "Laptop", description: "Choose the right laptop", href: "/Category/Laptop/LaptopPage", icon: Laptop },
  { name: "Tablet", description: "Explore top tablets", href: "/Category/Tablet/TabletPage", icon: Tablet },
  { name: "SmartWatch", description: "Discover smartwatches", href: "/Category/Smartwatch/SmartwatchPage", icon: Watch },
  { name: "Headphones", description: "Best audio experience", href: "/Category/Headphone/HeadphonePage", icon: Headphones },
  { name: "WashingMachine", description: "Efficient washing machines", href: "/Category/Washingmachine/WashingmachinePage", icon: WashingMachine },
  { name: "Refrigerator", description: "Reliable refrigerators", href: "/Category/Refrigerator/RefrigeratorPage", icon: Refrigerator },
  { name: "Airconditioner", description: "Cooling solutions", href: "/Category/AirConditioner/AirconditionerPage", icon: AirVent },
  { name: "Camera", description: "Best cameras available", href: "/Category/Camera/CameraPage", icon: Camera },
  { name: "Television", description: "Top-rated TVs", href: "/Category/Television/TelevisionPage", icon: Tv },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
return (
    <header className="bg-gray-100">
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image src="/2-removebg-preview.png" alt="Logo" width={100} height={50} priority />
          </Link>
        </div>
       {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" />
          </button>
        </div>
        {/* Desktop nav */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                Product
                <ChevronDownIcon className="size-5 flex-none text-gray-400" />
              </PopoverButton>
              <PopoverPanel className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <Link key={item.name} href={item.href} className="group flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50">
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="size-6 text-gray-600 group-hover:text-indigo-600" />
                      </div>
                      <div className="flex-auto">
                        <span className="block font-semibold text-gray-900">{item.name}</span>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
           <Link href="/Trends/Home" className="text-sm font-semibold text-gray-900">Trends</Link>
            <Link href="/Aboutus" className="text-sm font-semibold text-gray-900">About us</Link>
          </PopoverGroup>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/login" className="text-sm font-semibold text-gray-900">Log in →</Link>
        </div>
      </nav>
      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image src="/2-removebg-preview.png" alt="Logo" width={100} height={50} />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Popover>
                  <PopoverButton className="flex items-center justify-between text-sm font-semibold text-gray-900 w-full">
                    Product
                    <ChevronDownIcon className="size-5 flex-none text-gray-400" />
                  </PopoverButton>
                  <PopoverPanel className="mt-2 space-y-2">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                        {item.name}
                      </Link>
                    ))}
                  </PopoverPanel>
                </Popover>
                <Link href="/Trends" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                  Trends
                </Link>
                <Link href="/Aboutus" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                  About us
                </Link>
              </div>
              <div className="py-6">
                <Link href="/login" className="text-sm font-semibold text-gray-900">Log in →</Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
