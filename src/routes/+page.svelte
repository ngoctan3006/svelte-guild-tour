<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import Tour from '$lib/tour/Tour.svelte';
	import { Button } from '@sveltestrap/sveltestrap';
	import type { TourSteps } from '$lib/tour/types';
	import { onMount } from 'svelte';

	let logoEl: HTMLImageElement;
	let textEl: HTMLHeadingElement;
	let counterEl: HTMLDivElement;

	$: isOpenTour = false;

	onMount(() => {
		counterEl = document.getElementById('counter') as HTMLDivElement;
	});

	$: steps = [
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'top'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'bottom'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'left'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'right'
		},

		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'top-left'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'top-right'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'bottom-left'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'bottom-right'
		},

		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'left-top'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'left-bottom'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'right-top'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: counterEl,
			placement: 'right-bottom'
		}
	] as TourSteps[];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img bind:this={logoEl} src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2 bind:this={textEl}>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />

	<Button
		color="primary"
		on:click={() => {
			isOpenTour = true;
		}}
	>
		Start tour
	</Button>
</section>

<Tour
	{steps}
	open={isOpenTour}
	on:close={() => {
		isOpenTour = false;
	}}
/>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
