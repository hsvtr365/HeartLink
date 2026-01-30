<script>
	import { page } from '$app/stores';
	import { getChatById } from '$lib/data/chats';
	import { getMessagesByChatId } from '$lib/data/messages';
	import { progressStorage } from '$lib/storage';
	import { browser } from '$app/environment';
	import { tick } from 'svelte';

	const decodeId = (value) => {
		try {
			return decodeURIComponent(value);
		} catch {
			return value;
		}
	};

	let progressIndex = 0;
	let messages = [];
	const episode = 0;
	let scrollEl;

	const loadProgress = async (id) => {
		if (!id) return;
		try {
			const record = await progressStorage.getProgress('local', id, episode);
			if (!record) {
				progressIndex = 0;
				await progressStorage.setProgress({
					userId: 'local',
					chatId: id,
					episode,
					progressIndex,
					updatedAt: Date.now()
				});
				return;
			}
			progressIndex = record.progressIndex ?? 0;
		} catch {
			progressIndex = 0;
		}
	};

	$: chatId = decodeId($page.params.id);
	$: chat = getChatById(chatId);
	$: allMessages = getMessagesByChatId(chatId, episode);
	$: messages = allMessages.slice(0, progressIndex);
	$: nextMessage = allMessages[progressIndex]?.text ?? '';
	$: nextSide = allMessages[progressIndex]?.side ?? null;
	$: hasMore = progressIndex < allMessages.length;
	let typing = false;
	let typingTimer = null;

	const advance = async () => {
		if (!hasMore) return;
		progressIndex += 1;
		await progressStorage.setProgress({
			userId: 'local',
			chatId: chatId ?? '',
			episode,
			progressIndex,
			updatedAt: Date.now()
		});
	};

	$: if (browser && chatId) {
		loadProgress(chatId);
	}

	$: if (browser && hasMore && nextSide === 'left') {
		if (!typingTimer) {
			typing = true;
			typingTimer = setTimeout(async () => {
				typing = false;
				typingTimer = null;
				await advance();
			}, 1000);
		}
	} else if (typingTimer) {
		clearTimeout(typingTimer);
		typingTimer = null;
		typing = false;
	}

	$: if (browser) {
		const pendingScroll = messages.length;
		tick().then(() => {
			if (scrollEl && messages.length === pendingScroll) {
				scrollEl.scrollTop = scrollEl.scrollHeight;
			}
		});
	}
</script>

<svelte:head>
	<title>Chat</title>
	<meta name="description" content="Chat view" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex h-full flex-col gap-0">
	<div class="flex items-center gap-3 bg-black/60 px-3 py-2 shadow-xl backdrop-blur-md">
		<a
			href="/"
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
		<div>
			<p class="text-sm text-white/70">채팅</p>
			<p class="text-base font-semibold">{chat?.name ?? 'Unknown'}</p>
		</div>
	</div>

	<div class="flex-1 overflow-y-auto px-2 pt-0" bind:this={scrollEl}>
		<div class="relative min-h-full">
			<div class="pointer-events-none absolute inset-0 rounded-2xl bg-black/30 backdrop-blur-md"></div>
			<div class="relative min-h-full space-y-2 py-2">
				{#each messages as msg, i}
					{#if msg.side === 'left'}
						{#if i === 0 || messages[i - 1].side !== 'left'}
							<div class="flex items-start gap-2">
								<div class="-mt-1 h-10 w-10 rounded-full bg-white/20"></div>
								<div class="max-w-[72%]">
									<p class="mb-1 text-[11px] text-white/60">{chat?.name ?? 'Unknown'}</p>
									<div class="rounded-2xl rounded-tl-sm bg-emerald-400/30 px-2.5 py-1.5 text-[13px] text-white shadow-md shadow-black/20">
										{msg.text}
									</div>
								</div>
							</div>
						{:else}
							<div class="flex items-start gap-2">
								<div class="w-10"></div>
								<div class="max-w-[72%] rounded-2xl rounded-tl-sm bg-emerald-400/30 px-2.5 py-1.5 text-[13px] text-white shadow-md shadow-black/20">
									{msg.text}
								</div>
							</div>
						{/if}
					{:else}
						<div class="flex justify-end">
							<div class="max-w-[70%] rounded-2xl rounded-tr-sm bg-neutral-900/50 px-2.5 py-1.5 text-[13px] text-white shadow-md shadow-black/20">
								{msg.text}
							</div>
						</div>
					{/if}
				{/each}
				{#if typing && nextSide === 'left'}
					<div class="flex items-start gap-2">
						<div class="-mt-1 h-10 w-10 rounded-full bg-white/20"></div>
						<div class="max-w-[72%] rounded-2xl rounded-tl-sm bg-emerald-400/30 px-3 py-2 text-[13px] text-white shadow-md shadow-black/20">
							<span class="inline-flex items-center gap-1">
								<span class="h-1.5 w-1.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.2s] motion-safe:[animation-duration:0.9s]"></span>
								<span class="h-1.5 w-1.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.1s] motion-safe:[animation-duration:0.9s]"></span>
								<span class="h-1.5 w-1.5 rounded-full bg-white/80 animate-bounce motion-safe:[animation-duration:0.9s]"></span>
							</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="bg-black/60 px-3 py-3 shadow-xl backdrop-blur-md">
		<div class="flex items-center gap-2">
			<input
				type="text"
				placeholder={hasMore ? '다음 메시지를 확인하세요' : '대화가 끝났습니다'}
				value={nextMessage}
				readonly
				class="w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder-white/40 outline-none"
			/>
			<button
				class="rounded-full bg-white/20 px-3 py-2 text-sm disabled:opacity-40"
				on:click={advance}
				disabled={!hasMore || (nextSide === 'left' && typing)}
			>
				>>
			</button>
			<button
				class="rounded-full bg-white/10 px-3 py-2 text-xs text-white/70"
				on:click={() => {
					progressIndex = 0;
					progressStorage.setProgress({
						userId: 'local',
						chatId: chatId ?? '',
						episode,
						progressIndex,
						updatedAt: Date.now()
					});
				}}
			>
				reset
			</button>
		</div>
	</div>
</div>
