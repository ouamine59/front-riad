import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: { url?: string } | null;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // eslint-disable-next-line no-param-reassign
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
    },
    // eslint-disable-next-line no-param-reassign
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload,
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.items = state.items.filter((_, index) => index !== itemIndex);
        state.totalAmount -= item.price * item.quantity;
      }
    },
    // eslint-disable-next-line no-param-reassign
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
