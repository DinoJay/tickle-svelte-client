<script>
	export let word = '';
	export let saveActivity = () => {};
</script>

<label class="w-[90%] mt-[3%] mx-auto font-medium" for="hangman">Choose a word : </label>

<input
	class="w-[90%] mx-auto overflow-auto p-1
				border border-c-gray"
	type="text"
	name="edit-field"
	id="hangman"
	bind:value={word}
	on:input={() => saveActivity()}
/>
