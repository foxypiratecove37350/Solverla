<template>
	<div class="tooltip">
		<slot></slot>
	</div>
</template>

<style scoped>
.tooltip {
	width: max-content;
	max-width: 100%;
	background: var(--tooltip-background-color);
	color: var(--tooltip-text-color);
	margin: 0 auto;
	padding: 0.25em 0.5em;
	border-radius: 0.5em;
	text-align: center;
}
</style>
