<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import * as d3 from 'd3';
	import { points } from './venn/diagram';
	import TickleWobble from '$lib/components/utils/TickleWobble.svelte';

	export let cards = [{}];
	export let selectedCard = '';
	export let selectedEnvironment = '';
	export let onClick = () => {};

	const width = window.innerWidth * 0.95;
	const height = window.innerHeight * 0.6;

	let NODERAD = 12;
	if (window.innerWidth < 750) NODERAD = 8;
	let circleVals = [];
	let labels = [];
	let newNodes = [];
	let colors = [];

	async function loadTopicMap() {
		await getColors();
	}

	async function getColors() {
		await getDocs(collection(db, 'card-envs', selectedEnvironment, 'topics'))
			.then((snap) => {
				const topics = snap.docs.map((doc) => {
					return doc.data();
				});
				topics.forEach((topic) => {
					if (!colors.includes(topic.color)) colors[topic.title] = topic.color;
				});
				return topics;
			})
			.then((topics) => {
				getTopicValues(topics);
			});
	}

	const getTopicValues = (topics) => {
		console.log(topics);
		if (cards.length == 0) return;

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

		const nodeData = cards.map((d) => {
			let cardTopics = [];
			topics.forEach((topic) => {
				if (d.topics.includes(topic.id)) cardTopics.push(topic);
			});
			const sets = sort(cardTopics).map((d) => d.title);
			const setsStr = getSetsStr(cardTopics);
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

		Object.keys(circleDict).forEach((key) => {
			circleVals = [...circleVals, { value: circleDict[key], title: key }];
		});

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
	};

	const getColor = (title) => {
		return colors[title];
	};

	const getRadius = (title) => {
		let circleVal = circleVals.find((cirV) => cirV.title == title);
		return circleVal.value.radius;
	};
</script>

{#await loadTopicMap()}
	<TickleWobble />
	<div class="h-full w-full bg-black" />
{:then _}
	<div class="flex w-full h-[calc(100vh-20rem)]">
		<div class="m-auto relative overflow-auto" style="height:{height}px;width:{width}px;">
			{#each circleVals as c}
				<div
					class="absolute border border-sky-500 rounded-full center opacity-20"
					style="left:{c.value.x}px;top:{c.value.y}px;width:{c.value.radius * 2}px;height:{c.value
						.radius * 2}px;background:{getColor(c.title)}"
				/>
			{/each}
			{#each labels as l}
				<div
					class="absolute center text-center"
					style="left:{l.x}px;top:{l.y - 30}px;width:{1 * getRadius(l.text)}px"
				>
					{l.text}
				</div>
			{/each}
			{#each newNodes as n}
				<div
					on:click={() => {
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
{/await}

<style>
	.highlighted_center {
		transform: translate(-50%, -50%) scale(1.4);
		@apply border-2 border-black transition;
	}
	.center {
		transform: translate(-50%, -50%);
	}
</style>
