
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  tagline: string;
  category: 'spicy' | 'mild';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  isLoggedIn: boolean;
}

export interface AuthContextType {
  user: User;
  showLogin: () => void;
  hideLogin: () => void;
  login: (name: string) => void;
  logout: () => void;
  isLoginVisible: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartVisible: boolean;
  showCart: () => void;
  hideCart: () => void;
}