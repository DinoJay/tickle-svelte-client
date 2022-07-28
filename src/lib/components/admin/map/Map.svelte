<script>
	import Mapbox from '$lib/components/map/Mapbox.svelte';
	import DraggableMarker from '$lib/components/map/markers/DraggableMarker.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';

	/**
	 * selectedEnvironment - The current environment ID selected in the admin page
	 * selectedCard - The current card ID selected from an envrionment
	 */
	export let selectedEnvironment = null;
	export let selectedCard = null;

	// marker position
	let lon = null;
	let lat = null;

	/**
	 * Function the get the coords of the card
	 * Default values are : lon = 4.39, lat = 50.82
	 */
	async function getCardCoords() {
		let docRef = doc(db, 'card-envs', selectedEnvironment, 'cards', selectedCard);
		let docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			let card = docSnap.data();
			if (card?.loc) {
				lon = card.loc.value.longitude;
				lat = card.loc.value.latitude;
			} else {
				lon = 4.39;
				lat = 50.82;
			}
		} else {
			console.log('error');
		}
	}

	/**
	 * Function to update the location of the card in Firebase
	 */
	async function updateCardCoords() {
		let docRef = doc(db, 'card-envs', selectedEnvironment, 'cards', selectedCard);

		await updateDoc(docRef, {
			loc: { value: { longitude: lon, latitude: lat } }
		});
	}

	/**
	 * When we change the selectedCard we load the card's coords
	 */
	$: if (selectedCard) {
		getCardCoords();
	}

	/**
	 * When we update the marker on the map, we also update the coords of the card
	 */
	$: if (lon || lat) {
		updateCardCoords();
	}
</script>

{#if selectedCard && lon && lat}
	<div class="h-full w-full">
		<Mapbox zoom={10} geoLocationMandatory={false}>
			<DraggableMarker bind:lon bind:lat />
		</Mapbox>
	</div>
{/if}
