"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Register() {

  const router = useRouter();


  // const [countryCodes, setCountryCodes] = useState([]);

  // useEffect(() => {
  //   // Example API fetching country codes
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const codes = data.map((country) => ({
  //         code: country.idd.root + (country.idd.suffixes?.[0] || ""),
  //         name: country.name.common,
  //       }));
  //       setCountryCodes(codes);
  //     })
  //     .catch((error) => console.error("Error fetching country codes:", error));
  // }, []);


  const [formData, setFormData] = useState({
    EmailID: "",
    UserPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear specific field error when user starts typing
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: "",
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setFieldErrors({});

    // Make API call to register user
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setErrorMessage(result.message);
        router.push('/login');
      } else {
        if (result.success === false) {
          if (Array.isArray(result.message)) {
            // Handle validation errors (array of errors)
            const errors = {};
            result.message.forEach((error) => {
              errors[error.path] = error.msg;
            });
            setFieldErrors(errors);
          } else {
            // Handle single string error message
            setErrorMessage(result.message || "Something went wrong.");
          }
        } else {
          setErrorMessage(result.message || "Something went wrong.");
        }
      }
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  return (
    <>
      <div className="user-area pt-14 pb-10">
        <div className="container mx-auto">
          <div className="align-items-center">
            <div className="">
              <div className="user-all-form">
                <div className="contact-form">
                  <h3>Create an Account!</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="">


                      {/* <div className="form-group">
                        <select
                          name="CountryCode"
                          className="form-control"
                          value={formData.CountryCode}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Country Code</option>
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.code} ({country.name})
                            </option>
                          ))}
                        </select>
                        {fieldErrors.CountryCode && (
                          <p style={{ color: "red" }}>{fieldErrors.CountryCode}</p>
                        )}
                      </div> */}

                      <div className="">
                        <div className="form-group">
                          <input
                            type="text"
                            name="Mobnumber"
                            className="form-control"
                            value={formData.Mobnumber}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            required
                          />
                          {fieldErrors.Mobnumber && (
                            <p style={{ color: "red" }}>
                              {fieldErrors.Mobnumber}
                            </p>
                          )}
                        </div>
                      </div>
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
                          {fieldErrors.EmailID && (
                            <p style={{ color: "red" }}>
                              {fieldErrors.EmailID}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="">
                        <div className="form-group">
                          <input
                            type="text"
                            name="UserPassword"
                            className="form-control"
                            value={formData.UserPassword}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                          />
                          {fieldErrors.UserPassword && (
                            <p style={{ color: "red" }}>
                              {fieldErrors.UserPassword}
                            </p>
                          )}
                        </div>
                      </div>
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                      <div className="text-center">
                        <button type="submit" className="default-btn">
                          Register Now
                        </button>
                      </div>
                      <div className="text-center">
                        <p className="account-desc">
                          Already have an account?
                          <Link href="/login">Log In</Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
