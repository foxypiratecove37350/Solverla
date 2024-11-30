<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import LevelHeader from '@/components/LevelHeader.vue'
import LaTeX from '@/components/LaTeX.vue'
import { Level } from '@/scripts/level'
import UnlockedToolsList from '@/components/UnlockedToolsList.vue'

const route = useRoute()
const levelNumber = Number(route.query.level)

const headerHeight = ref('0')

const level = Level.getLevel(levelNumber)

onMounted(() => {
	const header = document.querySelector('header')

	if (header) {
		headerHeight.value = getComputedStyle(header).height
	}
})
</script>

<template>
	<LevelHeader :level="level.levelNumber" />

	<main>
		<LaTeX :expr="level.equation" />
		<LaTeX expr="" class="player-solution" />
		<UnlockedToolsList :level="level.levelNumber" />
	</main>
</template>

<style scoped>
main {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100vh - v-bind('headerHeight'));
	padding: 1rem 1.5rem;
	flex-direction: column;
	gap: 1rem;
}
</style>
