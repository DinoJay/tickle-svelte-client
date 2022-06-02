<script>
	import Signup from '$lib/components/auth/Signup/index.svelte';
	import Signin from '$lib/components/auth/Signin/index.svelte';
	import tickleData from '../data';

	let selected = null;
</script>

<div class="flex flex-col">
	<Signin />
</div>
