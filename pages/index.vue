<template>
	<div>
		<pre>cat is {{ selectedCategory }}</pre>
		<div class="filters">
			<el-select
				v-model="selectedCategory"
				placeholder="Выберите категорию"
				class="category-select"
				clearable
			>
				<el-option
					v-for="category in categories"
					:key="category"
					:label="category"
					:value="category"
				/>
			</el-select>
		</div>

		<template v-if="!isLoading">
			<el-row v-if="products.length" :gutter="20" class="products-grid">
				<el-col
					v-for="product in products"
					:key="product.id"
					:xs="24"
					:sm="12"
					:md="8"
					:lg="6"
				>
					<ProductCard :product="product" />
				</el-col>
			</el-row>
			<el-empty v-else description="Товары не найдены" />
		</template>
		<div v-else class="loading-container">
			<el-row :gutter="20" class="products-grid">
				<el-col v-for="n in 8" :key="n" :xs="24" :sm="12" :md="8" :lg="6">
					<el-card class="loading-card">
						<el-skeleton animated>
							<template #template>
								<el-skeleton-item variant="image" style="height: 200px" />
								<div style="padding: 14px">
									<el-skeleton-item variant="h3" style="width: 80%" />
									<el-skeleton-item variant="text" style="margin-top: 16px" />
									<el-skeleton-item variant="text" style="width: 30%" />
								</div>
							</template>
						</el-skeleton>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Category } from '../types/index';
import { useProductStore } from '../stores/products';
import { storeToRefs } from 'pinia';

const selectedCategory = ref<Category | ''>('');
const categories: Category[] = [
	'electronics',
	'jewelery',
	"men's clothing",
	"women's clothing",
];

onMounted(async () => {
	await productStore.fetchProducts();
	console.log('products fetched', products.value);
});

const productStore = useProductStore();
const { products, isLoading } = storeToRefs(productStore);

watch(selectedCategory, async (newCategory: Category | '') => {
	await productStore.fetchProducts(newCategory || undefined);
});
</script>

<style scoped>
.filters {
	margin-bottom: 2rem;
}

.category-select {
	width: 200px;
}

.products-grid {
	row-gap: 2rem;
}

.loading-container {
	margin-top: 1rem;
}

.loading-card {
	height: 100%;
	margin-bottom: 1rem;
}
</style>
