<script>
  import { fade } from 'svelte/transition';
  
  // Initialize categories
  const expenseCategories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Healthcare', 'Other'];
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
    return (
      incomeForm.category &&
      incomeForm.amount &&
      /^\d+(\.\d{1,2})?$/.test(incomeForm.amount)
    );
  }

  // Submit handlers
  function handleExpenseSubmit() {
    if (validateExpense()) {
      saveToLocalStorage('expenses', {
        ...expenseForm,
        amount: parseFloat(expenseForm.amount)
      });
      alert("Expense added successfully");
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

<main class="h-screen sm:overflow-hidden overflow-scroll fixed w-[85%] sm:w-[90%] flex flex-col"> 
<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 min-h-screen p-4">
  
  <div class="bg-transparent flex justify-center flex-col items-center rounded-xl p-4 shadow-sm relative md:mr-4">
    <h2 class="text-2xl font-bold mb-6 text-blue-900">Add Expense</h2>
    
    <form id="expense" class="space-y-4 sm:w-[75%] ">
      <div class="flex flex-col gap-2">
        <label for="expense titel" class="text-blue-600 font-medium flex justify-between items-center">
          Title
          {#if expenseSubmitted && !expenseForm.title.trim()}
            <span class="text-red-500 text-xs">Please fill the title</span>
          {/if}
        </label>
        <input
          type="text"
          bind:value={expenseForm.title}
          class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label for="date" class="text-blue-600 font-medium">Date</label>
          <input
            type="date"
            bind:value={expenseForm.date}
            class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="expense category" class="text-blue-600 font-medium flex justify-between items-center">
            Category
            {#if expenseSubmitted && !expenseForm.category}
              <span class="text-red-500 text-xs">Please select category</span>
            {/if}
          </label>
          <select
            bind:value={expenseForm.category}
            class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="" disabled>Select Category</option>
            {#each expenseCategories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label  for="expense amount" class="text-blue-600 font-medium flex justify-between items-center">
          Amount ($)
          {#if expenseSubmitted && (!expenseForm.amount || !/^\d+(\.\d{1,2})?$/.test(expenseForm.amount))}
            <span class="text-red-500 text-xs">Valid amount required</span>
          {/if}
        </label>
        <input
          type="number"
          step="0.01"
          bind:value={expenseForm.amount}
          class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="notes" class="text-blue-600 font-medium">Notes</label>
        <textarea
          bind:value={expenseForm.notes}
          class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          rows="3"
        ></textarea>
      </div>

      <button
        type="button"
        on:click={handleExpenseSubmit}
        class="w-full bg-blue-600 text-white py-3 rounded-3xl border-none  hover:bg-blue-700 transition-colors"
      >
        Add Expense
      </button>
    </form>
  </div>

  <!-- Income Form -->
  <div class="bg-transparent flex justify-center  flex-col items-center rounded-xl p-4 shadow-sm relative md:ml-4">
    <h2 class="text-2xl font-montserrat font-bold mb-8 text-green-900 ">Add Income</h2>
    
    <form class="space-y-4">
      <div class="flex flex-col gap-2">
        <label for="category" class="text-green-600 font-medium flex justify-between items-center">
          Category
          {#if incomeSubmitted && !incomeForm.category}
            <span class="text-red-500 text-xs">Please select category</span>
          {/if}
        </label>
        <select
          bind:value={incomeForm.category}
          class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="" disabled>Select Category</option>
          {#each incomeCategories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label for="month" class="text-green-600 font-medium">Month</label>
          <input
            type="month"
            bind:value={incomeForm.month}
            class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none"
            min="2020-01"
            max={currentMonth}
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="income amount" class="text-green-600 font-medium flex justify-between items-center">
            Amount ($)
            {#if incomeSubmitted && (!incomeForm.amount || !/^\d+(\.\d{1,2})?$/.test(incomeForm.amount))}
              <span class="text-red-500 text-xs">Valid amount required</span>
            {/if}
          </label>
          <input
            type="number"
            step="0.01"
            bind:value={incomeForm.amount}
            class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label for="income notes" class="text-green-600 font-medium">Notes</label>
        <textarea
          bind:value={incomeForm.notes}
          class="w-full p-3 rounded-3xl border-none bg-gray-100  focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          rows="3"
        ></textarea>
      </div>

      <button
        type="button"
        on:click={handleIncomeSubmit}
        class="w-full bg-green-600 text-white py-3 rounded-3xl border-none  hover:bg-green-700 transition-colors"
      >
        Add Income
      </button>
    </form>
  </div>
</div>
</main>