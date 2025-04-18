<script>
    import Dashboard from '$lib/components/Dashboard.svelte';
    import {fade } from 'svelte/transition';
  </script>
<!-- reacts to /dashboard endpoint -->
  <div transition:fade={{ duration: 300 }} class="relative w-full"> 
    <Dashboard />
  </div>
  