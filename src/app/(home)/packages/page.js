'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecipesPdf() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const [searchTerm, setSearchTerm] = useState('');


  async function fetchData(page = 1, search = '') {
    setIsLoading(true);
    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/listPackage?limit=6&page=${page}&search=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.data);
      setTotalPages(result.pagination.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    fetchData(1, value);
  };



  return (

    <>
      <div className="product-area pt-100 pb-70">
        <div className="container mx-auto">
          <div className="product-topper mt-5">
            <div className="flex align-items-center">
              <div className="w-full">
                <div className="product-title">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add your recipes and pagination UI here */}
        </div>
      </div>

      {/* <h1>{searchCat}</h1> */}

      <div className="product-area pt-100 pb-70">
        <div className="container mx-auto">
          <div className="pdf_backend">
            <div className="flex py-14">
              <div className="w-3/3">
                <div className="flex flex-row flex-wrap">
                  {isLoading ? (
                    <>

                      {/* Loop through rows for a skeleton table */}
                      <div className="flex flex-wrap justify-center w-full">
                        {[...Array(6)].map((_, colIndex) => (
                          <div className="w-1/3 p-2">
                            <div key={colIndex} className="bg-white shadow-lg rounded-lg overflow-hidden">
                              <div className="h-48 bg-gray-200 animate-pulse"></div>
                              <div className="p-4">
                                <h2 className="h-6 bg-gray-300 rounded-md animate-pulse w-3/4 mb-2"></h2>
                                <p className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6 mb-2"></p>
                                <div className="mt-4 flex justify-start">
                                  <button className="h-8 w-20 bg-yellow-100 rounded-md animate-pulse"></button>
                                </div>
                              </div>
                            </div>
                          </div>

                        ))}
                      </div>

                    </>
                  ) : data && data.length === 0 ? (
                    <div>No data found</div>
                  ) : (
                    data.map((item, index) => (
                      <div className="w-1/3 px-2" key={index}>
                        <div className="product-card">
                          <div className="product-img">
                            <Link href={`/packages/${item.id}`}>
                              <img
                                src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${item.Package_image}`}
                                alt="Product Images"
                              />
                            </Link>
                          </div>
                          <div className="content">
                            <h3>
                              <Link href={`/packages/${item.id}`}>
                                {item.Package_Title.length > 30 ?
                                  item.Package_Title.substring(0, 30) + '...' :
                                  item.Package_Title}
                              </Link>
                            </h3>
                            <span>${item.Package_Price}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>




                <div className="pagination-area">
                  <button
                    className="prev page-numbers"
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        fetchData(currentPage - 1); // Fetch previous page
                      }
                    }}
                    disabled={currentPage === 1}
                  >
                    {/* <i className="bx bx-chevron-left"></i> */}
                    «
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={`page-${index + 1}`} // Unique key for each button
                      className={`page-numbers ${currentPage === index + 1 ? 'current' : ''}`}
                      onClick={() => {
                        setCurrentPage(index + 1);
                        fetchData(index + 1); // Fetch data for the clicked page
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="next page-numbers"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                        fetchData(currentPage + 1); // Fetch next page
                      }
                    }}
                    disabled={currentPage === totalPages}
                  >
                    {/* <i className="bx bx-chevron-right"></i> */}
                    »
                  </button>
                </div>




              </div>


            </div>
          </div>
        </div>
      </div>

    </>

  );
}
