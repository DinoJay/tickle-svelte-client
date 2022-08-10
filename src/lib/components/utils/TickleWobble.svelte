<div class="flex top-0 h-full w-full fixed bg-transparent">
	<img class="wobble m-auto" src="/alt_tickle_icon.svg" alt="loader" />
</div>

<style>
	.wobble {
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
