<script>
	import { deleteDoc } from 'firebase/firestore';
	import { clickOutside } from '$lib/components/utils/clickOutside';

	export let ref = null;
	export let onClick = () => {};

	let confirmDeletion = false;

	/**
	 * Function used to remove an object from Firebase
	 */
	async function removeObject(ref) {
		await deleteDoc(ref);
	}
</script>

<p
	class="flex justify-center items-center h-auto w-6 my-auto mx-2 
        text-center rounded-full cursor-pointer
        bg-red-300 hover:bg-red-500"
	on:click={() => {
		confirmDeletion = !confirmDeletion;
	}}
	use:clickOutside
	on:click_outside={() => (confirmDeletion = false)}
>
	-
</p>

<div
	class="fixed top-[calc(50%-4rem)] left-[calc(50%-6rem)] h-32 w-48
		bg-white border-2 border-c-black
		{confirmDeletion ? 'visible' : 'invisible'}"
>
	<p class="w-full text-center underline">Confirm deletion</p>
	<div class="flex w-full h-full">
		<p
			class="m-auto w-10 text-center border border-black
				bg-c-light-green hover:bg-c-green cursor-pointer"
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
				bg-red-400 hover:bg-red-500 cursor-pointer"
			on:click={() => {
				confirmDeletion = false;
			}}
		>
			NO
		</p>
	</div>
</div>
