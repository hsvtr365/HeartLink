<script>
	import { getContext } from 'svelte';

	const charactersShowAll = getContext('charactersShowAll');

	const sections = [
		{
			tag: '#힐러',
			characters: ['Mia', 'Hana', 'Aria', 'Luna', 'Sora', 'Iris', 'Eden']
		},
		{
			tag: '#탱커',
			characters: ['Rex', 'Theo', 'Aiden', 'Gabe', 'Noah', 'Owen', 'Kira']
		},
		{
			tag: '#딜러',
			characters: ['Zoe', 'Juno', 'Bella', 'Daisy', 'Fiona', 'Vera', 'Pia']
		},
		{
			tag: '#서포터',
			characters: ['Lia', 'Mori', 'Eve', 'Jade', 'Nina', 'Uma', 'Yuri']
		},
		{
			tag: '#마법사',
			characters: ['Cleo', 'Ivy', 'Nova', 'Rhea', 'Tara', 'Wren', 'Zara']
		},
		{
			tag: '#암살자',
			characters: ['Kai', 'Rin', 'Skye', 'Ash', 'Vale', 'Zero', 'Nyx']
		},
		{
			tag: '#궁수',
			characters: ['Eli', 'Pia', 'Rowan', 'Lark', 'Finn', 'Ola', 'Quin']
		}
	];

	const colors = [
		'bg-rose-400',
		'bg-orange-400',
		'bg-emerald-400',
		'bg-sky-400',
		'bg-violet-400',
		'bg-teal-400',
		'bg-amber-400'
	];
</script>

<svelte:head>
	<title>Characters</title>
	<meta name="description" content="Character lists by tag" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex flex-col gap-4">
	{#if $charactersShowAll}
		<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
			<div class="grid grid-cols-2 gap-3">
				{#each sections as section}
					{#each section.characters as name, i}
						<div class="rounded-2xl bg-black/40 p-2">
							<div class={`h-24 w-full rounded-xl ${colors[i % colors.length]} shadow-lg`}></div>
							<p class="mt-2 text-sm font-semibold">{name}</p>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	{:else}
		{#each sections as section}
			<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
				<div class="flex items-center justify-between">
					<p class="text-sm text-white/70">{section.tag}</p>
					<button
						class="text-xs text-white/70"
						on:click={() => charactersShowAll.set(true)}
					>
						전체보기 >
					</button>
				</div>
				<div class="mt-3 flex gap-3 overflow-x-auto pb-2">
					{#each section.characters as name, i}
						<div class="min-w-[140px]">
							<div class={`h-28 w-full rounded-2xl ${colors[i % colors.length]} shadow-lg`}></div>
							<p class="mt-2 text-sm font-semibold">{name}</p>
						</div>
					{/each}
				</div>
			</div>
		{/each}

		<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
			<p class="text-sm text-white/70">태그 목록</p>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each sections as section}
					<span class="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
						{section.tag}
					</span>
				{/each}
			</div>
		</div>
	{/if}

</div>
