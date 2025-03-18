import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Movie = {
    id: number;
    title: string;
    price: number;
    image: string;
};

type CartState = {
    cart: Movie[];
};

const initialState: CartState = {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Movie>) => {
            const movie = action.payload;
            const existingMovie = state.cart.find((item) => item.id === movie.id);
            if (!existingMovie) {
                state.cart.push(movie);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
