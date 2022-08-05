<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Topic from '$lib/components/admin/topics/EditTopic.svelte';
	import AddButton from '$lib/components/admin/utils/AddButton.svelte';
	import DeleteButton from '$lib/components/admin/utils/DeleteButton.svelte';
	import Body from '$lib/components/admin/utils/BodyPanel.svelte';

	export let addButtonContent = '';
	export let selectedEnvironment = null;

	let isLightBoxOpen = false;
	let topics = [];
	let currentTopic = { title: '', description: '', id: 'null', img: { name: '', url: '' } };

	/**
	 * Function used to get all the topics of the selectedEnvironment from Firebase
	 */
	async function getTopics() {
		let snapRef = await getDocs(collection(db, 'card-envs', selectedEnvironment, 'topics'));
		topics = snapRef.docs.map((doc) => {
			return doc.data();
		});
	}

	/**
	 * Each times the selectedEnvironment or the lightBox are updated we check for new topics
	 */
	$: if (selectedEnvironment || isLightBoxOpen) {
		getTopics();
	}
</script>

<div class="h-[35rem] overflow-auto">
	{#each topics as topic}
		<div
			class="flex h-12 w-full my-1
			 	bg-white"
		>
			<Body
				element={topic}
				onClick={() => {
					currentTopic = topic;
					isLightBoxOpen = true;
				}}
			/>

			<DeleteButton
				onClick={() => {
					topics.splice(topics.indexOf(topic), 1);
					topics = [...topics];
				}}
				ref={doc(db, 'card-envs', selectedEnvironment, 'topics', topic.id)}
			/>
		</div>
	{:else}
		<p
			class="w-full mt-5 text-center
				font-medium uppercase"
		>
			Empty
		</p>
	{/each}
</div>

<AddButton
	{addButtonContent}
	onClick={() => {
		isLightBoxOpen = true;
		currentTopic = { title: '', description: '', id: 'null', img: { name: '', url: '' } };
	}}
/>

<LightBox isOpen={isLightBoxOpen} close={() => (isLightBoxOpen = false)}>
	<Topic {selectedEnvironment} {currentTopic} />
</LightBox>
