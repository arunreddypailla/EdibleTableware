export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  bulkPrice?: number;
  image: string;
  badge: string;
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  tags: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type User = {
  id?: number;
  name: string;
  email: string;
  token?: string;
};

export type CheckoutFormValues = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'Card' | 'UPI' | 'Cash on Delivery';
};
