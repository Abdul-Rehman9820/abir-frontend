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
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/getPurchasedRecipe`,
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




  const handelDownloadPDF = async (download_id) => {

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/getPurchasedRecipe`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', // Ensure correct content type is set
          },
          credentials: 'include',
          body: JSON.stringify({ download_id }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.success === true) {
        const pdName = result.data.recipe_name; // Get the name for the PDF file
        const pdfUrl = result.data.recipe_PDF;
        const fullPdfUrl = `${process.env.NEXT_PUBLIC_Backend_API_URL}/${pdfUrl}`;

        try {
          // Fetch the PDF file as a blob
          const fileResponse = await fetch(fullPdfUrl);
          const fileBlob = await fileResponse.blob();

          // Create a temporary link element
          const link = document.createElement('a');
          link.href = URL.createObjectURL(fileBlob);

          // Set download name to pdName (adding .pdf extension if not included)
          link.download = pdName.endsWith('.pdf') ? pdName : `${pdName}.pdf`;

          // Append to the document body and trigger download
          document.body.appendChild(link);
          link.click();

          // Clean up by revoking the object URL and removing the link
          URL.revokeObjectURL(link.href);
          document.body.removeChild(link);

          fetchData(); // recalling


        } catch (error) {
          console.error("Failed to download file:", error);
        }
      } else {
        console.error(result.message);
      }



    } catch (error) {
      console.error(error);

    }


  };


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
            Purchased PDF
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
              <div className="empty-message mt-4 mb-4">No PDF found</div>
            ) : (
              <>

                <table class="min-w-full table-auto mt-5">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-2 text-left">#</th>
                      <th class="px-4 py-2 text-left">PDF Name</th>
                      <th class="px-4 py-2 text-left">Link Expire</th>
                      <th class="px-4 py-2 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>

                    {data.map((item, index) => (
                      <tr class="border-t">
                        <td>{index + 1}</td>
                        <td class="px-4 py-2">
                          <Link href={`/recipes-pdf/${item.recipe_slug}`}>
                          {item.recipe_name}
                          </Link>
                        </td>
                        <td class="px-4 py-2">{new Date(item.Link_Expire).toLocaleDateString()}</td>
                        <td class="px-4 py-2">
                          <button onClick={() => handelDownloadPDF(item.id)} className={`text-left hover:text-white hover:bg-gray-200 transition-colors  px-4 py-2`}>
                            Download
                          </button>
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
