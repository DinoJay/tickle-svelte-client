<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import tickleData from '../data';
	import SelectEnvironment from '$lib/components/SelectEnvironment/index.svelte';
	import Authenticated from '$lib/components/auth/Authenticated.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { store } from '/src/store';

	let selected = null;

	const loadCardEnvironments = getDocs(collection(db, 'card-environments'))
		.then((snap) => {
			store.update((obj) => ({ ...obj, envs: snap.docs.map((d) => d.data()) }));
		})
		.catch((error) => {
			console.log(error);
		});
</script>

<Authenticated>
	<div class="flex flex-col">
		<Slider {selected} cards={tickleData} onClick={(id) => (selected = id)} />
		<div class="mx-auto">
			<TopicMap selectedId={selected} onClick={(id) => (selected = id)} />
		</div>
		<SelectEnvironment />
	</div>
</Authenticated>
