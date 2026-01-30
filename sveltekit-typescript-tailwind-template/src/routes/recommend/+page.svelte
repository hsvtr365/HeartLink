<script>
	import { onMount } from 'svelte';

	const profiles = [
		{
			name: 'Mia',
			tags: ['#상냥함', '#힐러'],
			gender: '여',
			description: '조용하지만 필요할 땐 누구보다 든든한 힐러.조용하지만 필요할 땐 누구보다 든든한 힐러.조용하지만 필요할 땐 누구보다 든든한 힐러.조용하지만 필요할 땐 누구보다 든든한 힐러.',
			color: 'bg-rose-400'
		},
		{
			name: 'Aria',
			tags: ['#리더', '#탱커'],
			gender: '여',
			description: '전장을 안정적으로 이끄는 든든한 리더 타입.',
			color: 'bg-orange-400'
		},
		{
			name: 'Luna',
			tags: ['#마법사', '#광역딜'],
			gender: '여',
			description: '화려한 스킬로 전장을 밝히는 마법사.',
			color: 'bg-emerald-400'
		},
		{
			name: 'Hana',
			tags: ['#암살자', '#고속'],
			gender: '여',
			description: '빠른 움직임과 순간 폭딜이 강점.',
			color: 'bg-sky-400'
		}
	];

	let index = 0;
	let x = 0;
	let y = 0;
	let dragging = false;
	let transitioning = false;
	let startX = 0;
	let startY = 0;
	let dismissX = 520;
	let fading = false;

	const threshold = 100;

	$: currentProfile = profiles[index];
	$: nextProfile = profiles[index + 1];

	onMount(() => {
		if (typeof window !== 'undefined') {
			dismissX = Math.max(520, Math.round(window.innerWidth * 1.2));
		}
	});

	const onPointerDown = (event) => {
		if (!currentProfile) return;
		dragging = true;
		transitioning = false;
		fading = false;
		event.currentTarget.setPointerCapture(event.pointerId);
		startX = event.clientX;
		startY = event.clientY;
		x = 0;
		y = 0;
	};

	const onPointerMove = (event) => {
		if (!dragging) return;
		x = event.clientX - startX;
		y = event.clientY - startY;
	};

	const onPointerUp = (event) => {
		if (!dragging) return;
		dragging = false;
		event.currentTarget.releasePointerCapture(event.pointerId);
		snapOrDismiss();
	};

	const advance = () => {
		index = Math.min(index + 1, profiles.length);
		x = 0;
		y = 0;
		transitioning = false;
		fading = false;
	};

	const snapOrDismiss = () => {
		transitioning = true;
		if (x > threshold) {
			x = dismissX;
			fading = true;
			setTimeout(advance, 450);
			return;
		}
		if (x < -threshold) {
			x = -dismissX;
			fading = true;
			setTimeout(advance, 450);
			return;
		}
		x = 0;
		y = 0;
		setTimeout(() => (transitioning = false), 450);
	};

	const swipeLeft = () => {
		if (transitioning || !currentProfile) return;
		x = -dismissX;
		fading = true;
		transitioning = true;
		setTimeout(advance, 450);
	};

	const swipeRight = () => {
		if (transitioning || !currentProfile) return;
		x = dismissX;
		fading = true;
		transitioning = true;
		setTimeout(advance, 450);
	};
</script>

<svelte:head>
	<title>Recommend</title>
	<meta name="description" content="Dating app style swipe UI" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex h-full flex-col gap-4 px-4">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-semibold">추천</h2>
		<span class="text-xs text-white/60">스와이프해서 선택</span>
	</div>

	<div class="relative flex-1">
		<div class="absolute inset-0 translate-y-2 rounded-3xl bg-white/5"></div>

		{#if nextProfile}
			<div class={`absolute inset-0 rounded-3xl ${nextProfile.color}`}>
				<div class="flex h-full flex-col justify-end p-6">
					<div>
						<p class="text-2xl font-semibold">{nextProfile.name}</p>
						<div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/80">
							{#each nextProfile.tags as tag}
								<span class="rounded-full bg-white/20 px-2 py-0.5">{tag}</span>
							{/each}
							<span>성별 {nextProfile.gender}</span>
						</div>
						<p class="mt-2 text-sm text-white/90 leading-relaxed break-words">
							{nextProfile.description}
						</p>
					</div>
				</div>
			</div>
		{/if}

		{#if currentProfile}
			<div class="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-6">
				<div
					class={`rounded-full px-3 py-1 text-xs ${
						x < -20 ? 'bg-white text-black opacity-100' : 'bg-white/20 text-white/70 opacity-0'
					}`}
					style={`transform: translateY(${x < -20 ? '0' : '8px'}); transition: opacity 200ms ease, transform 200ms ease;`}
				>
					싫어요
				</div>
				<div
					class={`rounded-full px-3 py-1 text-xs ${
						x > 20 ? 'bg-white text-black opacity-100' : 'bg-white/20 text-white/70 opacity-0'
					}`}
					style={`transform: translateY(${x > 20 ? '0' : '8px'}); transition: opacity 200ms ease, transform 200ms ease;`}
				>
					좋아요
				</div>
			</div>
		{/if}

		{#if currentProfile}
			{#key currentProfile.name}
				<div
					class={`absolute inset-0 z-10 rounded-3xl ${currentProfile.color} shadow-2xl select-none touch-none`}
					style={`transform: translate(${x}px, ${y}px) rotate(${x / 12}deg); transition: ${transitioning ? 'transform 450ms ease, opacity 450ms ease' : 'none'}; opacity: ${fading ? 0 : 1};`}
					on:pointerdown={onPointerDown}
					on:pointermove={onPointerMove}
					on:pointerup={onPointerUp}
					on:pointercancel={onPointerUp}
					on:pointerleave={onPointerUp}
				>
					<div class="flex h-full flex-col justify-end p-6">
					<div>
						<p class="text-2xl font-semibold">{currentProfile.name}</p>
						<div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/80">
							{#each currentProfile.tags as tag}
								<span class="rounded-full bg-white/20 px-2 py-0.5">{tag}</span>
							{/each}
							<span>성별 {currentProfile.gender}</span>
						</div>
						<p class="mt-2 text-sm text-white/90 leading-relaxed break-words">
							{currentProfile.description}
						</p>
					</div>
					</div>
				</div>
			{/key}
		{:else}
			<div class="absolute inset-0 flex items-center justify-center rounded-3xl border border-white/10 bg-white/5">
				<p class="text-sm text-white/70">더 이상 추천이 없습니다</p>
			</div>
		{/if}
	</div>

	<div class="flex items-center justify-between px-6">
		<button
			class="h-12 w-12 rounded-full border border-white/20 bg-white/10"
			on:click={swipeLeft}
			aria-label="Dislike"
			disabled={!currentProfile}
		>
			✕
		</button>
		<button
			class="h-12 w-12 rounded-full border border-white/20 bg-white/10"
			on:click={swipeRight}
			aria-label="Like"
			disabled={!currentProfile}
		>
			♥
		</button>
	</div>
</div>
