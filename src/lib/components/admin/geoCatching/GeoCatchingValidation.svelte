<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

	let geoCatchingSubs = [];

	getDocs(collection(db, 'geoCatching')).then((snap) => {
		snap.docs.forEach((docu) => {
			getDoc(doc(db, 'users', docu.data().uid, 'activitySubmissions', docu.data().subid)).then(
				(snap) => {
					let subObj = snap.data();
					subObj.geoId = docu.id;
					geoCatchingSubs = [...geoCatchingSubs, subObj];
				}
			);
		});
	});

	const geoValidation = (geoCatchSub, succeeded, score) => {
		let docRef = doc(db, 'users', geoCatchSub.uid, 'activitySubmissions', geoCatchSub.id);
		updateDoc(docRef, {
			succeeded: succeeded,
			score: score,
			completed: true
		}).then(() => {
			geoCatchingSubs.splice(geoCatchingSubs.indexOf(geoCatchSub), 1);
			geoCatchingSubs = [...geoCatchingSubs];
			deleteDoc(doc(db, 'geoCatching', geoCatchSub.geoId));
		});
	};
</script>

<div
	class="flex flex-wrap gap-2
        h-[35rem] overflow-auto"
>
	{#each geoCatchingSubs as geoCatchSub}
		<div class="flex flex-col w-56 h-64 mx-auto my-1 bg-white">
			<h1 class="w-full h-8 p-1 overflow-hidden whitespace-nowrap text-ellipsis">
				{geoCatchSub.title}
			</h1>
			<img src={geoCatchSub.picture} alt="GeoCatching" />
			<div class="flex w-full h-12 mt-auto">
				<button
					class="m-auto text-3xl text-c-green hover:scale-110"
					on:click={() => geoValidation(geoCatchSub, true, geoCatchSub.maxScore)}
				>
					✓
				</button>
				<button
					class="m-auto text-3xl text-red-400 hover:scale-110"
					on:click={() => geoValidation(geoCatchSub, false, 0)}
				>
					x
				</button>
			</div>
		</div>
	{/each}
</div>
