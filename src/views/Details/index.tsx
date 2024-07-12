import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "../../components/RateProduct";
import { getProductByID } from "../Products/utils";
import { Products } from "../Products/types";
import { setNewProductCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { toast } from "react-toastify";
import { setLoading } from "../../store/productsSlice";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const DetailsView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Products>();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getProductByID(+productId!);
        setProduct(response);
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
        toast.error("Ha ocurrido un error al obtener el producto");
      }
    };

    fetchData();
  }, [productId]);

  const handleAddProductCart = () => {
    dispatch(setNewProductCart({ productId: +productId!, quantity: 1 }));
    toast.success("Producto Agregado al carrito");
  };

  return (
    <>
      <div>
        <Link
          to="/products"
          className="rounded-md text-sm font-semibold p-2 text-slate-500 shadow-sm hover:bg-slate-300"
        >
          Regresar
        </Link>
      </div>
      {isLoading ? (
        <Loading>Cargando Datos...</Loading>
      ) : (
        <>
          <div className="mx-auto mt-6 ">
            <div className="overflow-hidden rounded-lg">
              <img alt={product?.title} src={product?.image} width={300} />
            </div>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold  text-gray-900 sm:text-3xl">
                {product?.title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <p className="text-3xl  text-gray-900">${product?.price}</p>

              <div className="mt-6">
                {product && <StarRating rating={product!.rating} />}
              </div>

              <button
                type="submit"
                onClick={handleAddProductCart}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600  py-2 font-medium text-white hover:bg-indigo-700"
              >
                Agregar al Carrito
              </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default DetailsView;
