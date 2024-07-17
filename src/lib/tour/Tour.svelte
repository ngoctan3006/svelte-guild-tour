<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '@sveltestrap/sveltestrap';

	const dispatch = createEventDispatcher();

	interface TourSteps {
		title: string;
		description?: string;
		placement?: 'top' | 'bottom' | 'left' | 'right';
		target: Element;
	}

	export let steps: TourSteps[];
	export let open = false;
	let activeStep = 0;

	$: active = steps[activeStep];
	$: randomId = Math.random().toString(36).slice(-3);
	$: activePosition = getElementPosition(active.target);
	$: padding = 4;

	function getElementPosition(element?: Element) {
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
				tourContentPosition = `top: ${activePosition.bottom + 4 * padding}px; left: ${
					(activePosition.left + activePosition.right) / 2
				}px;`;
				break;
			case 'top':
				tourContentPosition = `bottom: calc(100vh - ${activePosition.top - 4 * padding}px); left: ${
					(activePosition.left + activePosition.right) / 2
				}px;`;
				break;
			case 'left':
				tourContentPosition = `top: ${
					(activePosition.top + activePosition.bottom) / 2
				}px; left: calc(${activePosition.left - 4 * padding}px - var(--tour-width));`;
				break;
			case 'right':
				tourContentPosition = `top: ${
					(activePosition.top + activePosition.bottom) / 2
				}px; left: ${activePosition.right + 4 * padding}px;`;
				break;
		}
	}
</script>

{#if open}
	<div class="tour-mask">
		<svg style="width: 100%; height: 100%;">
			<defs>
				<mask id="tour-mask-{randomId}">
					<rect x="0" y="0" width="100vw" height="100vh" fill="white"></rect>
					<rect
						x={activePosition.left}
						y={activePosition.top}
						rx="2"
						width={activePosition.width}
						height={activePosition.height}
						fill="black"
						class="tour-animated"
					>
					</rect>
				</mask>
			</defs>
			<rect
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill="rgba(0,0,0,0.5)"
				mask="url(#tour-mask-{randomId})"
			>
			</rect>
			<rect fill="transparent" x="0" y="0" width="100%" height={activePosition.top}> </rect>
			<rect fill="transparent" x="0" y="0" width={activePosition.left} height="100%"> </rect>
			<rect
				fill="transparent"
				x="0"
				y={activePosition.bottom}
				width="100%"
				height="calc(100vh - {activePosition.bottom}px)"
			>
			</rect>
			<rect
				fill="transparent"
				x={activePosition.right}
				y="0"
				width="calc(100vw - {activePosition.right}px)"
				height="100%"
			>
			</rect>
		</svg>
	</div>

	<div
		class="tour tour-animated {active?.placement ? `tour-${active.placement}` : 'tour-bottom'}"
		style={tourContentPosition}
	>
		<div class="tour-arrow"></div>
		<div class="tour-content position-relative">
			<div class="tour-inner rounded-2">
				<button on:click={handleClose} class="btn-close" />
				<div class="tour-header">
					<div class="tour-title">{active.title}</div>
				</div>
				{#if active.description}
					<div class="tour-description">{active.description}</div>
				{/if}
				<div class="tour-footer">
					<div class="tour-indicators">
						{#each Array.from({ length: steps.length }, (_, i) => i) as i (i)}
							<span class="tour-indicator" class:tour-indicator-active={i === activeStep}></span>
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
								<span>Previous</span>
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
								<span>Next</span>
							</Button>
						{/if}
						{#if activeStep === steps.length - 1}
							<Button color="primary" size="sm" on:click={handleClose}>
								<span>End tour</span>
							</Button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:root {
		--tour-width: 500px;
	}

	.tour-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}

	.tour-animated {
		transition: all 0.3s;
	}

	.tour {
		width: var(--tour-width);
		position: absolute;
		z-index: 9999;
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
		left: calc(var(--tour-width) / 2);
		top: 0;
	}

	.tour-top .tour-arrow {
		top: 100%;
	}

	.tour-left .tour-arrow {
		left: 100%;
		top: 50%;
	}

	.tour-right .tour-arrow {
		left: 0;
		top: 50%;
	}

	.tour-arrow:before {
		position: absolute;
		border: 0.5rem solid transparent;
		border-bottom-color: #fff;
		content: '';
	}

	.tour-bottom .tour-arrow:before {
		transform: translateX(-50%) translateY(-100%);
	}

	.tour-top .tour-arrow:before {
		transform: translateX(-50%) rotate(180deg);
	}

	.tour-left .tour-arrow:before {
		transform: translateY(-50%) rotate(90deg);
	}

	.tour-right .tour-arrow:before {
		transform: translateX(-100%) translateY(-50%) rotate(270deg);
	}

	.tour-inner {
		background-color: #fff;
		padding: 1rem;
	}

	.btn-close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
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
</style>
