<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc } from 'firebase/firestore';
	import EditWindow from '../utils/EditWindow.svelte';
	import ActivityCard from './edit/activity/ActivityCard.svelte';
	import TopicsCard from './edit/topics/TopicsCard.svelte';

	export let selectedEnvironment = '';
	export let currentCard = {
		id: 'null',
		title: '',
		description: '',
		img: { name: '', url: '' },
		activity: null,
		topics: [],
		loc: { longitude: 4.39, latitude: 50.82 }
	};

	let fields = [
		{ name: 'Title', getter: 'title', type: 'text' },
		{ name: 'Description', getter: 'description', type: 'textarea' },
		{ name: 'Image', getter: 'img', type: 'img' }
	];
	$: docRef = doc(db, 'card-envs', selectedEnvironment, 'cards', currentCard.id);
	let collectionRef = collection(db, 'card-envs', selectedEnvironment, 'cards');

	let openTopics = false;
	let openActivity = false;
</script>

<EditWindow bind:currentElement={currentCard} {fields} bind:docRef {collectionRef}>
	<button
		class="h-[36px] w-[40%] mt-[5%] mx-auto 
			border border-c-black 
			text-white bg-c-black hover:bg-c-dark-gray"
		on:click={() => (openTopics = true)}
	>
		Topics
	</button>

	<button
		class="h-[36px] w-[40%] mt-[3%] mx-auto 
			border border-c-black 
			text-white bg-c-black hover:bg-c-dark-gray"
		on:click={() => (openActivity = true)}
	>
		Activity
	</button>

	<LightBox isOpen={openTopics} close={() => (openTopics = false)}>
		<TopicsCard {selectedEnvironment} bind:currentCard {docRef} />
	</LightBox>

	<LightBox isOpen={openActivity} close={() => (openActivity = false)}>
		<ActivityCard {selectedEnvironment} bind:currentCard {docRef} />
	</LightBox>
</EditWindow>
