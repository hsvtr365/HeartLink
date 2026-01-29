<script>
	let activeTab = '성과';

	const tabs = ['성과', '내 컬렉션', '배지'];

	const daily = [
		{ title: '채팅 3회 보내기', reward: 10, progress: 2, total: 3 },
		{ title: '추천 캐릭터 1회 스와이프', reward: 5, progress: 1, total: 1 },
		{ title: '캐릭터 2명 확인', reward: 8, progress: 0, total: 2 }
	];

	const achievements = [
		{ title: '첫 대화 달성', reward: 20, done: true },
		{ title: '연속 접속 7일', reward: 40, done: false },
		{ title: '캐릭터 10명 수집', reward: 60, done: false }
	];

	const collections = [
		{ name: '희귀 카드', count: 4 },
		{ name: '스킨 세트', count: 2 },
		{ name: '프로필 장식', count: 7 }
	];

	const badges = [
		{ name: '초보 탐험가', desc: '첫 대화 완료' },
		{ name: '연속 7일', desc: '7일 연속 접속' },
		{ name: '수집가', desc: '캐릭터 10명' }
	];
</script>

<svelte:head>
	<title>Quests</title>
	<meta name="description" content="Quests and achievements" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex flex-col gap-4">
	<div class="flex items-center gap-2">
		{#each tabs as tab}
			<button
				class={`rounded-full px-4 py-2 text-xs ${
					activeTab === tab ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60'
				}`}
				on:click={() => (activeTab = tab)}
			>
				{tab}
			</button>
		{/each}
	</div>

	{#if activeTab === '성과'}
		<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
			<p class="text-sm text-white/70">일일 과제</p>
			<div class="mt-3 space-y-3">
				{#each daily as item}
					<div class="rounded-xl bg-white/5 p-3">
						<div class="flex items-center justify-between">
							<p class="text-sm font-semibold">{item.title}</p>
							<span class="text-xs text-emerald-200">+{item.reward} 💎</span>
						</div>
						<div class="mt-2 h-2 w-full rounded-full bg-white/10">
							<div
								class="h-2 rounded-full bg-emerald-300"
								style={`width: ${(item.progress / item.total) * 100}%`}
							></div>
						</div>
						<p class="mt-2 text-xs text-white/60">
							{item.progress}/{item.total}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
			<p class="text-sm text-white/70">성과 리스트</p>
			<div class="mt-3 space-y-3">
				{#each achievements as item}
					<div class="flex items-center justify-between rounded-xl bg-white/5 p-3">
						<div>
							<p class="text-sm font-semibold">{item.title}</p>
							<p class="text-xs text-white/60">보석 {item.reward}개</p>
						</div>
						<span class={`text-xs ${item.done ? 'text-emerald-200' : 'text-white/50'}`}>
							{item.done ? '달성' : '진행중'}
						</span>
					</div>
				{/each}
			</div>
		</div>
	{:else if activeTab === '내 컬렉션'}
		<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
			<p class="text-sm text-white/70">내 컬렉션</p>
			<div class="mt-3 grid grid-cols-2 gap-3">
				{#each collections as item}
					<div class="rounded-xl bg-white/5 p-3">
						<p class="text-sm font-semibold">{item.name}</p>
						<p class="text-xs text-white/60">{item.count}개 보유</p>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
			<p class="text-sm text-white/70">배지</p>
			<div class="mt-3 space-y-3">
				{#each badges as item}
					<div class="rounded-xl bg-white/5 p-3">
						<p class="text-sm font-semibold">{item.name}</p>
						<p class="text-xs text-white/60">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
