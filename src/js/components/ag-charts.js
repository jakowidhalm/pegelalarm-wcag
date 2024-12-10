import { AgCharts, time } from 'ag-charts-community';
import { AG_CHARTS_LOCALE_DE_DE } from 'ag-charts-locale';
function initChart(element, data, maxFill, yAxisMin, yAxisMax, title) {
	if (!element) {
		return;
	}

	const options = {
		// Chart Title
		title: {
			text: title,
			align: 'center',
			verticalAlign: 'top',
		},
		container: element,
		data: data,
		series: [
			{
				type: 'area',
				xKey: 'date',
				yKey: 'height',
				interpolation: {
					type: 'smooth',
				},
				fill: '#2164B0',
				tooltip: { renderer: renderer },
			},
		],
		locale: {
			localeText: AG_CHARTS_LOCALE_DE_DE,
		},
		legend: {
			toggleSeries: false,
			item: {
				maxWidth: 230,
				paddingX: 32,
				paddingY: 8,
				marker: {
					padding: 8,
				},
				label: {
					fontSize: 14,
					fontWeight: 500,
					formatter: ({ value }) => (value === 'height' ? 'Pegel in cm' : value),
				},
			},
		},
		tooltip: {
			class: 'my-tooltip',
		},
		axes: [
			{
				type: 'time',
				position: 'bottom',
				label: {
					fontSize: 10,
					// padding: 20,

					formatter: ({ value }) => {
						return value.getDate() + '.' + value.getMonth();
					},
					avoidCollisions: false,
					minSpacing: 20,
				},
				interval: {
					step: time.day,
				},
				nice: false,
			},
			{
				position: 'left',
				type: 'number',
				min: yAxisMin,
				max: yAxisMax,
				interval: {
					step: 100,
				},
				label: {
					formatter: (params) => {
						return params.value + 'cm';
					},
				},
				crossLines: [
					{
						type: 'line',
						value: maxFill,
						stroke: '#ff0000',
						label: {
							text: 'Maximale Kapazität: ' + maxFill + ' cm',
							position: 'top',
							fontSize: 12,
						},
					},
				],
			},
		],
	};

	// Create Chart
	const chart = AgCharts.create(options);
}

function initChartTable(element, data) {
	if (!element) {
		return;
	}

	const table = document.createElement('table');
	table.classList.add('table');

	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	tr.innerHTML = '<th scope="col">Datum</th><th scope="col">Pegelstand</th>';
	thead.appendChild(tr);
	table.appendChild(thead);

	const tbody = document.createElement('tbody');
	data.forEach((item) => {
		const tr = document.createElement('tr');

		const date = item.date.getHours() + ':00 Uhr ' + item.date.getDate() + '.' + item.date.getMonth() + '.' + item.date.getFullYear();

		tr.innerHTML = `<td>${date}</td><td>${item.height} cm</td>`;
		tbody.appendChild(tr);
	});
	table.appendChild(tbody);

	element.appendChild(table);
}

function renderer({ datum, xKey, yKey }) {
	const date = datum[xKey].getHours() + ':00 Uhr ' + datum[xKey].getDate() + '.' + datum[xKey].getMonth() + '.' + datum[xKey].getFullYear();
	return {
		title: date,
		content: 'Pegelstand: ' + datum[yKey].toFixed(0) + ' cm',
	};
}

export { initChart, initChartTable };
