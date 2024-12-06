'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../../Action_and_Reducer/cartSlice';

import Cart from '../../cart_b/Cart';

export default function SinglePdf({ recipe_pdf_slug }) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

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


    const { message, status, error } = useSelector((state) => state.cart);

    const handleAddToCart = () => {
        if (data) {
          const product = {
            User_Id: 100,
            Product_ID: data.id,
            Product_Type: data.Product_Type,
            recipe_slug: data.recipe_slug,
            recipe_thum_image: data.recipe_thum_image,
            recipe_Price: data.recipe_Price,
            recipe_name: data.recipe_name,
          };
      
          dispatch(addItemToCart(product))
            .then((response) => {
              // Handle success (e.g., show success message or perform further actions)
            })
            .catch((error) => {
              // Handle error (e.g., show error message)
              if (error.message === 'already') {
                alert('This item is already in your cart');
              } else {
                alert('Error adding to cart:', error.message);
              }
            });
        }
      };
      

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
                                <button className="default-btn" onClick={handleAddToCart}>
                                    Add to Cart
                                </button>
                            </div>
                            <div className="">{message}</div>
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

<Cart />

        </>
    );
}
