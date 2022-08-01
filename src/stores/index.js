import { db } from '$lib/firebaseConfig/firebase';
import { collection, getDocs } from 'firebase/firestore';
import produce from 'immer';
import { writable } from 'svelte/store';
import { browser } from '$app/env';

const storedItems = JSON.parse(browser && localStorage.getItem('store')) || {
	envs: [],
	currentUser: undefined
};
export const store = writable(browser && storedItems);
store.subscribe((val) => browser && (localStorage.store = JSON.stringify(val)));

async function loadCards(envId) {
	const snapRef2 = await getDocs(collection(db, 'card-envs', envId, 'cards'));
	const cards = snapRef2.docs.map((doc) => {
		return doc.data();
	});

	store.update((obj) => {
		const nextState = produce(obj, (draft) => {
			const envIndex = draft.envs.findIndex((d) => d.id === envId);
			draft.envs[envIndex].cards = cards;
		});
		return nextState;
	});
}

async function loadCardEnvironments() {
	getDocs(collection(db, 'card-envs'))
		.then((snap) => {
			store.update((obj) => ({ ...obj, envs: snap.docs.map((d) => d.data()) }));
		})
		.catch((error) => {
			console.log(error);
		});
}

export { loadCards, loadCardEnvironments };
