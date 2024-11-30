<script setup lang="ts">
import { computed } from 'vue'
import { Level } from '@/scripts/level'

const props = defineProps({
	level: {
		type: Number,
		required: true,
	},
	unlocked: {
		type: Boolean,
		default: false,
	},
})

const level = computed(() => {
	return Level.getLevel(props.level)
})
const color = computed(() => {
	if (!props.unlocked) {
		return '#555'
	}
	return Level.domainsColors[level.value.domain]
})
</script>

<template>
	<component
		:is="!props.unlocked ? 'div' : 'RouterLink'"
		class="link"
		:to="`/question?level=${level.levelNumber}`"
		>Level {{ level.levelNumber }}: {{ level.name }}</component
	>
</template>

<style scoped>
.link {
	color: var(--tooltip-text-color);
	text-decoration: none;
	background-color: v-bind('color');
	padding: 1rem 1.5rem;
	width: 20em;
	min-height: 5rem;
	font-weight: bold;
	border-radius: 1.5em;
	box-shadow: 0 0 12px #0005;
	display: flex;
	justify-content: center;
	align-items: center;
}

a.link:hover {
	background-color: color-mix(in srgb, v-bind('color') 90%, black 10%);
	box-shadow: 0 0 12px #0008;
}
</style>
