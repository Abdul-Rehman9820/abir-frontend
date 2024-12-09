'use client';

import { Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

function PdfContent() {
    const searchParams = useSearchParams();

    const Pack_ID = searchParams.get("Pack_ID") || "";
    const Pack_Attr = searchParams.get("Pack_Attr") || "";

    // Function to encode a string to base64
    function encodeToBase64(inputString) {
        return Buffer.from(inputString.toString(), 'utf-8').toString('base64');
    }

    // Function to decode a base64 string back to the original string
    function decodeFromBase64(base64String) {
        return Buffer.from(base64String.toString(), 'base64').toString('utf-8');
    }

    return (
        <div className="container mx-auto">
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/abdul-a-mindframeindia?primary_color=9b9c2e"
                style={{ width: "100%", height: "80vh" }}
            ></div>
            <Script
                src={`https://assets.calendly.com/assets/external/widget.js`}
                strategy="afterInteractive"
            />
        </div>
    );
}

export default function LodingSc() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <PdfContent />
        </Suspense>
    );
}
