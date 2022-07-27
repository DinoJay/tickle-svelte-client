<script>
	import AvatarSelector from '$lib/components/avatarManager/AvatarSelector.svelte';
	import { store } from '/src/stores/index';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import produce from 'immer';

	let newUserAvatar = $store.currentUser?.avatar;

	async function changeAvatar() {
		const userRef = doc(db, 'users', $store.currentUser.uid);
		await updateDoc(userRef, {
			avatar: newUserAvatar
		});

		store.update((obj) => {
			const nextState = produce(obj, (draft) => {
				draft.currentUser.avatar = newUserAvatar;
			});
			return nextState;
		});
	}
</script>

<div class="flex flex-col h-[calc(100vh-10rem)]">
	<div class="w-full p-4 text-center">
		<h1 class="text-sm italic">Change your current avatar</h1>
		<div class="flex justify-center">
			<AvatarSelector bind:newUserAvatar currentUserAvatar={$store?.currentUser?.avatar} />
		</div>
	</div>

	<button
		on:click={() => changeAvatar()}
		class="w-32 h-12 mx-auto rounded border-2 border-black bg-c-light-green mt-3
				hover:bg-c-green"
	>
		validate
	</button>
</div>
