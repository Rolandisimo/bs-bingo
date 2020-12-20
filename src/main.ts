import App from './App.svelte';
import { words } from './helpers/words';

const app = new App({
	target: document.body,
	props: {
		words,
	}
});

export default app;