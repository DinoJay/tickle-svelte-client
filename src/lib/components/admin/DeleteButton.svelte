<script>
	import { deleteDoc } from 'firebase/firestore';

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
	class="h-auto w-6 my-auto mx-2 
        text-center rounded-full cursor-pointer
        bg-red-300 hover:bg-red-500"
	on:click={() => {
		confirmDeletion = true;
	}}
>
	-
</p>

<div
	class="fixed top-[calc(50%-4rem)] left-[calc(50%-6rem)] h-32 w-48
		bg-white border-2 border-black
		{confirmDeletion ? 'visible' : 'invisible'}"
>
	<p class="w-full text-center underline">Confirm deletion</p>
	<div class="flex w-full h-full">
		<p
			class="m-auto w-10 text-center border border-black
				bg-green-300 hover:bg-green-500 cursor-pointer"
			on:click={() => {
				removeObject(ref);
				onClick();
				confirmDeletion = false;
			}}
		>
			yes
		</p>
		<p
			class="m-auto w-10 text-center border border-black
				bg-red-300 hover:bg-red-500 cursor-pointer"
			on:click={() => {
				confirmDeletion = false;
			}}
		>
			no
		</p>
	</div>
</div>
