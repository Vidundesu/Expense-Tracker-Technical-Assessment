<!--
	side bar
	=======
-->

<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { darkMode } from '../index.js';

	$: currentRoute = $page.url.pathname;
</script>

<nav
	class="fixed right-0 top-0 flex h-svh w-[15%] items-center bg-white p-4 sm:w-[10%] drk:bg-gray-800"
>
	<div class="h-[80%] w-full flex flex-col items-center">
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
		</div>
		<div class="flex h-full w-full flex-col items-center justify-center gap-8">
			<!-- Dashboard -->
			<button
				class="flex items-center justify-center rounded-3xl px-2 py-2 text-white transition-colors
				{currentRoute === '/dashboard' ? 'bg-blue-600' : ''}"
				on:click={() => goto('/dashboard')}
				aria-label="dashboard"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					class="{currentRoute === '/dashboard' ? 'fill-white' : 'fill-blue-600'} drk:fill-white"
				>
					<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Z" />
				</svg>
			</button>

			<!-- Add -->
			<button
				class="flex items-center justify-center rounded-3xl px-2 py-2 text-white transition-colors
				{currentRoute === '/add' ? 'bg-blue-600' : ''}"
				on:click={() => goto('/add')}
				aria-label="expense add button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					class="{currentRoute === '/add' ? 'fill-white' : 'fill-blue-600'} drk:fill-white"
				>
					<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
				</svg>
			</button>

			<!-- Edit -->
			<button
				class="flex items-center justify-center rounded-3xl px-2 py-2 text-white transition-colors
				{currentRoute === '/edit' ? 'bg-blue-600' : ''}"
				on:click={() => goto('/edit')}
				aria-label="expense edit button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					class="{currentRoute === '/edit' ? 'fill-white' : 'fill-blue-600'} drk:fill-white"
				>
					<path
						d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Z"
					/>
				</svg>
			</button>

			
		</div>
		<!--Dark mode toggle-->
		<button
			on:click={() => ($darkMode = !$darkMode)}
			class=""
		>
			{#if $darkMode}
				☀️ 
			{:else}
				🌙 
			{/if}
		</button>
	</div>
</nav>

<style>

</style>
