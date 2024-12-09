'use client'

import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Link from "next/link";


export default function SinglePdf({ recipe_pdf_slug }) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/singleRecipePDF/${recipe_pdf_slug}`,
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
    }, [recipe_pdf_slug]);



    return (
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
                    <div className="w-1/2">
                        <div className="shop-details-img">
                            <img
                                src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${data.recipe_thum_image}`}
                                alt="Image"
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="shop-desc pl-20">
                            <h1>{data.recipe_name}</h1>
                            <div className="price">
                                <span className="new-price">${data.recipe_Price}</span>
                            </div>
                            <div className="shop-add">
                                {/* <button className="default-btn" onClick={handleAddToCart}>
                                    Add to Cart
                                </button> */}
                                <button className="default-btn">

                                    <Link href={`/pay?Product_ID=${data.id}&Product_Type=${data.Product_Type}`}>
                                        Buy PDF
                                    </Link>
                                 
                                </button>
                            </div>
 
                            <div className="mt-2">
                                <span className="new-price">Category: {data.categoryName}</span>
                            </div>
                            <div className="shop-detls-tab-content">
                                <p>Description: </p>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: data.recipe_decs,
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
    );
}
