<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

	let geoCachingSubs = [];

	getDocs(collection(db, 'geoCaching')).then((snap) => {
		snap.docs.forEach((docu) => {
			getDoc(doc(db, 'users', docu.data().uid, 'activitySubmissions', docu.data().subid)).then(
				(snap) => {
					let subObj = snap.data();
					subObj.geoId = docu.id;
					geoCachingSubs = [...geoCachingSubs, subObj];
				}
			);
		});
	});

	const geoValidation = (geoCachSub, succeeded, score) => {
		let docRef = doc(db, 'users', geoCachSub.uid, 'activitySubmissions', geoCachSub.id);
		updateDoc(docRef, {
			succeeded: succeeded,
			score: score,
			completed: true
		}).then(() => {
			geoCachingSubs.splice(geoCachingSubs.indexOf(geoCachSub), 1);
			geoCachingSubs = [...geoCachingSubs];
			deleteDoc(doc(db, 'geoCatching', geoCachSub.geoId));
		});
	};
</script>

<div
	class="flex flex-wrap gap-2
        h-[35rem] overflow-auto"
>
	{#each geoCachingSubs as geoCachSub}
		<div class="flex flex-col w-56 h-64 mx-auto my-1 bg-white">
			<h1 class="w-full h-8 p-1 overflow-hidden whitespace-nowrap text-ellipsis">
				{geoCachSub.title}
			</h1>
			<img src={geoCachSub.picture} alt="GeoCatching" />
			<div class="flex w-full h-12 mt-auto">
				<button
					class="m-auto text-3xl text-c-green hover:scale-110"
					on:click={() => geoValidation(geoCachSub, true, geoCachSub.maxScore)}
				>
					✓
				</button>
				<button
					class="m-auto text-3xl text-red-400 hover:scale-110"
					on:click={() => geoValidation(geoCachSub, false, 0)}
				>
					x
				</button>
			</div>
		</div>
	{/each}
</div>
