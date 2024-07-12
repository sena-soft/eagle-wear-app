import axios from "../../config/axiosConfig";
import { DecodedToken, User } from "./types";
import { LoginFormProps } from "./types";
import { jwtDecode } from "jwt-decode";

export const authenticate = async (user: LoginFormProps): Promise<User> => {
  const response = await axios.post<User>(`/auth/login`, user);
  return response.data;
};

export const getIdUserByToken = (token: string): number => {
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    return decodedToken.sub;
  } catch (error) {
    return 0;
  }
};
export const getUserByToken = (token: string): string => {
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    return decodedToken.user;
  } catch (error) {
    return '';
  }
};
