<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import Tour from '$lib/tour/Tour.svelte';
	import { Button } from '@sveltestrap/sveltestrap';

	let logoEl: HTMLImageElement;
	let textEl: HTMLHeadingElement;

	let isOpenTour = false;

	$: steps = [
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: logoEl
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: logoEl,
			placement: 'top'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: textEl,
			placement: 'left'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: textEl,
			placement: 'right'
		},
		{
			title: 'Welcome',
			description: 'Welcome to SvelteKit',
			target: textEl,
			placement: 'top'
		}
	];
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
