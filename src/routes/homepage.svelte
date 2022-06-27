<script>
	import ChangeAvatar from '$lib/components/AvatarManager/index.svelte';
	import { store } from '/src/stores/index';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import Authenticated from '$lib/components/auth/Authenticated.svelte';

	let userAvatar = $store.currentUser.avatar;

	async function changeAvatar() {
		const userRef = doc(db, 'users', $store.currentUser.uid);
		await updateDoc(userRef, {
			avatar: userAvatar
		});

		let user = $store.currentUser;
		user.avatar = userAvatar;
		store.update((obj) => ({ ...obj, currentUser: user }));
	}
</script>

<Authenticated>
	<div class="h-full relative">
		<div class="w-full p-4 text-center">
			<h1 class="text-sm italic">Change your current avatar</h1>
			<div class="flex justify-center overflow-auto h-16">
				<ChangeAvatar bind:userAvatar currentUserAvatar={$store?.currentUser?.avatar} />
			</div>
		</div>

		<button
			on:click={() => changeAvatar()}
			class="w-32 h-12 absolute bottom-0 inset-x-0 mx-auto rounded border-2 border-black bg-teal-500 mt-3
		hover:bg-teal-300"
		>
			validate
		</button>
	</div>
</Authenticated>
