import { db } from '$lib/firebaseConfig/firebase';
import { collection, getDocs } from 'firebase/firestore';
import produce from 'immer';
import { writable } from 'svelte/store';

export const store = writable({
	envs: [],
	selectedEnvId: null,
	currentUser: undefined
});

async function loadCards(envId) {
	const snapRef2 = await getDocs(collection(db, 'card-environments', envId, 'cards'));
	const cards = snapRef2.docs.map((doc) => {
		return doc.data();
	});

	store.update((obj) => {
		const nextState = produce(obj, (draft) => {
			const envIndex = draft.envs.findIndex((d) => d.id === envId);
			console.log(cards[0]);
			draft.envs[envIndex].cards = cards;
		});
		return nextState;
	});
}

const loadCardEnvironments = () =>
	getDocs(collection(db, 'card-environments'))
		.then((snap) => {
			store.update((obj) => ({ ...obj, envs: snap.docs.map((d) => d.data()) }));
		})
		.catch((error) => {
			console.log(error);
		});

export { loadCards, loadCardEnvironments };
