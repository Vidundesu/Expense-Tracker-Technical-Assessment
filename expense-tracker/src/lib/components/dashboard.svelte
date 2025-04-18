<!--
  Dashboard
  ==========
    this component is the main entry point of the web app. this component responsible of fetching expenses, income
    displaying charts, expenses, tables and basically this is the main page of the system. users can get an idea
    of their income and expenses

    outcome
      users can see income, expenses, totals, chart analytics
-->

<script>
  import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Stats from './Stats.svelte';
	import Charts from './Charts.svelte';
  let incomes = [];
	let expenses = [];
	let selectedYear = new Date().getFullYear();

	// Get expenses from localStorage
	const loadExpenses = () => {
		const storedData = localStorage.getItem('expenses');
		expenses = storedData ? JSON.parse(storedData) : [];
	};
  const loadIncomes = () => {
    const storedData = localStorage.getItem('incomes');
    incomes = storedData ? JSON.parse(storedData) : [];
  };

	// Filter expenses by selected year
	$: filteredExpenses = expenses.filter((expense) => {
		const expenseYear = new Date(expense.date).getFullYear();
		return expenseYear === selectedYear;
	});
  $: yearlyExpenses = filteredExpenses.filter(expense => 
    new Date(expense.date).getFullYear() === selectedYear
  );
	// Get available years from expenses
	$: years = [...new Set(expenses.map((expense) => new Date(expense.date).getFullYear()))].sort(
		(a, b) => b - a
	);

	// Add current year if not present
	$: if (!years.includes(selectedYear)) {
		years.unshift(selectedYear);
	}

	onMount(() => {
    loadExpenses();
    loadIncomes(); // Add this
  });
</script>

<main class="fixed flex h-screen w-[85%] flex-col sm:w-[90%]">
	
  <div class="w-full flex-1 overflow-scroll p-4 sm:p-8  drk:bg-black">

		<h1 class="heading mb-6 font-bold text-gray-600 drk:text-white">Welcome User</h1>
		<div class="h-[150dvh] sm:h-dvh">
			<div class="grid h-full w-full grid-cols-6 grid-rows-6 gap-2 sm:grid-cols-6 sm:grid-rows-4">
				
        <Stats {filteredExpenses} incomes={incomes} />
			
				<div class="col-span-6 row-span-6 flex flex-col rounded-2xl sm:col-span-3">
					<div class="h-[10%] w-full justify-between items-center bg-transparent p-2 flex">
            
						<button
							class="flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs sm:h-10 h-8 p-2  text-white"
              on:click={() => goto('/add')}
              >
							Add Expense
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="white"
							>
								<path
									d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
								/>
							</svg>
						</button>
						<select
							bind:value={selectedYear}
							class=" rounded-xl bg-blue-600 text-xs  h-8 sm:h-10   text-white"
						>
							<option disabled selected value="" class="text-xs">Select a Year</option>
							{#each years as year}
								<option value={year}>{year}</option>
							{/each}
						</select>
					</div>

					<div class="overflow-hidden drk:bg-gray-800 backdrop-blur-2xl  h-full overflow-x-auto rounded-2xl bg-white pt-2 lg:p-4">
						<table class="caption w-full border-separate border-spacing-x-0 lg:border-spacing-y-2">
							<thead class="text-blue-600 ">
								<tr class="">
									<th class="sm:px-4 py-2 text-center">Date</th>
									<th class="sm:px-4 py-2 text-center">Expense</th>
									<th class="sm:px-4 py-2 text-center">Category</th>
									<th class="sm:px-4 py-2 text-center">Amount</th>
								</tr>
							</thead>
							<tbody class=" text-gray-700">
								{#if filteredExpenses.length === 0}
									<tr>
										<td colspan="4" class="py-4 text-center text-gray-400">
											No expenses found for {selectedYear}
										</td>
									</tr>
								{:else }
									{#each filteredExpenses as expense}
										<tr class="drk:bg-gray-700 drk:text-gray-300 bg-white">
											<td
												class="rounded-l-md border-r border-gray-300 sm:px-4 sm:py-2 text-center"
											>
												{new Date(expense.date).toISOString().split('T')[0]}
											</td>
											<td
												class="border-r border-gray-300 sm:px-4 sm:py-2 text-center"
											>
												{expense.title}
											</td>
											<td
												class="border-r border-gray-300 sm:px-4 py-2 text-center"
											>
												{expense.category}
											</td>
											<td class="rounded-r-md sm:px-4 py-2 text-center">
												${expense.amount.toFixed(2)}
											</td>
										</tr>
									{/each}
								{/if}
							</tbody>
						</table>
					</div>
				</div>
        <Charts expenses={yearlyExpenses} {selectedYear} />
				<div id="footer" class="col-span-6"></div>
			</div>
		</div>
	</div>
</main>

<style>
	.heading {
		font-size: calc(1.5rem + 1.5vw);
	}
	.caption {
		font-size: calc(0.5rem + 0.5vw);
	}
</style>
