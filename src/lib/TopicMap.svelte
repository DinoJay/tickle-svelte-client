<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { VennDiagram, points } from '../lib/venn/diagram';

	// import { forceSimulation } from 'd3-force';
	import { uid } from 'uid';
	import tickleData from '../data';
	console.log('tickleData', tickleData);

	const createDummyNodes = (n) => {
		var data = [];

		for (var i = 0; i < n; i++) {
			data.push({ id: uid() });
		}

		return data;
	};

	var sets = [
		{ sets: ['Computer Science'], size: 30 },
		{ sets: ['Semantic Web'], size: 6 },
		{ sets: ['Information Visualization'], size: 6 },
		{ sets: ['Computer Science', 'Semantic Web'], size: 6 },
		{
			sets: ['Computer Science', 'Information Visualization'],
			size: 6
		},
		{ sets: ['Toxicology'], size: 2 }
		// { sets: ['Computer Science', 'Toxicology'], size: 1 }
	];

	const data = [
		...createDummyNodes(5).map((d) => ({ ...d, set: 'Semantic Web' })),
		...createDummyNodes(5).map((d) => ({ ...d, set: 'Information Visualization' })),
		...createDummyNodes(5).map((d) => ({ ...d, set: 'Toxicology' }))
	];

	// var chart = VennDiagram();

	// onMount(() => {
	// 	console.log('chart', chart);
	// 	// const res = points({ data: sets });
	// 	// console.log('res', res);
	// 	d3.select('#venn').datum(sets).call(chart);
	// });

	const width = 700;
	const height = 500;
	const res = points({ data: sets, width, height });
	const circleDict = res.circles;
	// console.log('circleDict', circleDict);
	const circleVals = Object.values(circleDict);

	const nodes = data.map((d) => ({
		...d,
		...circleDict[d.set],
		sx: circleDict[d.set].x,
		sy: circleDict[d.set].y
	}));

	// console.log('nodes', nodes);
	const labels = Object.entries(res.textCentres)
		.map(([l, pos]) => ({ text: l, ...pos }))
		.filter((d, i) => sets[i].sets.length === 1);
	// console.log('circleVals', circleVals);
	// console.log('labels', labels);

	let ns = nodes;
	const simulation = d3
		.forceSimulation(nodes)
		// .force(
		// 	'center',
		// 	d3.forceCenter((d) => [d.sx, d.sy])
		// )
		.force('collide', d3.forceCollide(10));

	simulation.on('tick', () => (ns = simulation.nodes()));
</script>

<!-- <div>
	{#each circleVals as c}
		<div
			style="position:absolute;width:{c.radius * 2}px;height:{c.radius *
				2}px;top:{c.x}px;left:{c.y}px;transform(-50%,-50%);border:1px solid black; border-radius:50%"
		/>
	{/each}
</div> -->

<!-- <div id="venn" />

<svg width="600" height="400">
	{#each circleVals as c}
		<circle cx={c.x} cy={c.y} r={c.radius} stroke="black" stroke-width="2" fill="none" />
	{/each}
	{#each labels as l}
		<text
			class="label"
			text-anchor="middle"
			dy=".35em"
			x={l.x}
			y={l.y}
			style="fill: rgb(68, 68, 68);"><tspan x={l.x} y={l.y} dy="0.35em">{l.text}</tspan></text
		>
	{/each}
</svg> -->

<div class="relative" style="width:{width}px; height: {height}px">
	{#each circleVals as c}
		<div
			class="absolute border border-sky-500 rounded-full center"
			style="left:{c.x}px;top:{c.y}px;width:{c.radius * 2}px;height:{c.radius * 2}px;"
		/>
	{/each}
	{#each labels as l, i}
		<div
			class="absolute center text-center"
			style="left:{l.x}px;top:{l.y}px;width:{2 * circleVals[i].radius}px"
		>
			{l.text}
		</div>
	{/each}
	{#each ns as n}
		<div
			class="absolute center bg-blue-500 rounded-full opacity-40"
			style="width:20px;height:20px;left:{n.x}px;top:{n.y}px"
		/>
	{/each}
</div>

<style>
	.center {
		transform: translate(-50%, -50%);
	}
</style>
