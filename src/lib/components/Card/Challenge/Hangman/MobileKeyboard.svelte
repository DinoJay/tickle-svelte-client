<script>
	export let onClick = () => {};
	export let wrongLetters = [];
	export let rightLetters = [];
	let alphabet = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	];
</script>

<div class="flex flex-wrap h-auto w-full m-auto">
	{#each alphabet as letter}
		<button
			class="h-8 w-6 border border-black m-2
                {wrongLetters.includes(letter) ? 'bg-red-300' : ''}
                {rightLetters.find((ltr) => ltr.value == letter && ltr.find) ? 'bg-green-300' : ''}
            "
			on:click={() => {
				let keyCode = letter.toUpperCase().charCodeAt(0);
				onClick(keyCode);
			}}
		>
			{letter}
		</button>
	{/each}
</div>
