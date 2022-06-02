<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { store } from '/src/store';
	import produce from 'immer';
	let openId = null;
	import { fade } from 'svelte/transition';

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
</script>

<div class="flex flex-col">
	{#each $store.envs as env}
		<div class:extended={openId === env.id} class="w-96 max-h-96 min-height overflow-y-auto">
			<h2>
				<button on:click={() => (openId = openId === env.id ? null : env.id)}>{env.name}</button>
			</h2>
			{#if openId === env.id}
				<div transition:fade>
					<p>
						{env.description}
						<button
							on:click={() => {
								loadCards(env.id);
								openId = null;
							}}>Go!</button
						>
						<button />
					</p>
				</div>
				{#if env?.img?.url}
					<img class="w-full" src={env.img.url} alt={env.name} />
				{/if}
			{/if}
		</div>
	{/each}
</div>

<style>
	.extended {
		@apply max-h-96;
		min-height: 30rem;
	}
</style>
