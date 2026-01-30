<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const tabs = [
		{ href: '/', icon: '💬', label: '캐릭터 대화창' },
		{ href: '/recommend', icon: '❤️', label: '추천 캐릭터' },
		{ href: '/characters', icon: '🧩', label: '전체 캐릭터 / 업데이트' },
		{ href: '/quests', icon: '🏆', label: '퀘스트 / 배지' },
		{ href: '/mypage', icon: '👤', label: '마이페이지' }
	];

	$: currentPath = $page.url.pathname;
	$: isActive = (href: string) => (href === '/' ? currentPath === '/' : currentPath.startsWith(href));

	const chatSearch = writable('');
	setContext('chatSearch', chatSearch);

	const charactersShowAll = writable(false);
	setContext('charactersShowAll', charactersShowAll);

	const defaultHeader = { mode: 'none', back: 'none' };
	$: header = $page.data?.header ?? defaultHeader;
	$: showBack =
		header.back === 'always' ? true : header.back === 'charactersShowAll' ? $charactersShowAll : false;
</script>

<main class="h-screen w-full text-white" style="--nav-h: 4rem;">
	<div
		class="flex h-screen w-full flex-col overflow-hidden border-white/10 shadow-2xl ring-1 ring-white/5 backdrop-blur-[18px]"
	>
		<!-- Header -->
		<div class="sticky top-0 z-10 flex items-center justify-between px-5 pb-3 pt-6">
			{#if showBack}
				<button
					class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80"
					aria-label="Back"
					on:click={() => charactersShowAll.set(false)}
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
				</button>
			{:else}
				<div></div>
			{/if}
			<div class="flex items-center gap-2">
				{#if header.mode === 'home-search'}
					<div
						class="flex h-10 w-full max-w-xs items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 text-white/80"
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
							bind:value={$chatSearch}
							class="w-full bg-transparent text-xs text-white/90 placeholder-white/50 outline-none"
							aria-label="Search characters"
						/>
					</div>
				{:else if header.mode === 'search-button'}
					<a
						href="/search"
						class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80"
						aria-label="Go to search"
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
					</a>
				{/if}
				<!--
				<button
					class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80"
					aria-label="Settings"
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
						<circle cx="12" cy="12" r="3"></circle>
						<path
							d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 10 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 20.91 10H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
						></path>
					</svg>
				</button>
				-->
			</div>
		</div>

		<!-- Page content -->
		<div class="flex-1 overflow-y-auto pb-[calc(var(--nav-h)+0rem)] scroll-pb-[calc(var(--nav-h)+1rem)]">
			<slot />
		</div>

		<!-- Bottom nav -->
		<div
			class="fixed bottom-0 left-0 right-0 h-16 border-t border-white/10 bg-black/60 px-6 backdrop-blur-md"
		>
			<div class="flex h-full items-center justify-between text-lg text-white/70">
				{#each tabs as tab}
					<a
						href={tab.href}
						aria-label={tab.label}
						class={isActive(tab.href) ? 'text-white' : ''}
					>
						{tab.icon}
					</a>
				{/each}
			</div>
		</div>
	</div>
</main>
