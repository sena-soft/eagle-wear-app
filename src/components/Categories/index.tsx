"use client";

import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";

import {
  getCategories,
  getProductByCategory,
} from "../../views/Products/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setData,
  setFilteredProducts,
  setLoading,
} from "../../store/productsSlice";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const Categories = () => {
  const dispatch: AppDispatch = useDispatch();

  const [categories, setCategories] = useState<string[]>([]);
  const [categoryActive, setCategoryActive] = useState<string>("All");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);
  const handleChangeCategory = (category: string) => {
    setCategoryActive(category);
    setFilter("");
    fetchProductsCategory(category);
  };
  const fetchProductsCategory = async (category: string) => {
    dispatch(setLoading(true));
    try {
      const response = await getProductByCategory(category);
      dispatch(setData(response));
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
  const handleFilterProducts = () => {
    dispatch(setFilteredProducts(filter));
  };
  const handleCancelFilterProducts = () => {
    setFilter("");
    dispatch(setFilteredProducts(""));
  };
  return (
    <nav>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-2 sm:p-4 md:p-8 overflow-hidden">
        <div className="flex flex-wrap gap-x-3">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleChangeCategory(category)}
              className={`text-sm leading-6 capitalize ${
                categoryActive === category
                  ? "text-red-500 font-extrabold "
                  : "text-slate-500 font-semibold hover:text-slate-500"
              } `}
            >
              {category}
            </Button>
          ))}
          <Button
            onClick={() => handleChangeCategory("All")}
            className={`text-sm leading-6 capitalize ${
              categoryActive === "All"
                ? "text-red-500 font-extrabold "
                : "text-slate-500 font-semibold hover:text-slate-500"
            } `}
          >
            All
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="flex-grow mx-2 py-1 px-2 border border-slate-400 rounded mr-2"
        />
        <div className="flex space-x-2 ml-auto mr-2">
          <button
            onClick={handleFilterProducts}
          >
            <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />

          </button>
          <button
            onClick={handleCancelFilterProducts}
          >
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />

          </button>
        </div>
      </div>
    </nav>
  );
};
