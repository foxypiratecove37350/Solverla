<script setup lang="ts">
import LaTeX from './LaTeX.vue'

const props = defineProps({
	expr: {
		type: String,
		required: true,
	},
	new: {
		type: Boolean,
		default: false,
	},
})
</script>

<template>
	<div class="tool" :class="{ new: props.new }">
		<LaTeX :expr="props.expr" />
	</div>
</template>

<style scoped>
.tool {
	background-color: #fff;
	padding: 0.25em 0.5em;
	padding-bottom: 0.55em;
	width: max-content;
	border-radius: 0.75em;
	border: 2px solid #ccc;
	box-shadow:
		inset 0 -0.3em #aaa,
		0 0 6px #0003;
	cursor: pointer;
}

.tool:hover {
	background-color: #eee;
}

.tool:active {
	background-color: #ddd;
	margin-top: 0.3em;
	padding-bottom: 0.25em;
}

.tool.new {
	position: relative;
	color: #ed2939;
}

.tool.new::before {
	content: '';
	display: block;
	background-color: currentColor;
	width: calc(100% - 2 * 0.5em);
	height: 0.1em;
	position: absolute;
	bottom: 0.55em;
	border-radius: 999px;
}
</style>
