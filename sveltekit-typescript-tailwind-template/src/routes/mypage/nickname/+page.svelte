<svelte:head>
	<title>Nickname</title>
	<meta name="description" content="Change nickname" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
	<p class="text-sm text-white/70">닉네임 변경</p>
	<div class="mt-3 flex items-center gap-2">
		<input
			type="text"
			placeholder="새 닉네임"
			class="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder-white/40 outline-none"
		/>
		<button class="rounded-xl bg-white/20 px-3 py-2 text-sm">저장</button>
	</div>
</div>
