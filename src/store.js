import { writable } from 'svelte/store';

export const store = writable({
	envs: [],
	selectedEnvId: null
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

export { loadCards }