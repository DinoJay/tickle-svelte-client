<script>
	export let className = '';
	export let style = '';
</script>

<div class="loader-container {className}" {style}>
	<img class="wobble m-auto" src="/alt_tickle_icon.svg" alt="loader" />
</div>

<style>
	.loader-container {
		@apply h-[calc(100vh-4rem)] w-screen flex;
	}

	.wobble {
		@apply m-auto;
		animation-duration: 1s;
		animation-name: wob;
		animation-iteration-count: infinite;
	}

	@keyframes wob {
		0% {
			width: 90px;
			height: 90px;
		}

		50% {
			width: 160px;
			height: 160px;
		}

		100% {
			width: 90px;
			height: 90px;
		}
	}
</style>
