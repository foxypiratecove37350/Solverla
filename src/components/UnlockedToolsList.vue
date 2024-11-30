<script setup lang="ts">
import { Level } from '@/scripts/level'
import UnlockedTool from './UnlockedTool.vue'

const props = defineProps({
	level: {
		type: Number,
		required: true,
	},
})

const level = Level.getLevel(props.level)
let previousLevelTools: string[]

try {
	previousLevelTools = Level.getLevel(props.level - 1).tools
} catch {
	previousLevelTools = []
}
</script>

<template>
	<div class="tools-container">
		<UnlockedTool
			v-for="(expr, index) in level.tools"
			:key="index"
			:expr="expr"
			:new="!previousLevelTools.includes(expr)"
		/>
	</div>
</template>

<style scoped>
.tools-container {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: center;
	align-items: center;
}
</style>
