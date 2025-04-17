<script>
	import { fade } from 'svelte/transition';

	const expenseCategories = [
		'Food',
		'Transport',
		'Housing',
		'Entertainment',
		'Healthcare',
		'Other'
	];
	const incomeCategories = ['Salary', 'Part Time Earnings', 'Other Income'];

	// Form states
	let expenseForm = {
		title: '',
		date: new Date().toISOString().split('T')[0],
		category: '',
		amount: '',
		notes: ''
	};

	let incomeForm = {
		category: '',
		month: new Date().toISOString().slice(0, 7),
		amount: '',
		notes: ''
	};

	// Validation states
	let expenseSubmitted = false;
	let incomeSubmitted = false;

	// Helper functions
	const currentMonth = new Date().toISOString().slice(0, 7);

	// LocalStorage functions
	const saveToLocalStorage = (type, data) => {
		const storedData = JSON.parse(localStorage.getItem(type) || '[]');
		const newEntry = {
			...data,
			id: Date.now(),
			type: type,
			timestamp: new Date().toISOString()
		};
		localStorage.setItem(type, JSON.stringify([...storedData, newEntry]));
	};

	const resetForm = (formType) => {
		if (formType === 'expense') {
			expenseForm = {
				title: '',
				date: new Date().toISOString().split('T')[0],
				category: '',
				amount: '',
				notes: ''
			};
			expenseSubmitted = false;
		} else {
			incomeForm = {
				category: '',
				month: new Date().toISOString().slice(0, 7),
				amount: '',
				notes: ''
			};
			incomeSubmitted = false;
		}
	};

	// Validation functions
	function validateExpense() {
		expenseSubmitted = true;
		return (
			expenseForm.title.trim() &&
			expenseForm.date &&
			expenseForm.category &&
			expenseForm.amount &&
			/^\d+(\.\d{1,2})?$/.test(expenseForm.amount)
		);
	}

	function validateIncome() {
		incomeSubmitted = true;
		return incomeForm.category && incomeForm.amount && /^\d+(\.\d{1,2})?$/.test(incomeForm.amount);
	}

	// Submit handlers
	function handleExpenseSubmit() {
		if (validateExpense()) {
			saveToLocalStorage('expenses', {
				...expenseForm,
				amount: parseFloat(expenseForm.amount)
			});
			alert('Expense added successfully');
			resetForm('expense');
		}
	}

	function handleIncomeSubmit() {
		if (validateIncome()) {
			saveToLocalStorage('incomes', {
				...incomeForm,
				amount: parseFloat(incomeForm.amount)
			});
			resetForm('income');
		}
	}
</script>

<main class="fixed flex h-screen w-[85%] flex-col overflow-scroll sm:w-[90%] sm:overflow-hidden">
	<div
		class="grid min-h-screen w-full grid-cols-1  justify-items-center gap-4 p-4 md:grid-cols-2"
	>
		<div
			class=" relative flex w-full  sm:w-[75%] flex-col items-center justify-center rounded-xl bg-white drk:bg-gray-800 p-4 md:mr-4"
		>
			<h2 class="mb-6 text-2xl font-bold text-blue-700">Add Expense</h2>

			<form id="expense" class="space-y-4 w-[95%]">
				<div class="flex flex-col gap-2">
					<label
						for="expense titel"
						class="flex items-center justify-between font-medium text-blue-600"
					>
						Title
						{#if expenseSubmitted && !expenseForm.title.trim()}
							<span class="text-xs text-red-500">Please fill the title</span>
						{/if}
					</label>
					<input
						type="text"
						bind:value={expenseForm.title}
						class="w-full rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none transition-all focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex flex-col gap-2">
						<label for="date" class="font-medium text-blue-600">Date</label>
						<input
							type="date"
							bind:value={expenseForm.date}
							class="w-full rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label
							for="expense category"
							class="flex items-center justify-between font-medium text-blue-600"
						>
							Category
							{#if expenseSubmitted && !expenseForm.category}
								<span class="text-xs text-red-500">Please select category</span>
							{/if}
						</label>
						<select
							bind:value={expenseForm.category}
							class="w-full rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
						>
							<option value="" disabled>Select Category</option>
							{#each expenseCategories as category}
								<option value={category}>{category}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<label
						for="expense amount"
						class="flex items-center justify-between font-medium text-blue-600"
					>
						Amount ($)
						{#if expenseSubmitted && (!expenseForm.amount || !/^\d+(\.\d{1,2})?$/.test(expenseForm.amount))}
							<span class="text-xs text-red-500">Valid amount required</span>
						{/if}
					</label>
					<input
						type="number"
						step="0.01"
						bind:value={expenseForm.amount}
						class="w-full rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<div class="flex flex-col gap-2">
					<label for="notes" class="font-medium text-blue-600">Notes</label>
					<textarea
						bind:value={expenseForm.notes}
						class="w-full resize-none rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
						rows="3"
					></textarea>
				</div>

				<button
					type="button"
					on:click={handleExpenseSubmit}
					class="w-full rounded-3xl border-none bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
				>
					Add Expense
				</button>
			</form>
		</div>

		<!-- Income Form -->
		<div
			class="relative flex w-full sm:w-[75%] flex-col items-center justify-center rounded-xl bg-white drk:bg-gray-800 p-4 md:ml-4"
		>
			<h2 class="font-montserrat mb-8 text-2xl font-bold text-green-700">Add Income</h2>

			<form id="income" class="space-y-4 w-[95%]">
				<div class="flex flex-col gap-2">
					<label
						for="category"
						class="flex items-center justify-between font-medium text-green-600"
					>
						Category
						{#if incomeSubmitted && !incomeForm.category}
							<span class="text-xs text-red-500">Please select category</span>
						{/if}
					</label>
					<select
						bind:value={incomeForm.category}
						class="w-full rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
					>
						<option value="" disabled>Select Category</option>
						{#each incomeCategories as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex flex-col gap-2">
						<label for="month" class="font-medium text-green-600">Month</label>
						<input
							type="month"
							bind:value={incomeForm.month}
							class="w-full rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
							min="2020-01"
							max={currentMonth}
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label
							for="income amount"
							class="flex items-center justify-between font-medium text-green-600"
						>
							Amount ($)
							{#if incomeSubmitted && (!incomeForm.amount || !/^\d+(\.\d{1,2})?$/.test(incomeForm.amount))}
								<span class="text-xs text-red-500">Valid amount required</span>
							{/if}
						</label>
						<input
							type="number"
							step="0.01"
							bind:value={incomeForm.amount}
							class="w-full rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<label for="income notes" class="font-medium text-green-600">Notes</label>
					<textarea
						bind:value={incomeForm.notes}
						class="w-full resize-none rounded-3xl border-none bg-gray-100 drk:bg-gray-500 p-3 outline-none focus:ring-2 focus:ring-blue-400"
						rows="3"
					></textarea>
				</div>

				<button
					type="button"
					on:click={handleIncomeSubmit}
					class="w-full rounded-3xl border-none bg-green-600 py-3 text-white transition-colors hover:bg-green-700"
				>
					Add Income
				</button>
			</form>
		</div>
	</div>
</main>
