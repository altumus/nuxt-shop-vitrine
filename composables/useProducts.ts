import type { Product, Category } from '~/types';

export const useProducts = () => {
	const products = ref<Product[]>([]);
	const isLoading = ref(false);
	const error = ref<Error | null>(null);

	const fetchProducts = async (category?: Category) => {
		isLoading.value = true;
		try {
			const { data } = await useFetch<Product[]>(
				`https://fakestoreapi.com/products${
					category ? '/category/' + category : ''
				}`
			);
			if (data.value) {
				products.value = data.value;
			}
		} catch (e) {
			error.value = e as Error;
		} finally {
			isLoading.value = false;
		}
	};

	const getProduct = async (id: string): Promise<Product> => {
		const { data } = await useFetch<Product>(
			`https://fakestoreapi.com/products/${id}`
		);
		return data.value as Product;
	};

	return {
		products,
		isLoading,
		error,
		fetchProducts,
		getProduct,
	};
};
