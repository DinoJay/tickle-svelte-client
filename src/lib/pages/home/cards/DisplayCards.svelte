<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	export let selectedEnvironment = 'default';
	export let userCardsIdForEachEnv = {};

	let allCards = [];
	let userCards = [];

	$: if (selectedEnvironment != 'default') {
		loadCards(selectedEnvironment);
	} else {
		allCards = [];
		userCards = [];
	}

	/**
	 * Get all the cards from an envirionment
	 * @param environmentId
	 */
	async function loadCards(environmentId) {
		let snapRef2 = await getDocs(collection(db, 'card-environments', environmentId, 'cards'));
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
					userCards = [...userCards, card];
				}
			});
		});
	}
</script>

<div class="flex flex-col h-[calc(100vh-12.7rem)] w-full p-3 my-2 bg-c-light-yellow">
	<div class="overflow-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-4">
		{#each userCards as card}
			<div
				class="w-[12rem] h-[18rem] mx-auto m-3 border-2 
                border-c-brown bg-white rounded-lg hover:scale-105
                relative"
			>
				<h1 class="font-medium">
					{card.title.value}
				</h1>
				<img
					src={card.img.value.url}
					alt={card.title.value}
					width="180"
					height="107"
					loading="lazy"
					class="m-auto rounded-lg border border-black"
				/>
				<p>Score : {card.score}</p>
			</div>
		{/each}
	</div>
</div>
