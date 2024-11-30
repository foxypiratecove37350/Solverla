<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Level } from '@/scripts/level'

const props = defineProps({
	level: {
		type: Number,
		required: true,
	},
})

const header = ref<HTMLElement | null>(null)
const levelNumber = props.level
const levelInstance = Level.getLevel(levelNumber)

const headerLength = ref(0)

onMounted(() => {
	if (header.value) {
		headerLength.value = header.value.children.length
	}
})
</script>

<template>
	<header ref="header">
		<span>Level {{ levelNumber }}</span>
		<span>{{ levelInstance.name }}</span>
		<span>{{ levelInstance.domain }}</span>
	</header>
</template>

<style scoped>
header {
	width: 100%;
	background-color: v-bind('Level.domainsColors[levelInstance.domain]');
	color: var(--tooltip-text-color);
	padding: 0.25em 0.5em;
	display: grid;
	grid-template-rows: 100%;
	grid-template-columns: repeat(v-bind('headerLength'), 1fr);
	box-shadow: 0 0 12px #0005;
	position: sticky;
	top: 0;
	z-index: 1;
}

header span {
	text-align: center;
}

header span:first-child {
	text-align: left;
}

header span:last-child {
	text-align: right;
}
</style>
