'use client'

import { useEffect, useState } from "react";
import Link from 'next/link';

import { toast } from 'react-toastify';


const Cart = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/cart`, {
        method: 'GET',
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setData(result);
      console.log(result);

    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);




  // Delete to  cart login
  const handelDeleteCart = async (Product_ID, Product_Type) => {


    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ Product_ID, Product_Type }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      };

    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  // Delete to  cart login





  return (

    <>

      <section className="cart-wraps-area py-9">
        <div className="container mx-auto">
          <div className="flex">
            <div className="w-2/3">

              <div className="cart-wraps">
                <div className="cart-table table-responsive">




                  {data.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <>

                      <table className="table-auto w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold">Product</th>
                            <th className="px-4 py-2 text-left font-semibold">Name</th>
                            <th className="px-4 py-2 text-left font-semibold">Price</th>
                            <th className="px-4 py-2 text-left font-semibold"></th>
                          </tr>
                        </thead>
                        <tbody>

                          {data.map((item, index) => (
                            <tr className="border-t border-gray-200" key={index}>
                              <td className="px-4 py-2">
                                <img src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${item.recipe_thum_image}`} alt="Image" className="w-16 h-16 object-cover" />
                              </td>
                              <td className="px-4 py-2">
                                <Link href={`/recipes-pdf/${item.recipe_slug}`}>
                                  {item.recipe_name.length > 30 ?
                                    item.recipe_name.substring(0, 30) + '...' :
                                    item.recipe_name}
                                </Link>
                              </td>
                              <td className="px-4 py-2">${item.recipe_Price}</td>
                              <td className="px-4 py-2">
                                <button onClick={() => handelDeleteCart(item.Product_ID, item.Product_Type)}>
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}


                        </tbody>
                      </table>

                      <div className="cart-buttons">
                        <div className="flex items-center">

                          <div className="w-1/2">
                            <button className="bg-red-700 px-4 py-2 rounded-lg text-white" onClick={() => dispatch(clearCartItems(100))}>Clear Cart</button>
                          </div>
                        </div>
                      </div>

                    </>
                  )}




                </div>


              </div>

            </div>


            <div className="w-1/3">
              <div className="cart-totals">
                <h3>Order Summary</h3>
                <ul>
                  <li>
                    Subtotal <span>$150.00</span>
                  </li>
                  <li>
                    Shipping <span>$30.00</span>
                  </li>
                  <li>
                    Coupon <span>$20.00</span>
                  </li>
                  <li>
                    Total{" "}
                    <span>
                      <b>$160.00</b>
                    </span>
                  </li>
                </ul>
                <a href="checkout.html" className="default-btn border-radius-5">
                  Proceed to checkout
                </a>
              </div>
            </div>


          </div>
        </div>
      </section>


    </>


  );
};

export default Cart;
