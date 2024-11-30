<script setup lang="ts">
import LevelHeader from '@/components/LevelHeader.vue'
import LevelsListItem from '@/components/LevelsListItem.vue'
import { Level } from '@/scripts/level'
import { ref } from 'vue'

const lastLevel = ref(0) // Test
</script>

<template>
	<div class="main">
		<LevelHeader :level="Math.min(lastLevel + 1, Level.levels.length)" />
		<main>
			<LevelsListItem
				v-for="({ levelNumber }, index) in Level.levels"
				:key="index"
				:level="levelNumber"
				:style="{
					marginLeft:
						(index % 2 ? 1 : -1) * (1 - Math.pow(Math.random(), 2)) * 20 + 'rem',
				}"
				:unlocked="levelNumber <= lastLevel + 1"
			/>
		</main>
	</div>
</template>

<style scoped>
@keyframes fade-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.main {
	animation: fade-in 0.75s ease;
}

main {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem 1.5rem;
}
</style>
