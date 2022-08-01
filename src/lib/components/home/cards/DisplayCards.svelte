<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import Card from './Card.svelte';

	export let selectedEnvironment = 'default';
	export let userCardsIdForEachEnv = {};

	let allCards = [];
	let userCards = [];

	$: if (selectedEnvironment) {
		allCards = [];
		userCards = [];
		if (selectedEnvironment != 'default') {
			loadCards(selectedEnvironment);
		}
	}

	/**
	 * Get all the cards from an envirionment
	 * @param environmentId
	 */
	async function loadCards(environmentId) {
		let snapRef2 = await getDocs(collection(db, 'card-envs', environmentId, 'cards'));
		let cards = snapRef2.docs.map((doc) => {
			return doc.data();
		});

		allCards = cards;

		/**
		 * We compare the card's id for each cards of the envrionment
		 * with the array of all the cardsId of the user
		 * to get the right card data
		 */
		allCards.forEach((card) => {
			userCardsIdForEachEnv[environmentId].forEach((userCard) => {
				if (userCard.id == card.id) {
					card.score = userCard.score;
					card.maxScore = userCard.maxScore;
					userCards = [...userCards, card];
				}
			});
		});
	}
</script>

<div class="flex flex-col h-[calc(100vh-14rem)] w-full my-2 ">
	<div class="overflow-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
		{#each userCards as card}
			<Card {card} />
		{/each}
	</div>
</div>
