'use client'


import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItemFromCart, clearCartItems } from '../../Action_and_Reducer/cartSlice';

const Cart = () => {

  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems(100));
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (

    <>

      <section className="cart-wraps-area py-9">
        <div className="container mx-auto">
          <div className="flex">
            <div className="w-2/3">

              <div className="cart-wraps">
                <div className="cart-table table-responsive">




                  {items.length === 0 ? (
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

                          {items.map((item, index) => (
                            <tr className="border-t border-gray-200" key={item.index}>
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
                                <button onClick={() => dispatch(removeItemFromCart({ User_Id: 100, Product_ID: item.Product_ID, Product_Type: item.Product_Type }))}>
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}


                        </tbody>
                      </table>

                      <div className="cart-buttons">
                        <div className="flex items-center">
                          {/* <div className="w-1/2">
                        <div className="continue-shopping-box">
                          <a href="shop.html" className="default-btn">
                            Continue Shopping
                          </a>
                        </div>
                      </div> */}
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
