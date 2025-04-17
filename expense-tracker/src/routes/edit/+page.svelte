<script>
	import EditExpense from '$lib/components/EditExpense.svelte';
    import {fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 300 }} class="relative w-full"> 
    <EditExpense/>
</div>