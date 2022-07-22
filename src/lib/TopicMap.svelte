<script>
	import * as d3 from 'd3';
	import { points } from '../lib/venn/diagram';

	export let cards;
	export let onClick;
	export let selectedCard;

	const colors = [
		'rgb(44, 160, 44)',
		'rgb(31, 119, 180)',
		'rgb(255, 127, 14)',
		'rgb(227, 119, 194)'
	];

	const width = window.innerWidth * 0.95;
	const height = window.innerHeight * 0.6;
	console.log(width);
	let NODERAD = 12;
	if (window.innerWidth < 750) NODERAD = 8;

	var circleVals = [];
	var labels = [];
	var newNodes = [];
	let withoutNullTopics = [];

	$: if (cards) {
		withoutNullTopics = [];

		// WE REMOVE THE CARDS WITH A NULL TOPIC - les cartes sont quasi toutes vides ...
		cards.forEach((card) => {
			if (card.topics?.value?.length >= 1) withoutNullTopics.push(card);
		});

		const sort = (ar, acc = (a) => a.title) => {
			ar = ar.slice().sort((a, b) => acc(b).localeCompare(a.title));
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
			const len = a.filter((d) => b.includes(d)).length;
			return a.length === len;
		};

		const getSetsStr = (d, accessor = (e) => e.title) => {
			const ret = sort(d, accessor).reduce(
				(acc, cur) => (acc.length > 0 ? `${acc},${accessor(cur)}` : accessor(cur)),
				''
			);
			return ret;
		};

		const nodeData = withoutNullTopics.map((d) => {
			const sets = sort(d.topics?.value).map((d) => d.title);
			const setsStr = getSetsStr(d.topics?.value);
			return { ...d, sets, setsStr };
		});

		const unique = (a) => [...new Set(a)];

		const setKeys = unique(nodeData.flatMap((d) => d.sets));

		const allSetKeys = findAllSubsets(setKeys).map((d) => sort(d, (d) => d));

		const allSets = allSetKeys
			.filter((d) => d.length > 0)
			.map((a) => ({
				key: getSetsStr(a, (d) => d),
				sets: a,
				values: nodeData.filter((d) => isSubset(a, d.sets))
			}))
			.filter((d) => d.values.length > 0);

		allSets.forEach((d) => {
			d.size = d.values.length / d.sets.length;
		});

		const { textCentres, circles: circleDict, rs } = points({ data: allSets, width, height });

		circleVals = Object.values(circleDict);

		const nodes = nodeData.map((d) => {
			return {
				...d,
				...circleDict[d.setsStr],
				x: textCentres[d.setsStr]?.x,
				y: textCentres[d.setsStr]?.y,
				sx: textCentres[d.setsStr]?.x,
				sy: textCentres[d.setsStr]?.y
			};
		});

		const labelPoints = Object.entries(textCentres).map(([l, pos]) => ({ text: l, ...pos }));

		labels = labelPoints.filter((d, i) => allSets[i].sets.length === 1);

		const rsNodes = rs.map((d) => {
			return { ...d, nodes: nodes.filter((n) => n.setsStr === d.setsStr) };
		});

		const setNodes = rsNodes.map((set) => {
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

		newNodes = setNodes.flatMap((d) => d.nodes);
	}
</script>

<div class="flex w-full h-[calc(100vh-20rem)] ">
	<div class="m-auto relative overflow-auto" style="height:{height}px; width: {width}px;">
		{#each circleVals as c, i}
			<div
				class="absolute border border-sky-500 rounded-full center opacity-20"
				style="left:{c.x}px;top:{c.y}px;width:{c.radius * 2}px;height:{c.radius *
					2}px;background:{colors[i]}"
			/>
		{/each}
		{#each labels as l, i}
			<div
				class="absolute center text-center"
				style="left:{l.x}px;top:{l.y}px;width:{1 * circleVals[i].radius}px"
			>
				{l.text}
			</div>
		{/each}
		{#each newNodes as n}
			<div
				on:click={() => {
					// console.log('click');
					onClick(n.id);
				}}
				class="absolute z-10 bg-gray-700 rounded-full opacity-40 {n.id === selectedCard
					? 'highlighted_center'
					: 'center'}"
				style="width:{NODERAD * 2}px;height:{NODERAD * 2}px;left:{n.x}px;top:{n.y}px"
			/>
		{/each}
	</div>
</div>

<style>
	.highlighted_center {
		transform: translate(-50%, -50%) scale(1.4);
		@apply border-2 border-black transition;
	}
	.center {
		transform: translate(-50%, -50%);
	}
</style>
