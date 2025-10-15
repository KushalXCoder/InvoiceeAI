"use client";

import React, { useState } from "react";
import {
  FileText,
  Zap,
  Clock,
  Shield,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AppLogo } from "@/components/logo";

export default function InvoiceLanding() {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 font-poppins">
      <div className="max-w-9xl mx-auto bg-white border-8 border-gray-400 shadow-xl">
        {/* Invoice Header - Grid Layout */}
        <div className="grid grid-cols-[auto_1fr_auto] border-b border-gray-400">
          {/* Logo Section */}
          <AppLogo />

          {/* Invoice Number */}
          <div className="p-6 border-r border-gray-400 flex justify-center items-center">
            {/* <p className="font-bold text-2xl font-facultyGlyphic">Sponsored by None, Rejected by None, Accepted by All</p> */}
            {/* <p className="text-xs font-bold text-gray-500 mb-2">INVOICE NO.</p>
            <p className="text-xl font-bold text-gray-900">#2025-001</p> */}
          </div>

          {/* Status */}
          <div className="p-6">
            <p className="text-sm font-bold text-gray-500 mb-2">AI-FEAT</p>
            <div className="inline-block px-3 py-1 bg-green-100 border border-green-600 text-green-700 text-xs font-bold">
              ACTIVE
            </div>
          </div>
        </div>

        {/* Bill To / Bill From Section */}
        <div className="grid grid-cols-12 border-b border-gray-400 bg-gray-50 text-sm">
          <div className="col-span-6 p-3 border-r border-gray-400">
            <p className="text-[10px] font-bold text-gray-500">BILL TO</p>
            <p className="font-semibold text-gray-800">Your Business</p>
          </div>
          <div className="col-span-6 p-3">
            <p className="text-[10px] font-bold text-gray-500">BILL FROM</p>
            <p className="font-semibold text-gray-800">InvoiceeAI Inc.</p>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="border-b-2 border-gray-400 p-8 md:p-12 bg-gray-50">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-white border-2 border-gray-400 text-sm font-bold mb-6">
              ✨ LET AI MAKE IT FOR YOU
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-6">
              Making your <span className="font-facultyGlyphic">Invoice</span>
              <br />
              journey easier
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Generate invoice in seconds, either manually or using our AI maker
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 border-2 border-gray-400 font-bold transition-all flex items-center gap-2 text-lg cursor-pointer"
              onClick={() => router.push("/dashboard")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              GET STARTED
              <ArrowRight
                className={`w-5 h-5 transition-transform ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </button>
            <button className="bg-white border-2 border-gray-400 text-gray-900 px-10 py-4 font-bold transition-all hover:bg-gray-50 text-lg">
              VIEW DEMO
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-gray-600">
              <Check className="w-5 h-5 text-green-600" />
              IT&apos;S FREE TO START & WILL FOREVER BE
            </p>
          </div>
        </div>

        {/* Table Header for Features */}
        <div className="grid grid-cols-12 border-b-2 border-gray-400 bg-gray-900 text-white">
          <div className="col-span-1 p-4 border-r border-gray-700 text-center">
            <p className="text-xs font-bold">#</p>
          </div>
          <div className="col-span-5 p-4 border-r border-gray-700">
            <p className="text-xs font-bold">FEATURE DESCRIPTION</p>
          </div>
          <div className="col-span-3 p-4 border-r border-gray-700">
            <p className="text-xs font-bold">BENEFIT</p>
          </div>
          <div className="col-span-3 p-4">
            <p className="text-xs font-bold">VALUE</p>
          </div>
        </div>

        {/* Feature Line Items */}
        <div className="grid grid-cols-12 border-b border-gray-300">
          <div className="col-span-1 p-6 border-r border-gray-300 flex items-center justify-center">
            <Zap className="w-6 h-6 text-gray-900" />
          </div>
          <div className="col-span-5 p-6 border-r border-gray-300">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              AI-Powered Generation
            </h4>
            <p className="text-sm text-gray-600">
              Intelligent invoice creation using advanced machine learning
              algorithms (not our&apos;s)
            </p>
          </div>
          <div className="col-span-3 p-6 border-r border-gray-300 flex items-center">
            <p className="text-sm font-medium text-gray-700">
              Save 10+ hours/week
            </p>
          </div>
          <div className="col-span-3 p-6 flex items-center">
            <p className="text-xl font-bold text-gray-900">$500/mo</p>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-gray-300 bg-gray-50">
          <div className="col-span-1 p-6 border-r border-gray-300 flex items-center justify-center">
            <Clock className="w-6 h-6 text-gray-900" />
          </div>
          <div className="col-span-5 p-6 border-r border-gray-300">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Lightning Fast Processing
            </h4>
            <p className="text-sm text-gray-600">
              Generate professional invoices in under 3 seconds*
            </p>
          </div>
          <div className="col-span-3 p-6 border-r border-gray-300 flex items-center">
            <p className="text-sm font-medium text-gray-700">
              99.9% faster than manual
            </p>
          </div>
          <div className="col-span-3 p-6 flex items-center">
            <p className="text-xl font-bold text-gray-900">$300/mo</p>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-gray-300">
          <div className="col-span-1 p-6 border-r border-gray-300 flex items-center justify-center">
            <Shield className="w-6 h-6 text-gray-900" />
          </div>
          <div className="col-span-5 p-6 border-r border-gray-300">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Bank-Grade Security
            </h4>
            <p className="text-sm text-gray-600">
              Enterprise-level encryption and compliance standards
            </p>
          </div>
          <div className="col-span-3 p-6 border-r border-gray-300 flex items-center">
            <p className="text-sm font-medium text-gray-700">
              100% secure & compliant
            </p>
          </div>
          <div className="col-span-3 p-6 flex items-center">
            <p className="text-xl font-bold text-gray-900">$400/mo</p>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b-2 border-gray-400 bg-gray-50">
          <div className="col-span-1 p-6 border-r border-gray-300 flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-900" />
          </div>
          <div className="col-span-5 p-6 border-r border-gray-300">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Custom Branding
            </h4>
            <p className="text-sm text-gray-600">
              Fully customizable templates matching your brand identity
            </p>
          </div>
          <div className="col-span-3 p-6 border-r border-gray-300 flex items-center">
            <p className="text-sm font-medium text-gray-700">
              Professional appearance
            </p>
          </div>
          <div className="col-span-3 p-6 flex items-center">
            <p className="text-xl font-bold text-gray-900">$200/mo</p>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="grid grid-cols-12 border-b-2 border-gray-400 bg-gray-900 text-white">
          <div className="col-span-4 p-4 border-r border-gray-700">
            <p className="text-xs font-bold">PLAN</p>
          </div>
          <div className="col-span-2 p-4 border-r border-gray-700 text-center">
            <p className="text-xs font-bold">PRICE</p>
          </div>
          <div className="col-span-2 p-4 border-r border-gray-700 text-center">
            <p className="text-xs font-bold">INVOICES</p>
          </div>
          <div className="col-span-2 p-4 border-r border-gray-700 text-center">
            <p className="text-xs font-bold">AI ACCESS</p>
          </div>
          <div className="col-span-2 p-4 text-center">
            <p className="text-xs font-bold">ACTION</p>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-gray-300">
          <div className="col-span-4 p-6 border-r border-gray-300">
            <p className="text-lg font-bold text-gray-900">Free</p>
            <p className="text-sm text-gray-600">For individuals</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-900">$0</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <p className="text-sm font-medium text-gray-700">10/month</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <X className="w-5 h-5 text-red-600" />
          </div>
          <div className="col-span-2 p-6 flex items-center justify-center">
            <button className="px-4 py-2 border-2 border-gray-400 text-gray-900 font-bold text-sm hover:bg-gray-50">
              START
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-gray-300 bg-gray-50">
          <div className="col-span-4 p-6 border-r border-gray-300">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-lg font-bold text-gray-900">Pro</p>
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold">
                POPULAR
              </span>
            </div>
            <p className="text-sm text-gray-600">For professionals</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-900">$0</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <p className="text-sm font-medium text-gray-700">Unlimited</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div className="col-span-2 p-6 flex items-center justify-center">
            <button className="px-4 py-2 bg-gray-900 text-white font-bold text-sm hover:bg-gray-800">
              START
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b-2 border-gray-400">
          <div className="col-span-4 p-6 border-r border-gray-300">
            <p className="text-lg font-bold text-gray-900">Enterprise</p>
            <p className="text-sm text-gray-600">For organizations</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <p className="text-xl font-bold text-gray-900">Custom</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <p className="text-sm font-medium text-gray-700">Unlimited</p>
          </div>
          <div className="col-span-2 p-6 border-r border-gray-300 text-center flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div className="col-span-2 p-6 flex items-center justify-center">
            <button className="px-4 py-2 border-2 border-gray-400 text-gray-900 font-bold text-sm hover:bg-gray-50">
              CONTACT
            </button>
          </div>
        </div>

        {/* Subtotal Section */}
        <div className="grid grid-cols-12 border-b border-gray-300">
          <div className="col-span-8 p-6 border-r border-gray-300"></div>
          <div className="col-span-2 p-6 border-r border-gray-300">
            <p className="text-sm font-bold text-gray-500">SUBTOTAL</p>
          </div>
          <div className="col-span-2 p-6">
            <p className="text-lg font-bold text-gray-900">$1,400.00</p>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-gray-300 bg-gray-50">
          <div className="col-span-8 p-6 border-r border-gray-300"></div>
          <div className="col-span-2 p-6 border-r border-gray-300">
            <p className="text-sm font-bold text-gray-500">DISCOUNT</p>
          </div>
          <div className="col-span-2 p-6">
            <p className="text-lg font-bold text-green-600">-$1,400.00</p>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b-2 border-gray-400 bg-gray-900 text-white">
          <div className="col-span-8 p-8 border-r border-gray-700"></div>
          <div className="col-span-2 p-8 border-r border-gray-700">
            <p className="text-sm font-bold">TOTAL VALUE</p>
          </div>
          <div className="col-span-2 p-8">
            <p className="text-3xl font-black">PRICELESS</p>
          </div>
        </div>

        {/* Payment Terms / CTA Section */}
        <div className="grid grid-cols-12 border-b-2 border-gray-400">
          <div className="col-span-6 p-8 border-r-2 border-gray-400">
            <p className="text-xs font-bold text-gray-500 mb-3">
              PAYMENT TERMS
            </p>
            <p className="text-sm text-gray-700 mb-2">
              ✓ No credit card required
            </p>
            <p className="text-sm text-gray-700 mb-2">✓ Cancel anytime</p>
            <p className="text-sm text-gray-700 mb-2">
              ✓ 30-day money back guarantee
            </p>
            <p className="text-sm text-gray-700">✓ 24/7 customer support</p>
          </div>

          <div className="col-span-6 p-8 flex flex-col justify-center">
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-5 border-2 border-gray-400 font-black text-xl transition-all flex items-center justify-center gap-3 mb-3">
              START YOUR JOURNEY
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-center text-xs text-gray-500 font-medium">
              Due immediately • Free forever
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-12">
          <div className="col-span-6 p-6 border-r-2 border-gray-400">
            <p className="text-xs text-gray-500 mb-2">
              Questions? Contact us at:
            </p>
            <p className="text-sm font-bold text-gray-900">
              support@invoiceeai.com
            </p>
            <p className="text-sm font-bold text-gray-900">+1 (555) 123-4567</p>
          </div>

          <div className="col-span-6 p-6 text-right flex justify-center items-center">
            <h1 className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
              INVOICEE-AI
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
