<template>
	<el-card :body-style="{ padding: '0px' }" class="product-card" shadow="hover">
		<div class="image-container">
			<el-image
				:src="props.product.image"
				class="product-image"
				fit="contain"
			/>
		</div>
		<div class="product-info">
			<h3 class="product-title">{{ props.product.title }}</h3>
			<div class="price">{{ props.product.price }} ₽</div>
			<div class="bottom">
				<el-button type="primary" @click="addToCart(props.product)">
					В корзину
				</el-button>
				<NuxtLink :to="`/product/${props.product.id}`">
					<el-button>Подробнее</el-button>
				</NuxtLink>
			</div>
		</div>
	</el-card>
</template>

<script setup lang="ts">
import type { Product } from '../types/index';
import { useCartStore } from '../stores/cart';
import { defineProps } from 'vue';

const props = defineProps<{
	product: Product;
}>();

const cartStore = useCartStore();

const addToCart = (product: Product): void => {
	cartStore.addToCart(product);
};
</script>

<style scoped>
.product-card {
	height: 100%;
	transition: transform 0.3s;
}

.product-card:hover {
	transform: translateY(-5px);
}

.image-container {
	height: 200px;
	padding: 1rem;
	background-color: white;
}

.product-image {
	height: 100%;
	width: 100%;
}

.product-info {
	padding: 1rem;
}

.product-title {
	font-size: 1rem;
	margin: 0;
	height: 3em;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
}

.price {
	font-size: 1.2em;
	font-weight: 600;
	color: var(--primary-color);
	margin: 1rem 0;
}

.bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
}
</style>
