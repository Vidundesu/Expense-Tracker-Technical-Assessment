<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'; // To track current route
	$: currentRoute = $page.url.pathname;
</script>

<nav class="fixed right-0 top-0 flex h-svh w-[15%] items-center bg-transparent p-4 sm:w-[10%]">
	<div class="h-[80%] w-full">
		<div class="flex h-full w-full flex-col items-center justify-center gap-8">
			<!-- Dashboard -->
			<button
				class="flex items-center justify-center rounded-3xl px-2 py-2 text-white transition-colors 
				{currentRoute === '/dashboard' ? 'bg-blue-600' : ''}"
				on:click={() => goto('/dashboard')}
				aria-labelledby="dashboard"
			>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
						class="{currentRoute === '/dashboard' ? 'fill-white' : ''}">
						<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
					</svg>
				</span>
			</button>

			<!-- Add -->
			<button
				class="flex items-center justify-center rounded-3xl px-2 py-2 text-white transition-colors 
				{currentRoute === '/add' ? 'bg-blue-600' : ''}"
				on:click={() => goto('/add')}
				aria-labelledby="add"
			>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1E124A"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
				</span>
			</button>

			<!-- Edit -->
			<button
				class="flex items-center justify-center rounded-3xl px-2 py-2 text-white transition-colors 
				{currentRoute === '/edit' ? 'bg-blue-600' : ''}"
				on:click={() => goto('/edit')}
				aria-labelledby="edit"
			>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1E124A"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
				</span>
			</button>
		</div>
	</div>
</nav>
