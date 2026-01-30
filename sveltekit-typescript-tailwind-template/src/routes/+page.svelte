<script>
	import { getContext } from 'svelte';
	import { getChats } from '$lib/data/chats';

	const chatSearch = getContext('chatSearch');
	const chats = getChats();

	$: query = ($chatSearch || '').trim().toLowerCase();
	$: filteredChats = query
		? chats.filter((c) => c.name.toLowerCase().includes(query))
		: chats;

	const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const highlight = (text, q) => {
		if (!q) return text;
		const regex = new RegExp(`(${escapeRegExp(q)})`, 'ig');
		return text.replace(regex, '<mark class="bg-yellow-300/30 text-white">$1</mark>');
	};

	const chatHref = (id) => `/chat/${encodeURIComponent(id)}`;
</script>

<svelte:head>
	<title>Kakao Style Home</title>
	<meta name="description" content="Mobile kakao-style UI with glassmorphism" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex flex-col gap-3 ">
	<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
		<p class="text-sm text-white/70">Recommended</p>
		<p class="mt-1 text-base font-semibold">Create a room with friends</p>
		<div class="mt-3 flex items-center gap-2">
			<div class="h-8 w-8 rounded-full bg-white/20"></div>
			<div class="h-8 w-8 rounded-full bg-white/20"></div>
			<div class="h-8 w-8 rounded-full bg-white/20"></div>
			<span class="text-xs text-white/60">+12</span>
		</div>
	</div>

	<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
		<p class="text-sm text-white/70">채팅</p>
		<div class="mt-3 space-y-3">
			{#if filteredChats.length === 0}
				<div class="bg-white/5 px-3 py-3 text-xs text-white/60">
					검색 결과가 없습니다
				</div>
			{:else}
				{#each filteredChats as chat}
					<a class="flex items-center gap-3" href={chatHref(chat.id)}>
						<div class="h-10 w-10 rounded-full bg-white/20"></div>
						<div class="flex-1">
							<p class="text-sm font-semibold">
								{@html highlight(chat.name, query)}
							</p>
							<p class="text-xs text-white/60">{chat.message}</p>
						</div>
						<span class="text-xs text-white/50">{chat.time}</span>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>
