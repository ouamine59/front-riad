import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  discount: boolean;
}

interface CartState {
  items: CartItem[];
  totalAmount: number; // Total price
  totalQuantity: number; // Total quantity
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0, // Initialize to 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items = [...state.items, action.payload];
      }
      state.totalAmount += action.payload.price * action.payload.quantity;
      state.totalQuantity += action.payload.quantity; // Update total quantity
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload,
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.items = state.items.filter((_, index) => index !== itemIndex);
        state.totalAmount -= item.price * item.quantity;
        state.totalQuantity -= item.quantity; // Update total quantity
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0; // Reset total quantity
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
