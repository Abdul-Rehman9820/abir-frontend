'use client';

import { useEffect, useState } from "react";

export default function SingleVideo({ params }) {
    const Video_Id = params?.Video_Id; // Safely access params
    const [data, setData] = useState(null); // Initialize with null for single data
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/getSinglePurchasedVideo`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ Video_Id }),
                }
            );

            if (!response.ok) throw new Error("Network response was not ok");

            const result = await response.json();
            setData(result.data); // Set retrieved data
        } catch (error) {
            console.error("Fetch error:", error);
            setData(null); // Set null in case of error
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (Video_Id) fetchData(); // Fetch only if Video_Id exists
    }, [Video_Id]); // Rerun when Video_Id changes

    return (
        <>
            {isLoading ? (
                <div className="flex flex-wrap justify-center w-full">
                    {[...Array(2)].map((_, colIndex) => (
                        <div key={colIndex} className="w-1/2 p-2">
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
                <div className="container mx-auto py-9">


                    <h1 className="mb-2">{data.video_recipe_name}</h1>

                    <div className="videoPreview mt-2">

                        {data.video_recipe_type === 'Internal' ? (

                            // uploads\videos\MHO5-IS-NOW-MGO5-HINDI.mp4
                            <video
                                controls
                                width="100%"
                                style={{ border: '1px solid #9b9c2e' }} 
                                // height="360"
                                poster="/custom_images/play_video_thumbnail.jpg" // Path to an image in the public folder
                                // disablePictureInPicture // Prevents "picture-in-picture" mode on some browsers
                                controlsList="nodownload"
                                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                            >
                                <source src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${data.video_recipe_URL}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        ) : data.video_recipe_type === 'External' ? (

                            <iframe
                                src={`${data.video_recipe_URL}`}
                                title="External Video"
                                width="100%"
                                // height="100%"
                                // style={{ position: 'absolute', top: 0, left: 0 }}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            >
                            </iframe>

                        ) : (
                            <>
                            {/* <p>Please select a video type</p> */}
                            <p>Video not found</p>
                            </>
                        )}

                    </div>


                </div>
            ) : (
                <p>Video not found</p>
            )}
        </>
    );
}
