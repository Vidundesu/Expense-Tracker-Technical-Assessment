<!---
    Charts
    =======

    this component is responsible of fetching data from localstorage and display those data in charts using
    chartjs library

    outomce
        this component is reusable
-->

<script>
    import { onMount, afterUpdate } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let expenses = [];
    export let selectedYear;
  
    let pieChart, barChart;
    let pieCtx, barCtx;
    let pieContainer, barContainer;
  
    // Process data for pie chart (categories)
    $: categoriesData = {
      labels: [],
      values: [],
      colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
    };
  
    $: {
      const categoryMap = new Map();
      expenses.forEach(expense => {
        if (expense.category) {
          const total = categoryMap.get(expense.category) || 0;
          categoryMap.set(expense.category, total + expense.amount);
        }
      });
      categoriesData.labels = Array.from(categoryMap.keys());
      categoriesData.values = Array.from(categoryMap.values());
    }
  
    // Process data for bar chart (monthly expenses)
    $: monthlyExpensesData = Array(12).fill(0).map((_, month) => 
      expenses.filter(e => new Date(e.date).getMonth() === month)
        .reduce((acc, curr) => acc + curr.amount, 0)
    );
  
    function initCharts() {
      // Destroy existing charts
      if (pieChart) pieChart.destroy();
      if (barChart) barChart.destroy();
  
      // Pie Chart
      if (pieCtx && categoriesData.labels.length > 0) {
        pieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: categoriesData.labels,
            datasets: [{
              data: categoriesData.values,
              backgroundColor: categoriesData.colors,
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            }
          }
        });
      }
  
      // Bar Chart
      if (barCtx) {
        barChart = new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              data: monthlyExpensesData,
              backgroundColor: '#3b82f6',
              borderWidth: 0,
              borderRadius: 4,
              barThickness: 12
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { color: '#6b7280' }
              },
              x: {
                grid: { display: false },
                ticks: { color: '#6b7280' }
              }
            }
          }
        });
      }
    }
  
    onMount(() => {
      const resizeObserver = new ResizeObserver(initCharts);
      if (pieContainer) resizeObserver.observe(pieContainer);
      if (barContainer) resizeObserver.observe(barContainer);
      
      return () => {
        resizeObserver.disconnect();
        if (pieChart) pieChart.destroy();
        if (barChart) barChart.destroy();
      };
    });
  
    // Update charts when data changes
    $: expenses, initCharts();
  </script>
  
  <div class="col-span-6 bg-white drk:bg-slate-900 rounded-2xl row-span-3 sm:col-span-3 sm:row-span-3 p-4">
    <div class="grid h-full w-full grid-rows-2 gap-4">
      <div id="pie-chart" class="flex flex-row gap-4 justify-between sm:justify-evenly h-full">
        <div id="pie-canvas" class="w-[40%] h-full" bind:this={pieContainer}>
          <canvas bind:this={pieCtx}></canvas>
        </div>
        <div id="categories" class="flex flex-col justify-center">
          {#each categoriesData.labels as label, i}
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 rounded-full mr-2" 
                   style="background-color: {categoriesData.colors[i % categoriesData.colors.length]}"></div>
              <span class="text-xs drk:text-gray-300">{label}</span>
            </div>
          {:else}
            <div class="text-xs text-gray-500">No categories found</div>
          {/each}
        </div>
      </div>
      
      <div id="bar-chart" class="h-full">
        <div class="flex justify-between items-center">
          <h3 class="font-semibold drk:text-gray-300">Monthly Expenses - {selectedYear}</h3>
        </div>
        <div class="h-full" bind:this={barContainer}>
          <canvas bind:this={barCtx}></canvas>
        </div>
      </div>
    </div>
  </div>
  
  <style global>
    canvas {
      background-color: transparent !important;
      min-height: 150px;
      width: 100% !important;
      height: 100% !important;
    }
  </style>