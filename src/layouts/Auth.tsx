import { Outlet, useNavigate } from "react-router-dom";
import LogoImage from '../assets/logo-2.png'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getIdUserByToken, getUserByToken } from "../views/Auth/utils";
import { setLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const AuthLayout = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(setLogin({user: getUserByToken(token), token: token, idUser: getIdUserByToken(token)}));
      navigate('/products', { replace: true });

    }

  }, [token])
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Company logo"
          src={LogoImage}
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicio de Sesión
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Outlet />
          <ToastContainer />

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
