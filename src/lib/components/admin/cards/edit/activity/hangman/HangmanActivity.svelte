<script>
	import EditText from '$lib/components/admin/utils/edit/EditText.svelte';

	export let word = '';
	export let saveActivity = () => {};
</script>

<EditText
	labelName={'Choose a word'}
	labelFor={'hangman'}
	bind:bindValue={word}
	onInput={() => saveActivity()}
/>
