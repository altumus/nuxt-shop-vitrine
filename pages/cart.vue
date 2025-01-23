<template>
	<div>
		<h1>Корзина</h1>
		<template v-if="cartStore.items.length">
			<el-table :data="cartStore.items" class="cart-table">
				<el-table-column prop="title" label="Название" min-width="200" />
				<el-table-column prop="price" label="Цена" width="120">
					<template #default="{ row }"> {{ row.price }} ₽ </template>
				</el-table-column>
				<el-table-column label="Количество" width="150" align="center">
					<template #default="{ row }">
						<el-input-number
							v-model="row.quantity"
							:min="1"
							size="small"
							:controls-position="'right'"
							@change="(value) => handleQuantityChange(row.id, value ?? 0)"
						/>
					</template>
				</el-table-column>
				<el-table-column label="Сумма" width="120">
					<template #default="{ row }">
						{{ row.price * row.quantity }} ₽
					</template>
				</el-table-column>
				<el-table-column label="Действия" width="120" align="center">
					<template #default="{ row }">
						<el-button
							type="danger"
							size="small"
							@click="cartStore.removeFromCart(row.id)"
						>
							Удалить
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="cart-total">
				<h3>Итого: {{ cartStore.totalPrice }} ₽</h3>
			</div>
		</template>
		<el-empty v-else description="Корзина пуста" />
	</div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
const cartStore = useCartStore();

const handleQuantityChange = (id: string, value: number) => {
	cartStore.updateQuantity(Number(id), value);
};
</script>

<style scoped>
.cart-table {
	margin-top: 2rem;
}

.cart-total {
	margin-top: 2rem;
	text-align: right;
	font-size: 1.2rem;
}
</style>
