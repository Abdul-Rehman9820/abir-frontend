'use client'

import { useEffect, useState } from 'react';
import Link from "next/link";
import MyNav from '../my-account-nav';


export default function myPDF() {

  const [data, setData] = useState([]); // Initialize with empty array
  const [isLoading, setIsLoading] = useState(true);



  // Fetch recipe data
  async function fetchData() {
    setIsLoading(true); // Set loading state before fetching data
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/getPurchasedPackages`,
        {
          method: "GET",
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();


      setData(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchData();
  }, []); // Fetch data whenever currentPage changes







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
            <h2 className="text-xl font-semibold">
              Purchased Packages
            </h2>

            {isLoading ? (

              <div className="flex flex-wrap justify-center w-full">
                {[...Array(2)].map((_, colIndex) => (
                  <div className="w-1/2 p-2" key={colIndex}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                      <div className="h-10 bg-gray-200 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

            ) : data && data.length === 0 ? (
              <div className="empty-message mt-4 mb-4">No Packages found</div>
            ) : (
              <>

                <table class="min-w-full table-auto mt-5">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-2 text-left">#</th>
                      <th class="px-4 py-2 text-left">Package Name</th>
                      <th class="px-4 py-2 text-left">Package Expire</th>
                      <th class="px-4 py-2 text-left">Package Duration</th>
                      <th class="px-4 py-2 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>

                    {data.map((item, index) => (
                      <tr class="border-t">
                        
                        <td>{index + 1}</td>
                        <td class="px-4 py-2">
                          <Link href={`/packages/${item.package_id}`}>
                          {item.Package_Title}
                          </Link>
                        </td>
                        <td class="px-4 py-2">{new Date(item.Link_Expire).toLocaleDateString()}</td>
                        <td class="px-4 py-2">
                          {item.Package_Duration} Days
                        </td>
                        <td class="px-4 py-2">
                          <Link href={`/my-account/packages/${item.package_id}`}  className={`text-left hover:text-white hover:hover:bg-gray-200 transition-colors  px-4 py-2`}>
                            View
                          </Link>
                        </td>

                      </tr>
                    ))}



                  </tbody>
                </table>

              </>
            )}



          </div>


        </div>


      </div>
    </div>


  );
}
