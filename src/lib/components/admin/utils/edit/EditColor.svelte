<script>
	export let labelName = '';
	export let labelFor = '';
	export let bindValue = '';
	export let onInput = () => {};
</script>

<label class="mr-auto font-medium uppercase" for={labelFor}> {labelName} : </label>
<input
	class="w-full overflow-auto p-1
		border border-c-gray"
	type="color"
	name="edit-field"
	id={labelFor}
	bind:value={bindValue}
	on:change={() => onInput()}
/>
