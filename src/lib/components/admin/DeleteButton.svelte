<script>
	import { deleteDoc } from 'firebase/firestore';

	export let ref = null;
	export let onClick = () => {};

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
		removeObject(ref);
		onClick();
	}}
>
	-
</p>
