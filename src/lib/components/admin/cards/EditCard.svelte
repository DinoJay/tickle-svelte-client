<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc } from 'firebase/firestore';
	import EditWindow from '../utils/EditWindow.svelte';

	export let selectedEnvironment = '';
	export let currentCard = {
		id: 'null',
		title: '',
		description: '',
		img: { name: '', url: '' },
		activity: null,
		loc: { longitude: 4.39, latitude: 50.82 }
	};

	let fields = [
		{ name: 'Title', getter: 'title', type: 'text' },
		{ name: 'Description', getter: 'description', type: 'textarea' },
		{ name: 'Image', getter: 'img', type: 'img' }
	];
	$: docRef = doc(db, 'card-envs', selectedEnvironment, 'cards', currentCard.id);
	let collectionRef = collection(db, 'card-envs', selectedEnvironment, 'cards');
</script>

<EditWindow bind:currentElement={currentCard} {fields} bind:docRef {collectionRef} />
