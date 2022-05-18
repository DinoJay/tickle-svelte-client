<script>
	import { onMount, tick } from 'svelte';
	import * as d3 from 'd3';
	import { VennDiagram, points } from '../lib/venn/diagram';

	// import { forceSimulation } from 'd3-force';
	import { uid } from 'uid';
	import group from '$lib/group';
	import tickleData from '../data';
	const sort = (ar, acc = (a) => a.title) => {
		ar.sort((a, b) => acc(a).localeCompare(b.title));
		return ar;
	};

	const findAllSubsets = (arr = []) => {
		arr.sort();
		const res = [[]];
		let count, subRes, preLength;
		for (let i = 0; i < arr.length; i++) {
			count = 1;
			while (arr[i + 1] && arr[i + 1] == arr[i]) {
				count += 1;
				i++;
			}
			preLength = res.length;
			for (let j = 0; j < preLength; j++) {
				subRes = res[j].slice();
				for (let x = 1; x <= count; x++) {
					if (x > 0) subRes.push(arr[i]);
					res.push(subRes.slice());
				}
			}
		}
		return res;
	};

	const isSubset = (a, b) => {
		// console.log('a', a, 'b', b);
		const len = a.filter((d) => b.includes(d)).length;
		// console.log(
		// 	'yes',
		// 	a.filter((d) => b.includes(d))
		// );
		return a.length === len;
	};

	const getSetsStr = (d, accessor = (e) => e.title) => {
		const ret = sort(d, accessor).reduce(
			(acc, cur) => (acc.length > 0 ? `${acc},${accessor(cur)}` : accessor(cur)),
			''
		);
		return ret;
	};

	const nodeData = tickleData.map((d) => {
		const sets = sort(d.topics?.value).map((d) => d.title);
		const setsStr = getSetsStr(d.topics?.value);
		return { ...d, sets, setsStr };
	});

	const unique = (a) => [...new Set(a)];

	const setKeys = unique(nodeData.flatMap((d) => d.sets));

	const allSetKeys = findAllSubsets(setKeys).map((d) => sort(d, (d) => d));
	console.log('allSetKeys', allSetKeys);

	const allSets = allSetKeys
		.filter((d) => d.length > 0)
		.map((a) => ({
			key: getSetsStr(a, (d) => d),
			sets: a,
			values: nodeData.filter((d) => isSubset(a, d.sets))
		}))
		.filter((d) => d.values.length > 0)
		.map((d) => ({ ...d, size: d.values.length / d.sets.length }));

	console.log('allSets', allSets);

	const width = 650;
	const height = 500;
	const { textCentres, circles: circleDict, rs } = points({ data: allSets, width, height });
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
		...circleDict[d.setsStr],
		x: textCentres[d.setsStr].x,
		y: textCentres[d.setsStr].y,
		sx: textCentres[d.setsStr].x,
		sy: textCentres[d.setsStr].y
	}));

	console.log(
		'nodes',
		nodes.map((d) => d.sets)
	);
	const labelPoints = Object.entries(textCentres).map(([l, pos]) => ({ text: l, ...pos }));

	const labels = labelPoints.filter((d, i) => sets[i].sets.length === 1);

	const rsNodes = rs.map((d) => {
		return { ...d, nodes: nodes.filter((n) => n.setsStr === d.setsStr) };
	});

	// var valueFn = layout.value();

	const NODERAD = 12;

	const setNodes = rsNodes.map((set) => {
		// function pack(set, valueFn) {
		var innerRadius = set.r,
			center = set.center,
			nodes = set.nodes,
			x = center.x,
			y = center.y;

		const p = d3.packSiblings(nodes.map((d) => ({ ...d, r: NODERAD + 2 })));
		p.forEach((n) => {
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
			class="absolute center bg-gray-700 rounded-full opacity-40"
			style="width:{NODERAD * 2}px;height:{NODERAD * 2}px;left:{n.x}px;top:{n.y}px"
		/>
	{/each}
</div>

<style>
	.center {
		transform: translate(-50%, -50%);
	}
</style>
