<template>
	<div v-if="product">
		<el-card>
			<el-row>
				<el-col :span="8">
					<el-image :src="product.image" />
				</el-col>
				<el-col :span="16">
					<h1>{{ product.title }}</h1>
					<p>{{ product.description }}</p>
					<div class="price">{{ product.price }} ₽</div>
					<el-button type="primary" @click="addToCart(product)">
						Добавить в корзину
					</el-button>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import type { Product } from '../../types/index';
import { useProductStore } from '../../stores/products';
import { useCartStore } from '../../stores/cart';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref<Product | null>(null);

onMounted(async () => {
	try {
		if (typeof route.params.id === 'string') {
			product.value = await productStore.getProduct(route.params.id);
			if (!product.value) {
				router.push('/404');
			}
		}
	} catch (error) {
		router.push('/404');
	}
});

const addToCart = (product: Product): void => {
	cartStore.addToCart(product);
};
</script>
