import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartProps } from "./types";
import { getSubtotal } from "./utils";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import useFetchCartProducts from "../../hooks/useGetCartProducts";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/cartSlice";
import { CartProduct } from "../../components/CartProduct";

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { products: cartProducts } = useSelector(
    (state: RootState) => state.cart.data
  );
  const { products} = useFetchCartProducts(cartProducts);


  const onSubmit = () => {
    dispatch(setCart({
        id: 0,
        userId: 0,
        date: '',
        products: []
      }));
    onClose();
  }
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-60">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col pt-20 overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Mi carrito
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                        {
                            products.length>0 ? (
                                <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {products.map((product) => (
                                  <CartProduct key={product.id} product={product} />
                                ))}
                              </ul>
                            ) : <p className="text-center">No hay productos en el carrito</p>
                        }
                      
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${getSubtotal(products)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Los impuestos se calcularán el finalizar la compra
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Finalizar compra
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      <button
                        type="button"
                        onClick={onClose}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continuar comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
