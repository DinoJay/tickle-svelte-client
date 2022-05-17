<script>
	import { onMount, tick } from 'svelte';
	import * as d3 from 'd3';
	import { VennDiagram, points } from '../lib/venn/diagram';

	// import { forceSimulation } from 'd3-force';
	import { uid } from 'uid';
	import group from '$lib/group';
	import tickleData from '../data';
	import { current_component } from 'svelte/internal';
	import PreviewCard from './PreviewCard.svelte';
	console.log('tickleData', tickleData);
	const sort = (ar) => {
		ar.sort((a, b) => a.title.localeCompare(b.title));
		return ar;
	};
	const nodeData = tickleData.map((d) => {
		const set = sort(d.topics?.value)?.reduce(
			(acc, cur) => (acc.length ? `${acc},${cur.title}` : cur.title),
			''
		);

		return { ...d, set };
	});

	const unique = (a) => [...new Set(a)];

	const spreadData = nodeData.flatMap(
		(d) => {
			return {
				...d,
				sets: d.set
			};
		}
		// d.topics?.value?.map((s) => ({ ...d, set: s.title }))
	);

	const grData = [...group(spreadData, (d) => d.sets).entries()].map(([key, values]) => ({
		key,
		values
	}));

	console.log('grData', grData);

	// flatMap((d) => d.topics?.value?.map((e) => e.title)).filter((d) => d);

	// console.log('tags', tags);

	const createDummyNodes = (n) => {
		var data = [];

		for (var i = 0; i < n; i++) {
			data.push({ id: uid() });
		}

		return data;
	};

	const sets0 = grData
		.map((d) => ({ sets: d.key.split(',') }))
		.map((d) => ({ ...d, size: d.sets.length }));

	var sets = [
		{ sets: ['Computer Science'], size: 14 },

		{ sets: ['Semantic Web'], size: 7 },

		{ sets: ['Information Visualization'], size: 1 },
		{
			sets: ['Toxicology'],
			size: 14
		},
		{ sets: ['Computer Science', 'Semantic Web'], size: 7 },
		{ sets: ['Computer Science', 'Information Visualization'], size: 1 },
		{ sets: ['Computer Science', 'Toxicology'], size: 2 },
		{ sets: ['Computer Science', 'Information Visualization', 'Semantic Web'], size: 1 }
	];

	// var sets = [
	// 	{ sets: ['Computer Science'], size: 5 },

	// 	{ sets: ['Semantic Web'], size: 1 },

	// 	{ sets: ['Information Visualization'], size: 1 },
	// 	{
	// 		sets: ['Toxicology'],
	// 		size: 5
	// 	},
	// 	{ sets: ['Computer Science', 'Semantic Web'], size: 2 },
	// 	{ sets: ['Computer Science', 'Information Visualization'], size: 2 },
	// 	{ sets: ['Computer Science', 'Toxicology'], size: 1 },
	// 	{ sets: ['Computer Science', 'Information Visualization', 'Semantic Web'], size: 1 }
	// ];

	// var chart = VennDiagram();

	// onMount(() => {
	// 	console.log('chart', chart);
	// 	// const res = points({ data: sets });
	// 	// console.log('res', res);
	// 	d3.select('#venn').datum(sets).call(chart);
	// });

	const width = 650;
	const height = 500;
	const res = points({ data: sets, width, height });
	const circleDict = res.circles;
	// console.log('circleDict', circleDict);
	const circleVals = Object.values(circleDict);

	const colors = [
		'rgb(44, 160, 44)',
		'rgb(31, 119, 180)',
		'rgb(255, 127, 14)',
		'rgb(227, 119, 194)'
	];
	const nodes = nodeData.map((d) => ({
		...d,
		...circleDict[d.set],
		x: res.textCentres[d.set].x,
		y: res.textCentres[d.set].y,
		sx: res.textCentres[d.set].x,
		sy: res.textCentres[d.set].y
	}));

	console.log('nodes', nodes);
	// const node2 = nodeData.map((d) => ({
	// 	...d,
	// 	...circleDict[d.set],
	// 	sx: circleDict[d.set].x,
	// 	sy: circleDict[d.set].y
	// }));

	// console.log('nodes', nodes);
	const labelPoints = Object.entries(res.textCentres).map(([l, pos]) => ({ text: l, ...pos }));

	const labels = labelPoints.filter((d, i) => sets[i].sets.length === 1);
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
	console.log('rs', res.rs);
	const rsNodes = res.rs.map((d) => {
		console.log('d', d, nodes);
		return { ...d, nodes: nodes.filter((n) => n.set === d.setsStr) };
	});

	// var valueFn = layout.value();

	const NODERAD = 15;

	const setNodes = rsNodes.map((set) => {
		// function pack(set, valueFn) {
		var innerRadius = set.r,
			center = set.center,
			nodes = set.nodes,
			x = center.x,
			y = center.y;

		const p = d3.packSiblings(nodes.map((d) => ({ ...d, r: NODERAD + 2 })));
		console.log('p', p);
		p.forEach(function (n) {
			n.x += x;
			n.y += y;
		});
		return { ...set, nodes: p };
	});

	const newNodes = setNodes.flatMap((d) => d.nodes);
</script>

<!-- <div>
	{#each circleVals as c}
		<div
			style="position:absolute;width:{c.radius * 2}px;height:{c.radius *
				2}px;top:{c.x}px;left:{c.y}px;transform(-50%,-50%);border:1px solid black; border-radius:50%"
		/>
	{/each}
</div> -->

<!-- <div id="venn" /> -->

<!-- <svg width="600" height="400">
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
	{#each circleVals as c, i}
		<div
			class="absolute border border-sky-500 rounded-full center opacity-20"
			style="left:{c.x}px;top:{c.y}px;width:{c.radius * 2}px;height:{c.radius *
				2}px;background:{colors[i]}"
		/>
	{/each}
	<!-- {#each res.rs as c, i}
		<div
			class="absolute border border-sky-500 rounded-full center opacity-20"
			style="left:{c.center.x}px;top:{c.center.y}px;width:{c.r * 2}px;height:{c.r *
				2}px;background:{colors[i]}"
		/>
	{/each} -->
	{#each labels as l, i}
		<div
			class="absolute center text-center"
			style="left:{l.x}px;top:{l.y}px;width:{2 * circleVals[i].radius}px"
		>
			{l.text}
		</div>
	{/each}
	{#each newNodes as n}
		<div
			class="absolute center bg-blue-500 rounded-full opacity-40"
			style="width:{NODERAD * 2}px;height:{NODERAD * 2}px;left:{n.x}px;top:{n.y}px"
		/>
	{/each}
</div>

<style>
	.center {
		transform: translate(-50%, -50%);
	}
</style>
