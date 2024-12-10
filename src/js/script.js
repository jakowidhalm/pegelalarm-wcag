import { initChart, initChartTable } from './components/ag-charts.js';
import { wpUtils } from './utils/utils.js';

document.addEventListener('DOMContentLoaded', () => {
	const maxFill = 600;
	const yAxisMax = 630;
	const yAxisMin = 400;
	const title = 'Pegelstand der vergangenen sieben Tage';

	// Generate Data
	// [{
	// 	date : Mon Dec 02 2024 11:33:12 GMT+0100 (Mitteleuropäische Normalzeit)
	// 	height : 503 },
	// 	{...},
	// 	{...}
	// }]
	const cart = document.getElementById('myChart');
	const table = document.getElementById('myTable');
	const data = wpUtils.generateData();

	initChart(cart, data, maxFill, yAxisMin, yAxisMax, title);
	initChartTable(table, data);
});
