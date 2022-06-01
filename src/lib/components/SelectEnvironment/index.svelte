<script>
	import LightBox from '$lib/LightBox.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { cardEnvironments } from '/src/stores';

	let open = true;
	let environmentCard = null;

	const promise = getDocs(collection(db, 'card-environments'))
		.then((d) => {
			cardEnvironments.set(d.docs.map((e) => e.data()));
			return $cardEnvironments;
		})
		.catch((error) => {
			console.log(error);
		});

	const showEnvironmentCard = (env) => {
		environmentCard = env;
	};
</script>

<LightBox {open} close={() => (open = false)}>
	{#if environmentCard}
		<div style="max-width:700px">
			<h1>{environmentCard.name}</h1>
			<p>{environmentCard.description}</p>
			{#if environmentCard.img}
				<img src={environmentCard.img.url} alt={environmentCard.name} />
			{/if}
		</div>
	{/if}

	{#await promise}
		<p>...waiting</p>
	{:then data}
		<div class="w-96 flex flex-col">
			{#each data as d}
				<button on:click={() => showEnvironmentCard(d)}>{d.name}</button>
			{/each}
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</LightBox>

<style>
</style>
