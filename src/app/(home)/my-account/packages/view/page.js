'use client'

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

function SinglePdf() {

    const searchParams = useSearchParams();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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



    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/singlePackagesAttr/${decodeFromBase64(Pack_Attr)}`,
                    { method: "GET" }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                setData(result.data);
                console.log(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);



    return (

        <div className="container mx-auto">

            <>
                {isLoading ? (
                    <div className="flex flex-wrap justify-center w-full">
                        {[...Array(2)].map((_, colIndex) => (
                            <div className="w-1/2 p-2" key={colIndex}>
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="h-48 bg-gray-200 animate-pulse"></div>
                                    <div className="p-4">
                                        <h2 className="h-6 bg-gray-300 rounded-md animate-pulse w-3/4 mb-2"></h2>
                                        <p className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6 mb-2"></p>
                                        <div className="mt-4 flex justify-start">
                                            <button className="h-8 w-20 bg-yellow-100 rounded-md animate-pulse"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : data ? (
                    <div className="singlePDF flex">

                        <div className="w-full">
                            <div className="shop-desc pl-20 mt-4">
                                <h1>{data.attributes_title_user}</h1>

                                <div className="mt-4">

                                    {data.attribute_image ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${data.attribute_image}`}
                                            alt="Image"
                                        />
                                    ) : (
                                        <>
                                            {/* <p>image not found</p> */}
                                        </>
                                    )}



                                </div>

                                <div className="videoPreview mt-4">

                                    {data.attribute_video_type === 'Internal' ? (

                                        // uploads\videos\MHO5-IS-NOW-MGO5-HINDI.mp4
                                        <video
                                            className="viewVideo"
                                            controls
                                            width="100%"
                                            height="200"
                                            style={{ border: '1px solid #9b9c2e' }}
                                            poster="/custom_images/play_video_thumbnail.jpg" // Path to an image in the public folder
                                            // disablePictureInPicture // Prevents "picture-in-picture" mode on some browsers
                                            controlsList="nodownload"
                                            onContextMenu={(e) => e.preventDefault()} // Disable right-click
                                        >
                                            <source src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${data.attribute_video_URL}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>

                                    ) : data.attribute_video_type === 'External' ? (

                                        <iframe
                                            src={`${data.attribute_video_URL}`}
                                            title="External Video"
                                            width="100%"
                                            height="500"
                                            // style={{ position: 'absolute', top: 0, left: 0 }}
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                        >
                                        </iframe>

                                    ) : (
                                        <>
                                            {/* <p>Please select a video type</p> */}
                                            {/* <p>Video not found</p> */}
                                        </>
                                    )}

                                </div>

                                <div className="shop-detls-tab-content">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: data.attribute_content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <p>Recipe not found</p>
                )}

            </>

        </div >

    );
}

export default function LodingSc() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SinglePdf />
        </Suspense>
    );
}
