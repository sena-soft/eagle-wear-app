import { useEffect } from "react";
import { Product } from "../../components/Product";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData, setLoading } from "../../store/productsSlice";
import { getAllProducts } from "./utils";
import { Categories } from "../../components/Categories";
import Loading from "../../components/Loading";

export const ProductsView = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.loading);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getAllProducts();
        dispatch(setData(response));
        dispatch(setLoading(false));
      } catch (err) {
        console.log(err);
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="bg-white">
      <Categories />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {isLoading ? (
          <Loading>Cargando Productos</Loading>
        ) : (
          <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Lista de Productos
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
