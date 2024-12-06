'use client'

import { useEffect, useState } from 'react';
import Link from "next/link";



export default function myList({ params }) {

  const pack_id = params.pack_id; // Safely access params


  const [data, setData] = useState([]); // Initialize with empty array
  const [dataAttr, setdataAttr] = useState([]); // Initialize with empty array
  const [isLoading, setIsLoading] = useState(true);


  // Fetch recipe data
  async function fetchData() {
    setIsLoading(true); // Set loading state before fetching data
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/singlePurchasedPackage/${pack_id}`,
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
      setdataAttr(result.dataAttr);
      setIsLoading(false);

      console.log(result.data);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchData();
  }, []); // Fetch data whenever currentPage changes


  // Function to encode a string to base64
  function encodeToBase64(inputString) {
    return Buffer.from(inputString.toString(), 'utf-8').toString('base64');
  }

  // Function to decode a base64 string back to the original string
  function decodeFromBase64(base64String) {
    return Buffer.from(base64String.toString(), 'base64').toString('utf-8');
  }




  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-wrap -mx-4">
        {/* Sidebar */}
        {/* <div className="w-full md:w-1/4 px-4">
          <h5 className="mb-4 font-semibold text-lg">MY ACCOUNT</h5>
          <MyNav />
        </div> */}
        {/* Dashboard Content */}
        <div className="w-full md:w-4/4 px-4">


          <div id="dashboard-content" className="dashboard-content">
            <h2 className="text-xl font-semibold">
              {data.Package_Title}
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
                      {/* <th class="px-4 py-2 text-left">Type</th> */}
                      <th class="px-4 py-2 text-left">Steps</th>
                      <th class="px-4 py-2 text-left">Start Date</th>
                      <th class="px-4 py-2 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>

                    {data.Pur_Package_attr_type.map((item, index) => {
                      const attrDate = new Date(data.Pur_Package_attr_Date[index]); // Get the date of the current row
                      const currentDate = new Date(); // Get the current date for comparison

                      // Enable the row only if the attribute date is less than the current date
                      const isEnabled = attrDate < currentDate;

                      return (
                        <tr
                          key={index}
                          className={`border-t border-b border-gray-200 ${isEnabled ? '' : 'bg-gray-100 cursor-not-allowed opacity-50'
                            }`}
                        >
                          <td>{index + 1}</td>

                          <td className="px-4 py-2">
                            {dataAttr[data.Package_attr_value[index]] && dataAttr[data.Package_attr_value[index]].attributes_title_user
                              ? dataAttr[data.Package_attr_value[index]].attributes_title_user
                              : 'Call with Abir Life'}
                          </td>

                          <td className="px-4 py-2">{attrDate.toLocaleDateString()}</td>

                          <td className="px-4 py-2">
                            {isEnabled && (

                              data.Pur_Package_attr_type[index] === 'Recipe' ? (
                                <Link
                                  href={`/my-account/packages/view?Pack_ID=${data.id}&Pack_Attr=${encodeToBase64(data.Package_attr_value[index])}`}
                                  className="text-left hover:text-white hover:bg-gray-200 transition-colors px-4 py-2"
                                >
                                  View
                                </Link>
                              ) : (
                                <Link
                                  href={`/my-account/packages/call-view?Book_ID=${encodeToBase64(data.id)}`}
                                  className="text-left hover:text-white hover:bg-gray-200 transition-colors px-4 py-2"
                                >
                                  View Timing
                                </Link>
                              )

                            )}
                          </td>
                        </tr>
                      );

                    })}




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
