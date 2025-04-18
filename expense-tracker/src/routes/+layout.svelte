<script>
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import Dashboard from '$lib/components/dashboard.svelte';
</script>

<div class="">
	<Sidebar />
	<main class="">
		<slot />
	</main>
</div>
