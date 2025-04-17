<script>
    import { onMount } from 'svelte';
  
    let expenses = [];
    let filteredExpenses = [];
    let editingExpense = null;
    let showEditModal = false;
  
    // Filters
    let filterDate = '';
    let filterCategory = '';
    let filterTitle = '';
  
    // Pagination
    let currentPage = 1;
    let itemsPerPage = 5;
  
    // Load expenses from localStorage
    const loadExpenses = () => {
      const storedData = localStorage.getItem('expenses');
      expenses = storedData ? JSON.parse(storedData) : [];
      applyFilters();
    };
  
    // Delete
    const handleDelete = (id) => {
      if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        applyFilters();
      }
    };
  
    // Edit
    const startEdit = (expense) => {
      editingExpense = { ...expense };
      showEditModal = true;
    };
  
    const saveEdit = () => {
      expenses = expenses.map(exp =>
        exp.id === editingExpense.id ? editingExpense : exp
      );
      localStorage.setItem('expenses', JSON.stringify(expenses));
      applyFilters();
      showEditModal = false;
    };
  
    // Apply filters
    const applyFilters = () => {
      filteredExpenses = expenses.filter(exp => {
        const matchDate = filterDate ? exp.date === filterDate : true;
        const matchCategory = filterCategory ? exp.category === filterCategory : true;
        const matchTitle = filterTitle
          ? exp.title.toLowerCase().includes(filterTitle.toLowerCase())
          : true;
        return matchDate && matchCategory && matchTitle;
      });
      currentPage = 1;
    };
  
    // Category list
    $: categories = [...new Set(expenses.map(e => e.category))];
  
    // Paginated Data
    $: paginatedExpenses = filteredExpenses.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    $: totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
      }
    };
  
    onMount(() => {
      loadExpenses();
    });
  </script>
  
  <main>
    <div class="h-screen sm:overflow-hidden overflow-scroll fixed w-[85%] sm:w-[90%] flex flex-col">
      <h1 class="text-2xl font-bold p-4  text-gray-800">Edit Expenses</h1>
  
      <!-- Filter controls -->
      <div class="mb-6 flex flex-row gap-4 items-center">
        <input
          type="date"
          bind:value={filterDate}
          on:input={applyFilters}
          class="sm:px-4 sm:py-2 rounded-lg border border-gray-300"
        />
  
        <select
          bind:value={filterCategory}
          on:change={applyFilters}
          class="sm:px-4 sm:py-2 rounded-lg border border-gray-300"
        >
          <option value="">All Categories</option>
          {#each categories as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
  
        <input
          type="text"
          placeholder="Search title..."
          bind:value={filterTitle}
          on:input={applyFilters}
          class="sm:px-4 sm:py-2 rounded-lg border border-gray-300"
        />
      </div>
  
      <!-- Expenses Table -->
      <div class="text-[.6rem] md:text-lg drk:bg-gray-800 h-full overflow-x-auto rounded-2xl bg-white pt-2 lg:p-4">
        <table class="w-full border-separate border-spacing-x-0 lg:border-spacing-y-2">
          <thead class="text-blue-600">
            <tr>
              <th class="sm:px-4 sm:py-2 text-center">Date</th>
              <th class="sm:px-4 sm:py-2 text-center">Expense</th>
              <th class="sm:px-4 sm:py-2 text-center">Category</th>
              <th class="sm:px-4 sm:py-2 text-center">Amount</th>
              <th class="sm:px-4 sm:py-2 text-center">Actions</th>
              
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {#if paginatedExpenses.length === 0}
              <tr>
                <td colspan="6" class="py-4 text-center text-gray-400">
                  No expenses match the filters.
                </td>
              </tr>
            {:else}
              {#each paginatedExpenses as expense}
                <tr class="drk:bg-gray-700 bg-white transition-colors">
                  <td class="rounded-l-md border-r border-gray-300 sm:px-4 sm:py-2 text-center">
                    {new Date(expense.date).toISOString().split('T')[0]}
                  </td>
                  <td class="border-r border-gray-300 px-2 sm:px-4 sm:py-2 text-center">
                    {expense.title}
                  </td>
                  <td class="border-r border-gray-300 px-2 sm:px-4 sm:py-2 text-center">
                    {expense.category}
                  </td>
                  <td class="border-r border-gray-300 px-2 sm:px-4 sm:py-2 text-center">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td class=" flex flex-row justify-evenly text-center">
                    <button 
                      on:click={() => startEdit(expense)}
                      class="text-blue-600 hover:text-blue-800"
                      aria-labelledby="edit"
                      
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      on:click={() => handleDelete(expense.id)}
                      class="text-red-600 hover:text-red-800"
                      aria-labelledby="del"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td>
               
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
  
      <!-- Pagination Controls -->
      <div class="flex justify-center gap-8 items-center mt-2 mb-4">
        <button on:click={() => goToPage(currentPage - 1)} class="px-1 py-1 hover:bg-blue-600  rounded-3xl disabled:opacity-50" disabled={currentPage === 1} aria-labelledby="prev">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1E124A"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
        </button>
  
        <p>Page {currentPage} of {totalPages}</p>
  
        <button on:click={() => goToPage(currentPage + 1)} class="px-1 py-1 hover:bg-blue-600  rounded-3xl disabled:opacity-50" disabled={currentPage === totalPages} aria-labelledby="next">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1E124A"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
        </button>
      </div>
  
      <!-- Edit Modal -->
      {#if showEditModal}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Edit Expense</h2>
            <form on:submit|preventDefault={saveEdit}>
              <div class="space-y-4">
                <div>
                  <label for="title" class="block mb-1">Title</label>
                  <input 
                    type="text" 
                    bind:value={editingExpense.title}
                    class="w-full p-2 rounded-lg border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label for="date" class="block mb-1">Date</label>
                  <input 
                    type="date" 
                    bind:value={editingExpense.date}
                    class="w-full p-2 rounded-lg border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label for="amount" class="block mb-1">Amount</label>
                  <input 
                    type="number" 
                    step="0.01"
                    bind:value={editingExpense.amount}
                    class="w-full p-2 rounded-lg border border-gray-300"
                    required
                  />
                </div>
                <div class="flex justify-end gap-2">
                  <button 
                    type="button"
                    on:click={() => showEditModal = false}
                    class="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      {/if}
    </div>
  </main>
  
  <style>

  </style>
  