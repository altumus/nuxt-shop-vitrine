<template>
	<div>
		<el-container>
			<el-header>
				<nav class="nav-container">
					<div class="logo">
						<NuxtLink to="/">Shop Vitrine</NuxtLink>
					</div>
					<div class="nav-links">
						<NuxtLink to="/" class="nav-link">Главная</NuxtLink>
						<NuxtLink to="/cart" class="nav-link">
							<el-badge
								:value="cartStore.items.length"
								:hidden="!cartStore.items.length"
							>
								Корзина
							</el-badge>
						</NuxtLink>
					</div>
				</nav>
			</el-header>
			<el-main>
				<NuxtPage />
			</el-main>
		</el-container>
	</div>
</template>

<script setup>
import { useCartStore } from './stores/cart';
const cartStore = useCartStore();

const router = useRouter();

router.onError(() => {
	router.push('/');
});

router.beforeEach((to, from, next) => {
	if (!to.matched.length) {
		next('/');
	} else {
		next();
	}
});
</script>

<style scoped>
.nav-container {
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 0 1rem;
}

.logo a {
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--primary-color);
	text-decoration: none;
}

.nav-links {
	display: flex;
	gap: 2rem;
}

.nav-link {
	text-decoration: none;
	color: var(--text-color);
	font-weight: 500;
	transition: color 0.3s;
}

.nav-link:hover {
	color: var(--primary-color);
}

.router-link-active {
	color: var(--primary-color);
}
</style>

