import { writable } from 'svelte/store';

export const store = writable({
	envs: [],
	selectedEnvId: null
});
