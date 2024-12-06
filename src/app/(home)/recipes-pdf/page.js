'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecipesPdf() {
  const [dataCat, setDataCat] = useState([]);
  const [isLoadingCat, setIsLoadingCat] = useState(true);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchCat, setSearchCat] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchCategory() {
      setIsLoadingCat(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/listCategory`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setDataCat(result.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoadingCat(false);
      }
    }

    fetchCategory();
  }, []);

  async function fetchData(cat_id = '', page = 1, search = '') {
    setIsLoading(true);
    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/listRecipePDF?limit=6&categoryId=${cat_id}&page=${page}&search=${encodeURIComponent(search)}`,
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
    fetchData('', currentPage, searchTerm);
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    fetchData('', 1, value);
  };

  const handleCategoryClick = (cat_id) => {
    setSearchCat(cat_id);
    setCurrentPage(1);
    fetchData(cat_id, 1, searchTerm);
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
              <div className="w-2/3">
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
                            <Link href={`/recipes-pdf/${item.recipe_slug}`}>
                              <img
                                src={`${process.env.NEXT_PUBLIC_Backend_API_URL}/${item.recipe_thum_image}`}
                                alt="Product Images"
                              />
                            </Link>
                          </div>
                          <div className="content">
                            <h3>
                              <Link href={`/recipes-pdf/${item.recipe_slug}`}>
                                {item.recipe_name.length > 30 ?
                                  item.recipe_name.substring(0, 30) + '...' :
                                  item.recipe_name}
                              </Link>
                            </h3>
                            <span>${item.recipe_Price}</span>
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
                        fetchData(searchCat, currentPage - 1); // Fetch previous page
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
                        fetchData(searchCat, index + 1); // Fetch data for the clicked page
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
                        fetchData(searchCat, currentPage + 1); // Fetch next page
                      }
                    }}
                    disabled={currentPage === totalPages}
                  >
                    {/* <i className="bx bx-chevron-right"></i> */}
                    »
                  </button>
                </div>




              </div>


              <div className="w-1/3">
                <div className="side-bar-area pl-20">
                  <div className="recipe-side-bar-categories">
                    <h3>Categories</h3>
                    <ul>
                      {isLoadingCat ? (

                        <>
                          {/* Loop through rows for a skeleton table */}
                          <div className="flex flex-wrap justify-center gap-4">
                            {[...Array(4)].map((_, colIndex) => (
                              <div key={colIndex} className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-4">
                                  <h2 className="h-6 bg-gray-300 rounded-md animate-pulse w-3/4 mb-2"></h2>
                                </div>
                              </div>
                            ))}
                          </div>

                        </>

                      ) : dataCat && dataCat.length === 0 ? (
                        <div>No category found</div>
                      ) : (
                        dataCat.map((item, index) => (
                          <li key={index} onClick={() => handleCategoryClick(item.id)}>
                            <Link className={item.id === searchCat ? 'activeCatTab' : ''} href="">{item.categoryName}</Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
}
