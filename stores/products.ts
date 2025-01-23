import { defineStore } from 'pinia';
import type { Product, Category } from '../types';

export const useProductStore = defineStore('products', {
	state: () => ({
		products: [] as Product[],
		isLoading: true,
		error: null as Error | null,
	}),

	actions: {
		async fetchProducts(category?: Category) {
			this.isLoading = true;
			try {
				const data = await $fetch<Product[]>(
					`https://fakestoreapi.com/products${
						category ? '/category/' + category : ''
					}`
				);
				this.products = data;
			} catch (e) {
				this.error = e as Error;
			} finally {
				this.isLoading = false;
			}
		},

		async getProduct(id: string): Promise<Product | null> {
			try {
				const data = await $fetch<Product>(
					`https://fakestoreapi.com/products/${id}`
				);
				return data;
			} catch (e) {
				this.error = e as Error;
				return null;
			}
		},
	},
});
