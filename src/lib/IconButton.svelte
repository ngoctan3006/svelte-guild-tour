<script>
	import { Button } from '@sveltestrap/sveltestrap';
	import MdiIcon from './MdiIcon.svelte';

	export let icon;
	export let iconColor = '#fff';
	export let iconSize = '20px';
</script>

<Button on:click {...$$restProps}>
	<div class="d-flex align-items-center gap-1">
		<MdiIcon {icon} color={iconColor} size={iconSize} />
		<slot />
	</div>
</Button>

<style>
	:global(.custom-icon-button) {
		--bs-btn-bg: transparent;
		--bs-btn-hover-bg: var(--custom-bg-primary);
		--bs-btn-border-color: var(--custom-bg-primary);
		--bs-btn-hover-border-color: var(--custom-bg-primary);
		--bs-btn-disabled-bg: var(--custom-bg-primary);
		--bs-btn-disabled-border-color: var(--custom-bg-primary);
		--bs-btn-active-bg: var(--custom-bg-primary);
	}

	:global(.custom-icon-button svg) {
		fill: var(--custom-bg-primary);
	}

	:global(.custom-icon-button:hover svg) {
		fill: #fff;
	}

	:global(.custom-icon-button:hover) {
		--custom-text-color: #fff;
	}

	:global(.custom-icon-button:disabled svg) {
		fill: #fff;
	}
</style>
