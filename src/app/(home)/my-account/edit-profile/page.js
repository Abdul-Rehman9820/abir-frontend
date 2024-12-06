"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { toast } from 'react-toastify';

export default function Register() {


  // Fetchin User
  const [data, setData] = useState({
    Fname: '',
    Mobnumber: '',
  });

  useEffect(() => {


    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/userDetail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchUserDetails();
  }, []); 
// Fetchin User


  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log([...formData.entries()]); // Log form data
    setErrorMessage("");
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/updateUser`, {
        method: "POST",
        credentials: 'include',
        body: formData,
      });
  
      const result = await response.json();
      console.log(result); // Log backend response
      if (result.success) {

        toast.success('Profile updated successfully!');

        // toast.warning('This item is already in the cart');
        // toast.success('This item has been added to the cart');
        // toast.error('An error occurred. Please try again later.');


      } else {
        setErrorMessage(result.message || "Failed to update. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update. Please try again.");
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
                  <h3>Edit Profile</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="">

                      <div className="">
                        <div className="form-group">
                          <label htmlFor="Fname">Profile Name</label>
                          <input
                            type="text"
                            name="Fname"
                            className="form-control"
                            value={data.Fname}
                            onChange={(e) => setData({ ...data, Fname: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="">
                        <div className="form-group">
                          <label htmlFor="Mobnumber">Mobile Number</label>
                          <input
                            type="text"
                            name="Mobnumber"
                            className="form-control"
                            value={data.Mobnumber}
                            onChange={(e) => setData({ ...data, Mobnumber: e.target.value })}
                            required
                          />
                        </div>
                      </div>


                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                      <div className="text-center">
                        <button type="submit" className="default-btn">
                          Update
                        </button>
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
