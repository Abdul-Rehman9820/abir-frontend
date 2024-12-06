'use client'

import { useEffect, useState } from 'react';
import MyNav from './my-account-nav';
import Link from "next/link";


export default function myAccount() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setUserData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []); // Dependency on isAuth to refetch only if auth state changes




  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-wrap -mx-4">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 px-4">
          <h5 className="mb-4 font-semibold text-lg">MY ACCOUNT</h5>
          <MyNav />
        </div>
        {/* Dashboard Content */}
        <div className="w-full md:w-3/4 px-4">


          <div id="dashboard-content" className="dashboard-content">


            <>
              {loading ? (
                <div className="flex flex-wrap justify-center w-full">
                  {[...Array(2)].map((_, colIndex) => (
                    <div className="w-1/2 p-2" key={colIndex}>
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="h-10 bg-gray-200 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userData ? (
                <>
                  <p><strong>Hello</strong> {userData.Fname}</p>
                  <p>
                    <span>( <strong>Email:</strong> {userData.EmailID} )</span>
                    <span>( <strong>Mobile:</strong> {userData.Mobnumber} )</span>
                  </p>
                </>
              ) : (
                <p>Not found</p>
              )}

            </>




            <p className="text-gray-600 mt-4">
              From your account dashboard you can view your purchased PDF, Videos and Packages
            </p>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="card text-center p-4 bg-white rounded-lg shadow">
                <Link href="/my-account/recipes-pdf">
                  <h5 className="card-title mt-3 font-medium text-lg">Recipe PDF</h5>
                </Link>

              </div>
              <div className="card text-center p-4 bg-white rounded-lg shadow">
                <Link href="/my-account/recipes-videos">
                  <h5 className="card-title mt-3 font-medium text-lg">Recipe Videos</h5>
                </Link>

              </div>
              <div className="card text-center p-4 bg-white rounded-lg shadow">
                <Link href="/my-account/packages">
                  <h5 className="card-title mt-3 font-medium text-lg">Packages</h5>
                </Link>

              </div>
            </div>
          </div>


        </div>


      </div>
    </div>


  );
}
