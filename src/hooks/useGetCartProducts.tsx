import { useState, useEffect } from 'react';
import { CartProduct } from '../views/Cart/types';
import { Products } from '../views/Products/types';
import { getProductByID } from '../views/Products/utils';


const useFetchCartProducts = (cartProducts: CartProduct[]) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productsDetails = cartProducts.map(async (cartProduct) => {
          const response = await getProductByID(cartProduct.productId);
          return {...response, quantity: cartProduct.quantity};
        });

        const productsData = await Promise.all(productsDetails);
        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [cartProducts]);

  return { products, loading, error };
};

export default useFetchCartProducts;
