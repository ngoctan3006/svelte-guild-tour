<script>
	export let size = '20px';
	export let color = '#444';
	export let icon;

	let clazz = '';
	export { clazz as class };
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	class="mdi-icon {clazz}"
	{...$$restProps}
	fill={color}
	viewBox="0 0 24 24"
>
	<path d={icon} />
</svg>

<style>
	.mdi-icon {
		vertical-align: text-bottom;
	}
</style>
