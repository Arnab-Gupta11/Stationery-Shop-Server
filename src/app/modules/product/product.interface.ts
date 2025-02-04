//Define a Typescript type for a Product.
export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category:
    | 'Writing'
    | 'Office Supplies'
    | 'Art Supplies'
    | 'Educational'
    | 'Technology';
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
  rating: number;
  totalReviews: number;
  totalRating: number;
};
