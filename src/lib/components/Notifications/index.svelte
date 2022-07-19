<script>
	import { notificationStore } from '/src/stores/notificationStore';
	import Notification from './Notification.svelte';

	const close = () => notificationStore.update((n) => ({ ...n, text: null }));
	// $: console.log('noti', $notificationStore);
</script>

{#if $notificationStore.text}
	<Notification {close}>
		{$notificationStore.text}
	</Notification>
{/if}

<slot />
