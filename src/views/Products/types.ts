export interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
  quantity: number;
}
interface Rating {
  rate: number;
  count: number;
}
