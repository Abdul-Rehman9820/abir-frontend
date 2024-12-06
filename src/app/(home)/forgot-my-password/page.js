"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from 'react-toastify';

export default function Forgot_My_Password() {
  const router = useRouter();

  const [isForgEmailVisible, setisForgEmailVisible] = useState(true); // State to manage button disabled
  const [isOTPVisible, setIsOTPVisible] = useState(false);
  const [isChangPassVisible, setChangPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [formData, setFormData] = useState({
    EmailID: "",
    UserPassword: "",
    ResetToken: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errorOTP, setErrorOTP] = useState("");
  const [errorChanPass, setErrorChanPass] = useState("");

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
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/forgotPassword`,
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
        setisForgEmailVisible(false);
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
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/validateResetToken`,
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
        if (result.message === "Token_valid") {

          setisForgEmailVisible(false);
          setIsOTPVisible(false);
          setChangPassVisible(true);

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


  // Handle OTP form submit
  const handleChangePass = async (e) => {
    e.preventDefault();

    setErrorChanPass("");
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/resetPassword`,
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
        if (result.message === "Password_changed") {


          toast.success('Password has been changed, now you can login with new password');

          setTimeout(() => {

            router.push("/login");

          }, 5000);



        } else {
          setErrorChanPass(result.message || "Something went wrong.");
        }
      } else {
        setErrorChanPass(result.message || "Something went wrong.");
      }
    } catch (error) {
      setIsLoading(false); // Stop loading
      setErrorChanPass("Something went wrong");
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
                  <h3>Forgot Password</h3>

                  {isLoading && <p>Loading, please wait...</p>}

                  {isForgEmailVisible && !isLoading && (
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
                        {errorMessage && (
                          <p style={{ color: "red" }}>{errorMessage}</p>
                        )}
                        <div className="text-center">
                          <button type="submit" className="default-btn">
                            Send OTP
                          </button>
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
                              name="ResetToken"
                              className="form-control"
                              value={formData.ResetToken}
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


                  {isChangPassVisible && !isLoading && (
                    <form
                      id="contactFormOTP"
                      className="mt-4"
                      onSubmit={handleChangePass}
                    >
                      <div className="row">
                        <div className="">
                          <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                              className="form-control mt-2"
                              type="password"
                              name="UserPassword"
                              value={formData.UserPassword}
                              onChange={handleChange}
                              placeholder="Type Password"
                              required
                            />
                          </div>
                        </div>
                        {errorChanPass && <p style={{ color: "red" }}>{errorChanPass}</p>}
                        <div className="text-center">
                          <button type="submit" className="default-btn">
                            Update Password
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
