'use client'

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import Script from "next/script";

import { useAuth } from '../useAuth';  // Import the useAuth hook

export default function Pay() {

  const { token } = useAuth(); // Get session token and status


  const router = useRouter();

  const searchParams = useSearchParams();
  const Product_ID = searchParams.get("Product_ID") || "";
  const Product_Type = searchParams.get("Product_Type") || "";

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(totalAmount);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/payProductDetail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Product_ID, Product_Type }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result.data);
        setTotalAmount(result.data.pay_price); // Set initial total price
        setFinalTotal(result.data.pay_price); // Set initial total price
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);



  // my coupon btn
  const couponBtn = useRef(null);

  const handleApplyCoupon = async () => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/apply-coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode,
          totalAmount
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message);
        return;
      }

      const data = await response.json();
      setDiscount(data.discountAmount);
      setFinalTotal(data.finalTotal);
      setMessage(data.message);

      if (couponBtn.current) {
        couponBtn.current.style.display = "none"; // Fixed 'display' typo
      }

    } catch (error) {
      setMessage("Error applying coupon");
    }
  };

  useEffect(() => {

    const loadPayPalButtons = () => {
      const paypalContainer = document.getElementById("paypal-button-container");

      // Remove existing PayPal buttons if they exist
      if (paypalContainer) {
        paypalContainer.innerHTML = ''; // Clear existing buttons
      }

      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/create_order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`, // Use the token from useAuth hook
              },
              body: JSON.stringify({
                finalTotal,  //! fetching from useState
              }),
            });

            // if not login or token issue

            if (res.status === 401) {
              router.push('/login');  // Adjust the route to your actual login page
              return;
            }
            
           // if not login or token issue


            const data = await res.json();
            return data.id;
            
          },
          onApprove: async (PayPaldata) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/capture_order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`, // Use the token from useAuth hook
              },
              body: JSON.stringify({
                orderID: PayPaldata.orderID,
                Product_ID: Product_ID,   // fetching from useState
                Product_Type: Product_Type,   // fetching from useState
                Product_OG_Price: data.pay_price,   // fetching from useState
                couponCode: couponCode,   // fetching from useState
              }),
            });
            const orderData = await res.json();

            // console.log(orderData);

            if (orderData.success === true) {

              router.push('/payment-success');

            } else {

              router.push('/payment-failed');

            }


          }
        }).render("#paypal-button-container"); // Render new PayPal button
      }
    };

    loadPayPalButtons(); // Load PayPal buttons

  }, [token, finalTotal]); // Re-run the effect when finalTotal changes

  const handlePlaceOrder = () => {
    alert(finalTotal);
  };

  return (
    <section className="checkout-area py-14">

      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (window.paypal) {
            window.paypal.Buttons().render("#paypal-button-container");
          }
        }}
      />


      <div className="container mx-auto">
        {isLoading ? (
          <div className="flex flex-wrap justify-center w-full">
            {[...Array(2)].map((_, colIndex) => (
              <div className="w-1/2 p-2" key={colIndex}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <h2 className="h-6 bg-gray-300 rounded-md animate-pulse w-3/4 mb-2"></h2>
                    <p className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6 mb-2"></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : data ? (
          <div className="flex">
            <div className="w-2/3">
              <div className="billing-details">
                <h3 className="title">Product details</h3>
                <div className="flex">
                  <div className="w-full">
                    <div className="singlePDF flex">
                      <div className="w-1/4">
                        <div className="shop-details-img">
                          <img
                            src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${data.pay_image}`}
                            alt="Image"
                          />
                        </div>
                      </div>
                      <div className="w-3/4">
                        <div className="shop-desc pl-20">
                          <h1>{data.pay_name}</h1>
                          <div className="price">
                            <span className="new-price">${data.pay_price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/3">
              <div className="billing-sildbar pl-20">
                <div className="billing-totals">
                  <h3>Checkout</h3>
                  <ul>
                    <li>Price: <span>${data.pay_price}</span></li>
                    <li>
                      Coupon:
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="border rounded px-2 py-1"
                        required
                      />
                      <button ref={couponBtn} onClick={handleApplyCoupon} className="abirBG text-white text-xs py-1 px-2 mt-2 rounded">Apply</button>
                      {message && <p>{message}</p>}
                    </li>
                    <li>Discount: <span>${Number(discount).toFixed(2)}</span></li>
                    <li>Total: <span>${Number(finalTotal).toFixed(2)}</span></li>
                  </ul>
                </div>
                <div className="payment-box">
                  <div className="payment-method">
                    <h3>Payment Method</h3>
                    <p>
                      <input type="radio" id="paypal" name="radio-group" />
                      <label htmlFor="paypal">PayPal</label>
                    </p>
                  </div>

                  <div id="paypal-button-container"></div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Not found</p>
        )}
      </div>


    </section>
  );
}
