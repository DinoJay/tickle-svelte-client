<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import AddButton from '../utils/AddButton.svelte';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import DeleteButton from '../utils/DeleteButton.svelte';
	import Card from './Card.svelte';
	import Body from '../utils/Body.svelte';

	export let footerContent = '';
	export let selectedEnvironment = null;
	export let selectedCard = null;
	let cards = [];
	let currentCard = {
		id: 'null',
		title: { key: 'title', value: '' },
		description: { label: 'Description', value: '' },
		img: { value: { name: '', url: '' } },
		activity: null,
		loc: { value: { longitude: 4.39, latitude: 50.82 } }
	};
	let isLightBoxOpen = false;

	/**
	 * Function used to get all the cards of the selectedEnvironment from Firebase
	 */
	async function getCards() {
		let snapRef = await getDocs(collection(db, 'card-envs', selectedEnvironment, 'cards'));
		cards = snapRef.docs.map((doc) => {
			return doc.data();
		});
	}

	/**
	 * Each times the selectedEnvironment or the lightBox are updated we check for new environments
	 */
	$: if (selectedEnvironment || isLightBoxOpen) {
		getCards();
	}

	/**
	 * When we change the environment we reset the selectedCard
	 */
	$: if (selectedEnvironment) {
		selectedCard = null;
	}
</script>

<div
	class="flex flex-wrap gap-2 
        h-[35rem] overflow-auto"
>
	{#each cards as card}
		<div
			class="flex flex-col h-[14rem] w-[14rem] 
            mx-auto my-1 bg-white"
		>
			<Body
				element={card}
				bind:selectedElement={selectedCard}
				bind:currentElement={currentCard}
				bind:isLightBoxOpen
				isCard={true}
			/>

			<div
				class="flex h-[2rem] w-full
                    justify-center items-center"
			>
				<DeleteButton
					onClick={() => {
						cards.splice(cards.indexOf(card), 1);
						cards = [...cards];
					}}
					ref={doc(db, 'card-envs', selectedEnvironment, 'cards', card.id)}
				/>
			</div>
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
	{footerContent}
	onClick={() => {
		isLightBoxOpen = true;
		currentCard = {
			id: 'null',
			title: { key: 'title', value: '' },
			description: { label: 'Description', value: '' },
			img: { value: { name: '', url: '' } },
			activity: null,
			loc: { value: { longitude: 4.39, latitude: 50.82 } }
		};
	}}
/>

<LightBox isOpen={isLightBoxOpen} close={() => (isLightBoxOpen = false)}>
	<Card {selectedEnvironment} {currentCard} />
</LightBox>
