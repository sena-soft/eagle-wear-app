import axios from "../../config/axiosConfig";
import { Products } from "./types";

export const getAllProducts = async (): Promise<Products[]> => {
   const response = await axios.get<Products[]>(`/products`);
   return response.data;
}

export const getProductByCategory = async (category: string): Promise<Products[]> => {
   if (category === 'All') {
      return await getAllProducts();
   }
   const response = await axios.get<Products[]>(`/products/category/${category}`);
   return response.data;
}

export const getProductByID = async (idProduct: number): Promise<Products> => {
   const response = await axios.get<Products>(`/products/${idProduct}`);
   return response.data;
}

export const getCategories = async (): Promise<string[]> => {
   const response = await axios.get<string[]>(`/products/categories`);
   return response.data;
}


