import { defineStore } from 'pinia';
import type { Product, CartItem } from '../types';

interface CartState {
	items: CartItem[];
}

export const useCartStore = defineStore('cart', {
	state: (): CartState => ({
		items: [],
	}),

	actions: {
		addToCart(product: Product): void {
			const existingItem = this.items.find((item) => item.id === product.id);

			if (existingItem) {
				existingItem.quantity++;
			} else {
				this.items.push({ ...product, quantity: 1 });
			}
		},

		removeFromCart(productId: number): void {
			this.items = this.items.filter((item) => item.id !== productId);
		},

		updateQuantity(productId: number, quantity: number): void {
			const item = this.items.find((item) => item.id === productId);
			if (item) {
				item.quantity = quantity;
			}
		},
	},

	getters: {
		totalItems: (state): number =>
			state.items.reduce((sum, item) => sum + item.quantity, 0),

		totalPrice: (state): number =>
			state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
	},
});
