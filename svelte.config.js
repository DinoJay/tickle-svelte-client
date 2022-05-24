// import adapter from '@sveltejs/adapter-static';
import firebase from "svelte-adapter-firebase";


export default {
	kit: {
		adapter: firebase()
	}
};
