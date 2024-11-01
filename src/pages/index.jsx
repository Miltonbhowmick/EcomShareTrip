import { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/product/card";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/pagination";

export default function IndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPageParam = parseInt(searchParams.get("page")) || 1;
  const sortByParam = searchParams.get("sortBy") || null;
  const orderParam = searchParams.get("order") || null;

  const [currentPage, setCurrentPage] = useState(initialPageParam);
  const [sortBy, setSortBy] = useState(sortByParam);
  const [order, setOrder] = useState(orderParam);
  const [products, setProducts] = useState([]);
  const limit = useRef(20);
  const skip = useRef(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isOpenFilterDropdown, setIsOpenFilterDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const buildApiParams = () => {
    let params = {
      limit: limit.current,
      skip: (currentPage - 1) * limit.current,
      select:
        "id,title,brand,thumbnail,price,discountPercentage,sku,minimumOrderQuantity",
    };

    // Adding url params
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };
  const handleFetchProducts = () => {
    const params = buildApiParams();

    fetchProducts(params).then((data) => {
      setProducts(data.products);
      let total = Math.ceil(data.total / limit.current);
      setTotalPages(total);
    });
  };

  const handlePageChange = (index) => {
    // When users want to fetch products of a specific page
    setCurrentPage(index);
    setSearchParams((params) => {
      params.set("page", index);
      return params;
    });
  };

  useEffect(() => {
    handleFetchProducts();
  }, [searchParams, currentPage]);

  const handleFilter = (type, order) => {
    if (type && order) {
      setSortBy(type);
      setOrder(order);
      setSearchParams((params) => {
        params.set("sortBy", type);
        params.set("order", order);
        return params;
      });
      setIsOpenFilterDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Just to handle close of filter dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">
          Ecom <span className="text-primaryBg">ShareTrip</span>
        </h2>

        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setIsOpenFilterDropdown(!isOpenFilterDropdown)}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sort By
            <svg
              className="ml-2 -mr-1 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpenFilterDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999]">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => handleFilter("title", "asc")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Title (A-Z)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilter("title", "desc")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Title (Z-A)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilter("price", "asc")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Price (Low to High)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilter("price", "desc")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Price (High to Low)
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {products && (
        <div className="mt-12 flex items-center justify-center gap-x-4 gap-y-6 flex-wrap min-h-[400px]">
          {products.map((productItem, index) => {
            return (
              <ProductCard
                itemData={productItem}
                key={"product_item_" + productItem.id}
              />
            );
          })}
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
