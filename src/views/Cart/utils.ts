import axios from "../../config/axiosConfig";
import { Products } from "../Products/types";
import { UserCartProps } from "./types";


export const getUserCart = async (idUser: number): Promise<UserCartProps[]> => {
  const response = await axios.get<UserCartProps[]>(`/carts/user/${idUser}`);
  return response.data;
};
export const getSubtotal = (cartProducts: Products[]): number => {
  let subtotal = 0;
  cartProducts.forEach(product => {
    subtotal += (product.price * product.quantity);
  });
  return subtotal;
}


