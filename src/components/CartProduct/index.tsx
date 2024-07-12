import { TrashIcon } from "@heroicons/react/24/outline";
import { ProductProps } from "../Product/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import { setRemoveProductCart } from "../../store/cartSlice";

export const CartProduct = ({product}: ProductProps) => {
    const dispatch: AppDispatch = useDispatch();

    const handleRemoveProductCart =() => {
        dispatch(setRemoveProductCart(product.id));
        toast.success('Producto eliminado del carrito');
      }
  return (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={product.title}
          src={product.image}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="cursor-pointer">{product.title}</h3>
            <p className="ml-4">${product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Cantidad: {product.quantity}</p>

          <div className="flex">
            <button
              type="button"
              onClick={handleRemoveProductCart}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              <TrashIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
