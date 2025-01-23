<template>
	<div class="error-page">
		<h1>404</h1>
		<p>Страница не найдена</p>
		<NuxtLink to="/">
			<el-button type="primary">Вернуться на главную</el-button>
		</NuxtLink>
	</div>
</template>

<style scoped>
.error-page {
	text-align: center;
	padding: 50px;
}
</style>
