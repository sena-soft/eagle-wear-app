
export interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}
export interface CartProduct {
    productId: number;
    quantity: number;
  }
export interface UserCartProps {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
}