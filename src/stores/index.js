import { db } from '$lib/firebaseConfig/firebase';
import { collection, getDocs } from 'firebase/firestore';
import produce from 'immer';
import { writable, get } from 'svelte/store';

// => undefined a passer en string https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/
// import { browser } from '$app/env';
// export const store = writable(
// 	browser &&
// 		(localStorage.getItem('store') ||
// 			JSON.stringify({
// 				envs: [],
// 				selectedEnvId: null,
// 				currentUser: undefined
// 			}))
// );
// store.subscribe((val) => {
// 	browser && (localStorage.store = val);
// });
// console.log(JSON.parse($store));

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
			draft.envs[envIndex].cards = cards;
		});
		return nextState;
	});
}

async function loadCardEnvironments() {
	if (get(store).envs.length === 0) {
		getDocs(collection(db, 'card-environments'))
			.then((snap) => {
				store.update((obj) => ({ ...obj, envs: snap.docs.map((d) => d.data()) }));
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

export { loadCards, loadCardEnvironments };
