<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Topic from '$lib/components/admin/topics/EditTopic.svelte';
	import AddButton from '$lib/components/admin/utils/AddButton.svelte';
	import Content from '$lib/components/admin/utils/block/BlockContent.svelte';
	import Block from '$lib/components/admin/utils/block/Block.svelte';

	export let addButtonContent = '';
	export let selectedEnvironment = null;

	let isLightBoxOpen = false;
	let topics = [];
	let currentTopic = {
		title: '',
		description: '',
		id: 'null',
		img: { name: '', url: '' },
		color: ''
	};

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

<div
	class="flex flex-wrap gap-2 
		h-[35rem] overflow-auto"
>
	{#each topics as topic}
		<Block
			onClick={() => {
				topics.splice(topics.indexOf(topic), 1);
				topics = [...topics];
			}}
			ref={doc(db, 'card-envs', selectedEnvironment, 'topics', topic.id)}
			isCard={true}
		>
			<Content
				element={topic}
				onClick={() => {
					currentTopic = topic;
					isLightBoxOpen = true;
				}}
				isCard={true}
			/>
		</Block>
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
		currentTopic = {
			title: '',
			description: '',
			id: 'null',
			img: { name: '', url: '' },
			color: ''
		};
	}}
/>

<LightBox isOpen={isLightBoxOpen} close={() => (isLightBoxOpen = false)}>
	<Topic {selectedEnvironment} {currentTopic} />
</LightBox>
