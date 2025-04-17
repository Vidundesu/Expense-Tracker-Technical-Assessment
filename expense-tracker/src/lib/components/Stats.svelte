<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let filteredExpenses = [];
	export let incomes = [];

	// Chart references
	let expensesChart, incomeChart;
	let expensesCtx, incomeCtx;
	let expenseCard, incomeCard;

	// Monthly calculation logic
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
	const lastMonth = lastMonthDate.getMonth();
	const lastMonthYear = lastMonthDate.getFullYear();

	// Expense totals
	$: thisMonthExpenses = filteredExpenses
		.filter(expense => 
			new Date(expense.date).getMonth() === currentMonth &&
			new Date(expense.date).getFullYear() === currentYear
		)
		.reduce((acc, curr) => acc + curr.amount, 0);

	$: lastMonthExpenses = filteredExpenses
		.filter(
			(expense) =>
				new Date(expense.date).getMonth() === lastMonth &&
				new Date(expense.date).getFullYear() === lastMonthYear
		)
		.reduce((acc, curr) => acc + curr.amount, 0);

	// Income totals
	$: thisMonthIncome = incomes
		.filter(income => {
			const [year, month] = income.month.split('-');
			return parseInt(month) - 1 === currentMonth &&
				parseInt(year) === currentYear;
		})
		.reduce((acc, curr) => acc + curr.amount, 0);

	$: lastMonthIncome = incomes
		.filter(income => {
			const [year, month] = income.month.split('-');
			const incomeDate = new Date(`${year}-${month}-01`);
			return incomeDate.getMonth() === lastMonth && 
				incomeDate.getFullYear() === lastMonthYear;
		})
		.reduce((acc, curr) => acc + curr.amount, 0);

	// Chart handling
	$: if (expensesCtx && incomeCtx && 
		thisMonthExpenses !== undefined && 
		lastMonthExpenses !== undefined &&
		thisMonthIncome !== undefined && 
		lastMonthIncome !== undefined) {
		updateCharts();
	}

	onMount(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (expensesCtx?.canvas && incomeCtx?.canvas) {
				updateCharts();
			}
		});

		if (expenseCard) resizeObserver.observe(expenseCard);
		if (incomeCard) resizeObserver.observe(incomeCard);

		return () => {
			resizeObserver.disconnect();
			if (expensesChart) expensesChart.destroy();
			if (incomeChart) incomeChart.destroy();
		};
	});

	function updateCharts() {
		const months = [
			lastMonthDate.toLocaleString('default', { month: 'short' }),
			currentDate.toLocaleString('default', { month: 'short' })
		];

		// Destroy old charts first
		if (expensesChart) expensesChart.destroy();
		if (incomeChart) incomeChart.destroy();

		// Safe canvas sizing function
		const setCanvasSize = (ctx) => {
			if (!ctx || !ctx.canvas || !ctx.canvas.parentNode) return;
			
			const parent = ctx.canvas.parentNode;
			ctx.canvas.width = parent.offsetWidth;
			ctx.canvas.height = parent.offsetHeight;
		};

		// Expense Chart
		if (expensesCtx) {
			setCanvasSize(expensesCtx);
			expensesChart = new Chart(expensesCtx, {
				type: 'line',
				data: {
					labels: months,
					datasets: [{
						data: [lastMonthExpenses, thisMonthExpenses],
						borderColor: '#ef4444',
						tension: 1000,
						borderWidth: 2,
                        cubicInterpolationMode: 'monotonic',
						pointRadius: 0
					}]
				},
				options: {
					responsive: false,
					plugins: { legend: { display: false } },
					scales: {
						y: { display: false },
						x: { 
							display: false,
							grid: { display: false }
						}
					},
					maintainAspectRatio: false
				}
			});
		}

		// Income Chart
		if (incomeCtx) {
			setCanvasSize(incomeCtx);
			incomeChart = new Chart(incomeCtx, {
				type: 'line',
				data: {
					labels: months,
					datasets: [{
						data: [lastMonthIncome, thisMonthIncome],
						borderColor: '#22c55e',
						tension: 1000,
						borderWidth: 2,
                        cubicInterpolationMode: 'monotonic',
						pointRadius: 0
					}]
				},
				options: {
					responsive: false,
					plugins: { legend: { display: false } },
					scales: {
						y: { display: false },
						x: { 
							display: false,
							grid: { display: false }
						}
					},
					maintainAspectRatio: false
				}
			});
		}
	}
    $: console.log('Expenses Data:', [lastMonthExpenses, thisMonthExpenses]);
$: console.log('Income Data:', [lastMonthIncome, thisMonthIncome]);

</script>

<div class="col-span-6 flex gap-2 sm:col-span-3">
	<div class="drk:bg-slate-900 w-full rounded-2xl bg-white" bind:this={expenseCard}>
		<div class="justify-evenlyn drk:text-white flex h-full w-full flex-col p-4 font-semibold">
			<h2 class="text-sm sm:text-xl">Total Expenses</h2>
			<div class="flex h-[80%] flex-col xl:flex-row xl:items-center justify-evenly">
				<h2 class="text-sm xl:text-2xl">${thisMonthExpenses.toLocaleString()}</h2>
				<div class="h-full xl:w-[40%] overflow-hidden">
					<canvas bind:this={expensesCtx} />
				</div>
			</div>
		</div>
	</div>

	<div class="drk:bg-slate-900 w-full rounded-2xl bg-white" bind:this={incomeCard}>
		<div class="justify-evenlyn drk:text-white flex h-full w-full flex-col p-4 font-semibold">
			<h2 class="text-sm sm:text-xl">Total Income</h2>
			<div class="flex h-[80%] flex-col xl:flex-row xl:items-center justify-evenly">
				<h2 class="text-sm xl:text-2xl">${thisMonthIncome.toLocaleString()}</h2>
				<div class="h-full xl:w-[40%] overflow-hidden">
					<canvas bind:this={incomeCtx} />
				</div>
			</div>
		</div>
	</div>
</div>

<style global>
	canvas {
		background-color: transparent !important;
		width: 100% !important;
		height: 100% !important;
	}
</style>