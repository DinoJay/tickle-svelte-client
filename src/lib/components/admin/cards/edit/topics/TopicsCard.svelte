<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let currentCard = {};
	export let selectedEnvironment = '';
	export let docRef = null;

	let topics = [];
	let selectedTopics = [];

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
	 * Get all the topics from the environment
	 */
	getDocs(collection(db, 'card-envs', selectedEnvironment, 'topics')).then((snap) => {
		topics = snap.docs.map((doc) => {
			return doc.data();
		});
	});

	/**
	 * Get all the topics from the card
	 */
	if (currentCard.id) {
		getDoc(doc(db, 'card-envs', selectedEnvironment, 'cards', currentCard.id)).then((snap) => {
			if (snap.data()?.topics.length > 0) {
				let topicsId = snap.data()?.topics;
				// Get all the topics from the topics id of the card
				getDocs(collection(db, 'card-envs', selectedEnvironment, 'topics')).then((snap) => {
					const topics = snap.docs.map((doc) => {
						return doc.data();
					});
					topics.forEach((topic) => {
						if (topicsId.includes(topic.id)) selectedTopics = [...selectedTopics, topic];
					});
				});
			}
		});
	}

	/**
	 * Add the selected topic to the card
	 * @param topic
	 */
	const addTopic = (topic) => {
		let exists = selectedTopics.find((t) => t.id == topic.id);
		if (exists) return;
		selectedTopics = [...selectedTopics, topic];
		let topicsId = selectedTopics.map((topic) => topic.id);

		updateDoc(docRef, {
			topics: topicsId
		});
	};

	/**
	 * Remove the topic from the card
	 * @param topic
	 */
	const removeTopic = (topic) => {
		selectedTopics.splice(selectedTopics.indexOf(topic), 1);
		selectedTopics = [...selectedTopics];
		let topicsId = selectedTopics.map((topic) => topic.id);

		updateDoc(docRef, {
			topics: topicsId
		});
	};
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<div class="flex flex-col w-[90%] m-auto">
		<p class="mr-auto font-medium">Topics :</p>
		<div class="h-[200px] w-full overflow-y-auto border border-c-black">
			{#each topics as topic}
				<div
					class="h-auto w-full py-1 mb-1 text-center text-ellipsis whitespace-nowrap
						bg-c-gray hover:bg-c-light-green cursor-pointer"
					on:click={() => addTopic(topic)}
				>
					{topic.title}
				</div>
			{/each}
		</div>
		<p class="mr-auto font-medium">Selected Topics :</p>
		<div class="h-[200px] w-full overflow-y-auto border border-c-black">
			{#each selectedTopics as sTopic}
				<div
					class="h-auto w-full py-1 mb-1 text-center text-ellipsis whitespace-nowrap
						bg-c-gray hover:bg-red-300 cursor-pointer"
					on:click={() => removeTopic(sTopic)}
				>
					{sTopic.title}
				</div>
			{/each}
		</div>
	</div>
</div>
