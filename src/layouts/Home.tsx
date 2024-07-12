import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Cart } from "../views/Cart";
import { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ArrowRightEndOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { setLogout } from "../store/authSlice";
import { getUserCart } from "../views/Cart/utils";
import { setCart } from "../store/cartSlice";
import LogoImage from "../assets/eaglewear.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../components/Footer";
const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { user, idUser } = useSelector((state: RootState) => state.auth.user);
  
  const { products } = useSelector((state: RootState) => state.cart.data);
  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await getUserCart(idUser);
        console.log(response[0]);
        dispatch(setCart(response[0]));
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, []);
  const handleOpenCart = () => {
    setCartOpen(true);
  };
  const handleCloseCart = () => {
    setCartOpen(false);
  };
  const handleLogout = () => {
    dispatch(setLogout(""));
  };
  return (
    <>
      <header className="bg-slate-800 fixed top-0 left-0 w-full flex gap-3 items-center justify-between z-50 shadow-md">
        <Link
          to="/products"
          className="rounded-md inline-flex pr-2 items-center text-sm font-semibold text-slate-500 shadow-sm hover:opacity-60"
        >
          <img
            alt="Company logo"
            src={LogoImage}
            className="mx-auto h-20 w-auto"
          />
          <h1 className="hidden sm:block font-extrabold text-2xl text-red-500"> Eagle Wear </h1>
        </Link>
        <div>
          <div className="hidden sm:inline-flex text-white mr-3">
            <p className="text-xs">Bienvenido {user}</p>
          </div>

          <div
            className="inline-flex text-xs rounded-md p-1 cursor-pointer items-center mr-3 text-white hover:opacity-60 "
            onClick={handleOpenCart}
          >
            ({products.length})
            <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
          </div>
          <div
            onClick={handleLogout}
            className="inline-flex text-xs rounded-md p-1 items-center mr-2 text-white cursor-pointer hover:opacity-60"
          >
            Cerrar Sesión
            <ArrowRightEndOnRectangleIcon
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>
        </div>
      </header>
      <Cart isOpen={cartOpen} onClose={handleCloseCart} />
      <ToastContainer />
      <main className="mt mx-auto max-w-6xl mt-10 p-12 bg-slate-100  shadow">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
