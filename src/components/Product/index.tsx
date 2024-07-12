import { Link } from "react-router-dom";
import StarRating from "../RateProduct";
import { ProductProps } from "./types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import { setNewProductCart } from "../../store/cartSlice";

export const Product = ({ product }: ProductProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddProductCart = () => {
    dispatch(setNewProductCart({ productId: product.id, quantity: 1 }));
    toast.success("Producto Agregado al carrito");
  };
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-80">
        <img
          alt={product.title}
          src={product.image}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <Link to={`/products/${product.id}`}>
            <h3 className="text-sm text-gray-700">{product.title}</h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      <StarRating rating={product.rating} />
      <button
        onClick={handleAddProductCart}
        className=" w-full font-medium text-indigo-600 hover:text-indigo-500"
      >
        Agregar
      </button>
    </div>
  );
};
