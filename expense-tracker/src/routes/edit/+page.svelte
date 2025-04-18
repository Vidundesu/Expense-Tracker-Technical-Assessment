<script>
	import EditExpense from '$lib/components/EditExpense.svelte';
    import {fade } from 'svelte/transition';
</script>
<!-- reacts to /edit endpoint -->
<div transition:fade={{ duration: 300 }} class="relative w-full"> 
    <EditExpense/>
</div>