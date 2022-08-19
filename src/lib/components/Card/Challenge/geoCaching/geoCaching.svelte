<script>
	import PicturePreview from './picturePreview.svelte';
	import Camera from 'svelte-material-icons/Camera.svelte';

	export let activity = {};
	export let activityInformation = {};
	let title = activity.value.title;
	let videoSrc = {};
	let canvas;
	let isCameraWorking = true;
	let showPicture = false;
	let activityDone = false;

	const loadCamera = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					facingMode: { exact: 'environment' }
				},
				audio: false
			})
			.then((stream) => {
				videoSrc.srcObject = stream;
			})
			.catch((e) => {
				isCameraWorking = false;
			});
	};

	const takePicture = () => {
		if (!isCameraWorking) return;
		showPicture = true;
		canvas.width = videoSrc.clientWidth;
		canvas.height = videoSrc.clientHeight;
		console.dir(videoSrc);
		canvas.getContext('2d').drawImage(videoSrc, 0, 0, videoSrc.clientWidth, videoSrc.clientHeight);
	};

	loadCamera();
</script>

<div class="flex flex-col h-screen w-screen max-h-[600px] max-w-[400px] relative">
	<h1 class="text-xl mb-2 p-2">{title}</h1>
	<div class="flex mt-[5%] min-h-[300px] w-full">
		{#if isCameraWorking}
			<video bind:this={videoSrc} autoplay>
				<track kind="captions" />
			</video>
		{:else}
			<p class="m-auto">Environment camera is not available.</p>
		{/if}
	</div>

	<button
		class="flex justify-center h-[10%] w-full mt-auto 
			p-3 text-xl text-white bg-c-black"
		on:click={() => {
			if (!activityDone) takePicture();
		}}
	>
		{#if !activityDone}
			<p class="my-auto">Take a picture</p>
			<span class="ml-2 my-auto"><Camera /></span>
		{:else}
			<p class="my-auto">We have received your result !</p>
		{/if}
	</button>

	<PicturePreview
		bind:canvas
		{title}
		{showPicture}
		{activityInformation}
		onClick={() => (showPicture = false)}
		activityDone={() => (activityDone = true)}
	/>
</div>
