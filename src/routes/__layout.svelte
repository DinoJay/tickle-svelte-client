<script>
	import '../app.css';
	import Notifications from 'svelte-notifications';
</script>

<Notifications>
	<div class="flex">
		<div class="mx-auto my-6 shadow-md border border-gray-200 p-3" style="max-width:700px">
			<slot />
		</div>
	</div>

	<div class="" id="modals" />
</Notifications>
