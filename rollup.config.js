import svelte from 'rollup-plugin-svelte';
import pkg from './package.json';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/Radar.html',
	output: [
		{ sourcemap: true, file: pkg.module, 'format': 'es' },
		{ sourcemap: true, file: pkg.main, 'format': 'umd', name }
	],
	plugins: [
		svelte({
			cascade: false,
			store: true
		})
	]
};
