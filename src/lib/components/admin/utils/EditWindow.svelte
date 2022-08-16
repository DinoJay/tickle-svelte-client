<script>
	import { onMount } from 'svelte';
	import { addDoc, updateDoc } from 'firebase/firestore';
	import EditText from './edit/EditText.svelte';
	import EditTextArea from './edit/EditTextArea.svelte';
	import EditImage from './edit/EditImage.svelte';
	import EditColor from './edit/EditColor.svelte';

	export let fields = [];
	export let currentElement = {};
	export let collectionRef = null;
	export let docRef = null;

	let height = 600;
	let width = 400;

	/**
	 * LightBox height width for mobile
	 */
	onMount(() => {
		if (window.innerWidth < width) width = window.innerWidth;
		if (window.innerHeight < height) height = window.innerHeight;
	});

	/**
	 * If it's a new element we create it in Firebase
	 * And we update the id of the current element with the created id
	 */
	if (currentElement.id == 'null') {
		addDoc(collectionRef, currentElement).then((newDocRef) => {
			updateDoc(newDocRef, {
				id: newDocRef.id
			});
			currentElement.id = newDocRef.id;
		});
	}

	/**
	 * It saves the element in Firebase when a value is changed
	 */
	async function saveElement() {
		let update = {};
		fields.forEach((field) => {
			update[field.getter] = currentElement[field.getter];
		});
		updateDoc(docRef, update);
	}
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	{#each fields as field}
		<div
			class="flex flex-col w-[90%]
            mx-auto mt-[3%]"
		>
			{#if field.type == 'text'}
				<EditText
					labelName={field.name}
					labelFor={field.getter}
					bind:bindValue={currentElement[field.getter]}
					onInput={() => saveElement()}
				/>
			{:else if field.type == 'textarea'}
				<EditTextArea
					labelName={field.name}
					labelFor={field.getter}
					bind:bindValue={currentElement[field.getter]}
					onInput={() => saveElement()}
				/>
			{:else if field.type == 'img'}
				<EditImage
					labelName={field.name}
					labelFor={field.getter}
					bindObject={currentElement[field.getter]}
					onInput={() => saveElement()}
				/>
			{:else if field.type == 'col'}
				<EditColor
					labelName={field.name}
					labelFor={field.getter}
					bind:bindValue={currentElement[field.getter]}
					onInput={() => saveElement()}
				/>
			{/if}
		</div>
	{/each}

	<slot />
</div>
