<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LaTeX from '../components/LaTeX.vue'
import ToolTip from '../components/ToolTip.vue'
</script>

<template>
	<div class="centered">
		<RouterLink to="/levels">
			<div class="logo">
				<LaTeX expr="\mathbb{S}\varnothing\lambda\vec{\mathrm{v}}\mathrm{e}r\ell\alpha" />
			</div>
		</RouterLink>
		<ToolTip>Click the logo to start playing</ToolTip>
	</div>
</template>

<style scoped>
@keyframes beat {
	25% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.0075);
	}
	75% {
		transform: scale(1);
	}
}

.centered {
	position: fixed;
	left: 50%;
	top: 50%;
	transform-origin: center;
	transform: translate(-50%, -50%);
}

.logo {
	transform: rotate(calc(v-bind('(Math.random() < 0.5 ? 1 : -1) * Math.random() ** 2') * 1deg));
	transform-origin: center;
	font-size: 3rem;
	user-select: none;
	color: var(--text-color);
}

.logo > .latex {
	animation: 1s ease-in-out infinite beat;
}
</style>
