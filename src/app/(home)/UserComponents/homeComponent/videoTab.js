'use client'

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";


export default function videoTab() {




    /// recipe PDFs ========================

    const [data, setData] = useState([]); // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true);


    // Fetch recipe data
    async function fetchData() {

        setIsLoading(true); // Set loading state before fetching data
        try {

            await new Promise((resolve) => setTimeout(resolve, 200));

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/listRecipeVideo?limit=4`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();

            // Set data and pagination details
            setData(result.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }



    // Fetch initial data on mount
    useEffect(() => {
        fetchData(); // Call fetchData with no category ID initially
    }, []); // Fetch data on component mount

    /// recipe PDFs ========================


    return (

        <>


            <div className="Latest_News_container pt-5">


                <div className="Latest_News_box">

                    {isLoading ? (


                        <>

                            {/* Loop through rows for a skeleton table */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {[...Array(2)].map((_, colIndex) => (
                                    <div key={colIndex} className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                        <div className="h-48 bg-gray-200 animate-pulse"></div>
                                        <div className="p-4">
                                            <h2 className="h-6 bg-gray-300 rounded-md animate-pulse w-3/4 mb-2"></h2>
                                            <p className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6 mb-2"></p>
                                            <div className="mt-4 flex justify-start">
                                                <button className="h-8 w-20 bg-yellow-100 rounded-md animate-pulse"></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>

                    ) : data && data.length === 0 ? (
                        <div className="empty-message mt-4 mb-4">No data found</div>
                    ) : (
                        <>


                            <div className="blog-card">
                                <div className="blog-img">

                                    {data && data[0] && (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${data[0].video_recipe_thum_image}`}
                                            alt="Images"
                                        />
                                    )}

                                    <div className="tag">
                                        <Link href="/recipes-videos">
                                            {data && data[0] && (
                                                new Date(data[0].created_at).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })
                                            )}
                                        </Link>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>

                                        {data && data[0] && (
                                            <Link href={`/recipes-videos/${data[0].video_recipe_slug}`}>
                                                {data[0].video_recipe_name}
                                            </Link>
                                        )}

                                    </h3>
                                    {/* <p>
                                        {data && data[0] && (
                                            data[0].video_recipe_decs.length > 30 ? data[0].video_recipe_decs.substring(0, 150) + '...' : data[0].video_recipe_decs
                                        )}
                                    </p> */}
                                    {data && data[0] && (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    data[0].video_recipe_decs.length > 150
                                                        ? data[0].video_recipe_decs.substring(0, 150) + "..."
                                                        : data[0].video_recipe_decs,
                                            }}
                                        ></p>
                                    )}


                                    <Link href="/recipes-videos" className="read-btn">
                                        See More
                                    </Link>
                                </div>
                            </div>

                        </>
                    )}






                </div>


                <div className="Latest_News_box">
                    <div className="Latest_News_Bloglist">


                        {isLoading ? (


                            <>

                                {/* Loop through rows for a skeleton table */}
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[...Array(4)].map((_, colIndex) => (
                                        <div key={colIndex} className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                                            <div className="p-4">
                                                <h2 className="h-6 bg-gray-300 rounded-md animate-pulse w-3/4 mb-2"></h2>
                                                <p className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6 mb-2"></p>
                                                <div className="mt-4 flex justify-start">
                                                    <button className="h-8 w-20 bg-yellow-100 rounded-md animate-pulse"></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </>

                        ) : data && data.length === 0 ? (
                            <div className="empty-message mt-4 mb-4">No data found</div>
                        ) : (
                            <>


                                <div className="tabs_item">
                                    <div className="Diet_box_cont">


                                        {data.slice(1).map((item, index) => (


                                            <div className="" key={index}>
                                                <div className="blog-side-content">
                                                    <div className="blog-side-img">
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${item.video_recipe_thum_image}`}
                                                            alt="Images"
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <span>
                                                            {new Date(item.created_at).toLocaleDateString('en-GB', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}

                                                        </span>
                                                        <h3>
                                                            <Link href={`/recipes-videos/${item.video_recipe_slug}`}>
                                                                {item.video_recipe_name}
                                                            </Link>
                                                        </h3>
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.video_recipe_decs.length > 70
                                                                    ? item.video_recipe_decs.substring(0, 70) + '...'
                                                                    : item.video_recipe_decs,
                                                            }}
                                                        ></p>

                                                    </div>
                                                </div>
                                            </div>

                                        ))}


                                    </div>
                                </div>


                            </>
                        )}


                    </div>
                </div>


            </div>

        </>

    )
}
