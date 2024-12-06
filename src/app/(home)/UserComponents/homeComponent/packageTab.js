'use client'

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";


export default function packageTab() {



    /// recipe PDFs ========================

    const [data, setData] = useState([]); // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true);


    // Fetch recipe data
    async function fetchData() {

        setIsLoading(true); // Set loading state before fetching data
        try {

            await new Promise((resolve) => setTimeout(resolve, 200));

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/listPackage?limit=4`,
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
            <div className="tab diet-tab pt-5">
                <div className="">

                    <div className="tab_content-parent">
                        <div className="tab_content pt-5">

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


                                            {data.map((item, index) => (


                                                <div className="Diet_box" key={index}>
                                                    <div className="diet-plan-card">
                                                        <div className="diet-plan-img">
                                                          
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${item.Package_image}`}
                                                                    alt="Images"
                                                                />
                                                     
                                                        </div>
                                                        <h3>
                                                            <Link href={`/packages/${item.id}`}>
                                                                {item.Package_Title.length > 30 ? item.Package_Title.substring(0, 30) + '...' : item.Package_Title}
                                                            </Link>
                                                        </h3>
                                                        <h3>
                                                                ${item.Package_Price}
                                                        </h3>
                                                    </div>
                                                </div>

                                            ))}


                                        </div>
                                    </div>


                                </>
                            )}



                            {/* add more */}
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
