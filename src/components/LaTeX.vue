<script setup lang="ts">
import katex from 'katex'
import { defineProps } from 'vue'

defineProps({
	expr: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div v-html="katex.renderToString(expr)" class="latex"></div>
</template>
