<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '@sveltestrap/sveltestrap';
	import type { TourSteps } from './types';
	import IconButton from '../IconButton.svelte';
	import { mdiClose } from '@mdi/js';

	const dispatch = createEventDispatcher();

	export let steps: TourSteps[];
	export let open = false;
	let activeStep = 0;

	$: active = steps?.[activeStep];
	$: randomId = Math.random().toString(36).slice(-3);
	$: activePosition = getElementPosition(active?.target);
	$: padding = 4;

	function getElementPosition(element?: HTMLElement) {
		const defaultRect = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		};
		const rect = element?.getBoundingClientRect() ?? defaultRect;
		return element
			? {
					top: rect.top - padding,
					bottom: rect.bottom + padding,
					left: rect.left - padding,
					right: rect.right + padding,
					width: rect.width + 2 * padding,
					height: rect.height + 2 * padding
				}
			: defaultRect;
	}

	function handleClose() {
		dispatch('close');
		activeStep = 0;
	}

	let tourContentPosition = '';

	$: {
		const placement = active?.placement || 'bottom';
		switch (placement) {
			case 'bottom':
				tourContentPosition = `--x-arrow: calc(var(--tour-width) / 2); --y-arrow: 0; top: ${activePosition.bottom + 4 * padding}px; left: ${
					(activePosition.left + activePosition.right) / 2
				}px;`;
				break;
			case 'top':
				tourContentPosition = `--x-arrow: calc(var(--tour-width) / 2); --y-arrow: 100%; bottom: calc(100vh - ${activePosition.top - 4 * padding}px); left: ${
					(activePosition.left + activePosition.right) / 2
				}px;`;
				break;
			case 'left':
				tourContentPosition = `--x-arrow: 100%; --y-arrow: 50%; top: ${
					(activePosition.top + activePosition.bottom) / 2
				}px; left: calc(${activePosition.left - 4 * padding}px - var(--tour-width));`;
				break;
			case 'right':
				tourContentPosition = `--x-arrow: 0; --y-arrow: 50%; top: ${(activePosition.top + activePosition.bottom) / 2}px; left: ${
					activePosition.right + 4 * padding
				}px;`;
				break;
			case 'top-right':
				tourContentPosition = `--x-arrow: ${activePosition.width / 2}px; --y-arrow: 100%; bottom: calc(100vh - ${activePosition.top - 4 * padding}px); left: ${activePosition.left}px;`;
				break;
			case 'top-left':
				tourContentPosition = `--x-arrow: calc(100% - ${activePosition.width / 2}px); --y-arrow: 100%; bottom: calc(100vh - ${activePosition.top - 4 * padding}px); left: calc(${activePosition.right}px - var(--tour-width));`;
				break;
			case 'bottom-right':
				tourContentPosition = `--x-arrow: ${activePosition.width / 2}px; --y-arrow: 0; top: ${activePosition.bottom + 4 * padding}px; left: ${activePosition.left}px`;
				break;
			case 'bottom-left':
				tourContentPosition = `--x-arrow: calc(100% - ${activePosition.width / 2}px); --y-arrow: 0; top: ${activePosition.bottom + 4 * padding}px; left: calc(${activePosition.right}px - var(--tour-width));`;
				break;
			case 'right-top':
				tourContentPosition = `--x-arrow: 0; --y-arrow: calc(100% - ${activePosition.height / 2}px); bottom: calc(100vh - ${activePosition.bottom}px); left: ${
					activePosition.right + 4 * padding
				}px;`;
				break;
			case 'left-top':
				tourContentPosition = `--x-arrow: 100%; --y-arrow: calc(100% - ${activePosition.height / 2}px); bottom: calc(100vh - ${activePosition.bottom}px); left: calc(${activePosition.left - 4 * padding}px - var(--tour-width));`;
				break;
			case 'right-bottom':
				tourContentPosition = `--x-arrow: 0; --y-arrow: ${activePosition.height / 2}px; top: ${activePosition.top}px; left: ${
					activePosition.right + 4 * padding
				}px;`;
				break;
			case 'left-bottom':
				tourContentPosition = `--x-arrow: 100%; --y-arrow: ${activePosition.height / 2}px; top: ${activePosition.top}px; left: calc(${activePosition.left - 4 * padding}px - var(--tour-width));`;
				break;
		}
	}
</script>

{#if open}
	<div class="tour-mask">
		<svg style="width: 100%; height: 100%;">
			<defs>
				<mask id="tour-mask-{randomId}">
					<rect x="0" y="0" width="100vw" height="100vh" fill="white" />
					<rect
						x={activePosition.left}
						y={activePosition.top}
						rx="2"
						width={activePosition.width}
						height={activePosition.height}
						fill="black"
						class="tour-animated"
					/>
				</mask>
			</defs>
			<rect
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill="rgba(0,0,0,0.5)"
				mask="url(#tour-mask-{randomId})"
			/>
			<rect fill="transparent" x="0" y="0" width="100%" height={activePosition.top} />
			<rect fill="transparent" x="0" y="0" width={activePosition.left} height="100%" />
			<rect
				fill="transparent"
				x="0"
				y={activePosition.bottom}
				width="100%"
				height="calc(100vh - {activePosition.bottom}px)"
			/>
			<rect
				fill="transparent"
				x={activePosition.right}
				y="0"
				width="calc(100vw - {activePosition.right}px)"
				height="100%"
			/>
		</svg>
	</div>

	<div
		class="tour tour-animated {active?.placement ? `tour-${active.placement}` : 'tour-bottom'}"
		style={tourContentPosition}
	>
		<div class="tour-arrow" />
		<div class="tour-content position-relative">
			<div class="tour-inner rounded-2">
				<IconButton icon={mdiClose} on:click={handleClose} class="tour-btn-close" />
				<div class="tour-header pt-2">
					<div class="tour-title">{active.title}</div>
				</div>
				{#if active.description}
					<div class="tour-description py-2">{active.description}</div>
				{/if}
				<div class="tour-footer">
					<div class="tour-indicators">
						{#each Array.from({ length: steps.length }, (_, i) => i) as i (i)}
							<span class="tour-indicator" class:tour-indicator-active={i === activeStep} />
						{/each}
					</div>
					<div class="tour-buttons">
						{#if activeStep !== 0}
							<Button
								outline
								color="primary"
								size="sm"
								on:click={() => {
									activeStep = activeStep - 1;
								}}
							>
								Previous
							</Button>
						{/if}
						{#if activeStep !== steps.length - 1}
							<Button
								color="primary"
								size="sm"
								on:click={() => {
									activeStep = activeStep + 1;
								}}
							>
								Next
							</Button>
						{/if}
						{#if activeStep === steps.length - 1}
							<Button color="primary" size="sm" on:click={handleClose}>End tour</Button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:root {
		--tour-width: 400px;
		--tour-z-index: 999;
	}

	.tour-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: var(--tour-z-index);
	}

	.tour-animated {
		transition: all 0.3s;
	}

	.tour {
		width: var(--tour-width);
		position: absolute;
		z-index: var(--tour-z-index);
	}

	.tour-top,
	.tour-bottom {
		transform: translateX(-50%);
	}

	.tour-left,
	.tour-right {
		transform: translateY(-50%);
	}

	.tour-arrow {
		position: absolute;
		left: var(--x-arrow);
		top: var(--y-arrow);
	}

	.tour-arrow:before {
		position: absolute;
		border: 0.5rem solid transparent;
		border-bottom-color: #fff;
		content: '';
	}

	.tour-bottom .tour-arrow:before,
	.tour-bottom-left .tour-arrow:before,
	.tour-bottom-right .tour-arrow:before {
		transform: translateX(-50%) translateY(-100%);
	}

	.tour-top .tour-arrow:before,
	.tour-top-left .tour-arrow:before,
	.tour-top-right .tour-arrow:before {
		transform: translateX(-50%) rotate(180deg);
	}

	.tour-left .tour-arrow:before,
	.tour-left-top .tour-arrow:before,
	.tour-left-bottom .tour-arrow:before {
		transform: translateY(-50%) rotate(90deg);
	}

	.tour-right .tour-arrow:before,
	.tour-right-top .tour-arrow:before,
	.tour-right-bottom .tour-arrow:before {
		transform: translateX(-100%) translateY(-50%) rotate(270deg);
	}

	.tour-inner {
		background-color: #fff;
		padding: 1rem;
	}

	:global(.tour-btn-close) {
		--bs-btn-bg: transparent;
		--bs-btn-hover-bg: transparent;
		--bs-btn-active-bg: transparent;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.125rem;
		border: none;
	}

	:global(.tour-btn-close svg) {
		fill: var(--bs-secondary);
	}

	.tour-title {
		font-weight: 600;
	}

	.tour-footer {
		display: flex;
	}

	.tour-indicators {
		display: inline-block;
	}

	.tour-indicator {
		width: 6px;
		height: 6px;
		display: inline-block;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.15);
	}

	.tour-indicator:not(:last-child) {
		margin-inline-end: 6px;
	}

	.tour-indicator.tour-indicator-active {
		background: var(--bs-primary);
	}

	.tour-buttons {
		margin-inline-start: auto;
	}

	@media only screen and (max-width: 768px) {
		:root {
			--tour-width: 300px;
		}
	}
</style>
