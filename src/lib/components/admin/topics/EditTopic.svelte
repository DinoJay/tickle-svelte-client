<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc } from 'firebase/firestore';
	import EditWindow from '../utils/EditWindow.svelte';

	export let selectedEnvironment = '';
	export let currentTopic = {
		title: '',
		description: '',
		id: 'null',
		img: { name: '', url: '' },
		color: ''
	};

	let fields = [
		{ name: 'Title', getter: 'title', type: 'text' },
		{ name: 'Description', getter: 'description', type: 'textarea' },
		{ name: 'Image', getter: 'img', type: 'img' },
		{ name: 'Color', getter: 'color', type: 'col' }
	];
	$: docRef = doc(db, 'card-envs', selectedEnvironment, 'topics', currentTopic.id);
	let collectionRef = collection(db, 'card-envs', selectedEnvironment, 'topics');
</script>

<EditWindow bind:currentElement={currentTopic} {fields} {docRef} {collectionRef} />
