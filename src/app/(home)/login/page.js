"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();

  const [isLoginDisabled, setIsLoginDisabled] = useState(true); // State to manage button disabled
  const [isOTPVisible, setIsOTPVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [formData, setFormData] = useState({
    EmailID: "",
    UserPassword: "",
    UserOTP: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errorOTP, setErrorOTP] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/loginUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      console.log(result);
      setIsLoading(false); // Stop loading

      if (response.ok) {
        setIsLoginDisabled(false);
        setIsOTPVisible(true);
      } else {
        setErrorMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      setIsLoading(false); // Stop loading
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  // Handle OTP form submit
  const handleOTP = async (e) => {
    e.preventDefault();

    setErrorOTP("");
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/verifyOTPUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setIsLoading(false); // Stop loading

      if (response.ok) {
        if (result.message === "verified") {
          // Cookies.set("token", result.token, { expires: 7 }); // Expires in 7 days
          Cookies.set("token", result.token, {
            expires: 7, 
            sameSite: "strict",
          }); // Expires in 7 days

          router.push("/my-account");
        } else {
          setErrorOTP(result.message || "Something went wrong.");
        }
      } else {
        setErrorOTP(result.message || "Something went wrong.");
      }
    } catch (error) {
      setIsLoading(false); // Stop loading
      setErrorOTP("Something went wrong");
    }
  };

  return (
    <>
      <div className="user-area pt-14 pb-10">
        <div className="container mx-auto">
          <div className="row align-items-center">
            <div className="">
              <div className="user-all-form">
                <div className="contact-form">
                  <h3>Log In</h3>

                  {isLoading && <p>Loading, please wait...</p>}

                  {isLoginDisabled && !isLoading && (
                    <form id="contactLogin" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="">
                          <div className="form-group">
                            <input
                              type="email"
                              name="EmailID"
                              className="form-control"
                              value={formData.EmailID}
                              onChange={handleChange}
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="password"
                              name="UserPassword"
                              value={formData.UserPassword}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-condition">
                          <div className="agree-label">
                            <label htmlFor="chb1">
                              <Link className="forget" href="forgot-my-password">
                                Forgot My Password?
                              </Link>
                            </label>
                          </div>
                        </div>
                        {errorMessage && (
                          <p style={{ color: "red" }}>{errorMessage}</p>
                        )}
                        <div className="text-center">
                          <button type="submit" className="default-btn">
                            Log In Now
                          </button>
                        </div>
                        <div className="">
                          <p className="account-desc text-center">
                            New User? <Link href="register">Register</Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  )}

                  {isOTPVisible && !isLoading && (
                    <form
                      id="contactFormOTP"
                      className="mt-4"
                      onSubmit={handleOTP}
                    >
                      <div className="row">
                        <div className="">
                          <div className="form-group">
                            <input
                              type="text"
                              name="UserOTP"
                              className="form-control"
                              value={formData.UserOTP}
                              onChange={handleChange}
                              placeholder="Enter OTP"
                              required
                            />
                          </div>
                        </div>
                        {errorOTP && <p style={{ color: "red" }}>{errorOTP}</p>}
                        <div className="text-center">
                          <button type="submit" className="default-btn">
                            Enter OTP
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
