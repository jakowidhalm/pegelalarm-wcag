import { AgCharts, time } from 'ag-charts-community';
import { AG_CHARTS_LOCALE_DE_DE } from 'ag-charts-locale';
function initChart(data, maxFill, yAxisMin, yAxisMax, title) {
	const options = {
		// Chart Title
		title: {
			text: title,
			align: 'center',
			verticalAlign: 'top',
		},
		container: document.getElementById('myChart'),
		data: data,
		series: [
			{
				type: 'area',
				xKey: 'date',
				yKey: 'height',
				interpolation: {
					type: 'smooth',
				},
				tooltip: { renderer: renderer },
			},
		],
		locale: {
			localeText: AG_CHARTS_LOCALE_DE_DE,
		},
		legend: {
			toggleSeries: false,
			item: {
				maxWidth: 130,
				paddingX: 32,
				paddingY: 8,
				marker: {
					padding: 8,
				},
				label: {
					formatter: ({ value }) => (value === 'height' ? 'Pegel in cm' : value),
				},
			},
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

function renderer({ datum, xKey, yKey }) {
	const date = datum[xKey].getHours() + ':00 Uhr ' + datum[xKey].getDate() + '.' + datum[xKey].getMonth() + '.' + datum[xKey].getFullYear();
	return {
		title: date,
		content: 'Pegelstand: ' + datum[yKey].toFixed(0) + ' cm',
	};
}

export { initChart };
