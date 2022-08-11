<script>
	import { deleteDoc } from 'firebase/firestore';
	import { clickOutside } from '$lib/components/utils/clickOutside';

	export let ref = null;
	export let onClick = () => {};

	let confirmDeletion = false;
	let coordinates = { x: 0, y: 0 };

	// TODO LORS DU CLIC GET LES COORDS ET OUVRIR A CETTE ENDROIT

	/**
	 * Function used to remove an object from Firebase
	 */
	async function removeObject(ref) {
		if (ref) await deleteDoc(ref);
	}

	/**
	 * Function to show the popup close to the cursor
	 * if it's too close from the page limit we add an offset
	 * @param e
	 */
	const setCoordinates = (e) => {
		let offsetX = 0;
		let offsetY = 0;

		console.log(e);
		if (e.x + 200 > window.innerWidth) {
			offsetX = 192;
		}
		if (e.y + 200 > window.innerHeight) {
			offsetY = 128;
		}

		coordinates.x = e.x - offsetX;
		coordinates.y = e.y - offsetY;
	};
</script>

<p
	class="flex justify-center items-center h-auto w-6 my-auto mx-2 
        text-center rounded-full cursor-pointer
		transition-colors
        bg-red-300 hover:bg-red-500"
	on:click={(e) => {
		setCoordinates(e);
		confirmDeletion = !confirmDeletion;
	}}
	use:clickOutside
	on:click_outside={() => (confirmDeletion = false)}
>
	-
</p>

<div
	class="fixed h-32 w-48
		bg-white border-2 border-c-black position-to-cursor
		{confirmDeletion ? 'visible' : 'invisible'}"
	style="--y:{coordinates.y}px;--x:{coordinates.x}px;"
>
	<p class="w-full text-center underline">Confirm deletion</p>
	<div class="flex w-full h-full">
		<p
			class="m-auto w-10 text-center border border-black
				bg-c-light-green hover:bg-c-green cursor-pointer transition-colors"
			on:click={() => {
				removeObject(ref);
				onClick();
				confirmDeletion = false;
			}}
		>
			YES
		</p>
		<p
			class="m-auto w-10 text-center border border-black
				bg-red-400 hover:bg-red-500 cursor-pointer transition-colors"
			on:click={() => {
				confirmDeletion = false;
			}}
		>
			NO
		</p>
	</div>
</div>

<style>
	.position-to-cursor {
		top: var(--y);
		left: var(--x);
	}
</style>
