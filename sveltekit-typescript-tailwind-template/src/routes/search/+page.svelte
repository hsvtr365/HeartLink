<script>
	let query = '';

	const characters = [
		{ name: 'Mia', desc: '힐러 타입 캐릭터' },
		{ name: 'Aria', desc: '리더형 탱커' },
		{ name: 'Luna', desc: '마법사 캐릭터' },
		{ name: 'Hana', desc: '암살자 타입' },
		{ name: 'Rex', desc: '방어형 탱커' },
		{ name: 'Theo', desc: '전략형 리더' },
		{ name: 'Zoe', desc: '고속 딜러' },
		{ name: 'Kira', desc: '지원형 캐릭터' },
		{ name: 'Bella', desc: '서포터' },
		{ name: 'Noah', desc: '균형형 딜러' }
	];

	$: filtered = (query.trim()
		? characters.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
		: characters
	).slice().sort((a, b) => a.name.localeCompare(b.name));

	const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const highlight = (text, q) => {
		if (!q) return text;
		const regex = new RegExp(`(${escapeRegExp(q)})`, 'ig');
		return text.replace(regex, '<mark class="bg-yellow-300/30 text-white">$1</mark>');
	};
</script>

<svelte:head>
	<title>Search</title>
	<meta name="description" content="Full screen character search" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex items-center gap-2 px-1 pb-3">
	<a
		href="/characters"
		class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80"
		aria-label="Back"
	>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-4 w-4"
		>
			<line x1="19" y1="12" x2="5" y2="12"></line>
			<polyline points="12 19 5 12 12 5"></polyline>
		</svg>
	</a>
	<div
		class="flex h-9 flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 text-white/80"
	>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-4 w-4"
		>
			<circle cx="11" cy="11" r="7"></circle>
			<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
		</svg>
		<input
			type="search"
			placeholder="캐릭터 검색"
			bind:value={query}
			class="w-full bg-transparent text-xs text-white/90 placeholder-white/50 outline-none"
			aria-label="Search"
		/>
	</div>
</div>

<div class="space-y-2">
	{#if filtered.length === 0}
		<div class="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/60">
			검색 결과가 없습니다
		</div>
	{:else}
		{#each filtered as item}
			<button
				class="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-3 py-3 text-left shadow-xl backdrop-blur-md"
				type="button"
			>
				<div class="h-10 w-10 rounded-full bg-white/20"></div>
				<div class="flex-1">
					<p class="text-sm font-semibold">
						{@html highlight(item.name, query)}
					</p>
					<p class="text-xs text-white/60">{item.desc}</p>
				</div>
			</button>
		{/each}
	{/if}
</div>
