<script>
	import LightBox from '$lib/LightBox.svelte';
	import AddButton from '../AddButton.svelte';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import DeleteButton from '../DeleteButton.svelte';
	import Card from './Card.svelte';

	/**
	 * footerContent - the content of the button used to add a new element
	 * selectedEnvironment - The current environment ID selected in the admin page
	 * selectedCard - The current card ID selected from an envrionment
	 * currentCard - The current card OBJECT selected from an envrionment
	 * isLightBoxOpen - default : false
	 */
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
	 * Function to select a card
	 * If the card is already selected it opens the lightBox to update it
	 * @param card - the selected card OBJECT
	 */
	const selectCardOrOpenLightBox = (card) => {
		if (selectedCard != card.id) {
			selectedCard = card.id;
		} else {
			isLightBoxOpen = true;
			currentCard = card;
		}
	};

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
			<!-- Bloc de la carte -->
			<div
				class="h-[12rem] w-full cursor-pointer
                    {selectedCard == card.id
					? 'bg-green-200 hover:bg-green-400'
					: ' hover:bg-gray-200'}"
				on:click={() => selectCardOrOpenLightBox(card)}
			>
				<!-- Titre de la carte -->
				<p
					class="h-[3rem] w-full
					    text-ellipsis text-center"
				>
					{card.title.value}
				</p>
				<!-- Image de la carte -->
				{#if card?.img}
					<img
						class="h-[9rem] w-full"
						src={card.img.value.url}
						alt={card.img.value.name}
						style="object-fit: cover;"
					/>
				{/if}
			</div>

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
