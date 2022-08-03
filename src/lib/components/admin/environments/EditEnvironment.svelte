<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc } from 'firebase/firestore';
	import EditWindow from '../utils/EditWindow.svelte';

	export let currentEnvironment = {
		id: 'null',
		title: '',
		description: '',
		img: { name: '', url: '' }
	};

	let fields = [
		{ name: 'Title', getter: 'title', type: 'text' },
		{ name: 'Description', getter: 'description', type: 'textarea' },
		{ name: 'Image', getter: 'img', type: 'img' }
	];
	$: docRef = doc(db, 'card-envs', currentEnvironment.id);
	let collectionRef = collection(db, 'card-envs');
</script>

<EditWindow bind:currentElement={currentEnvironment} {fields} bind:docRef {collectionRef} />
