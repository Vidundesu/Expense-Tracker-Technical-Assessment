<script>
    import AddExpense from '$lib/components/AddExpense.svelte';
    import {fade } from 'svelte/transition';
  </script>
  
<!-- reacts to /add endpoint -->
  <div transition:fade={{ duration: 300 }} class="relative w-full"> 
    <AddExpense />
  </div>