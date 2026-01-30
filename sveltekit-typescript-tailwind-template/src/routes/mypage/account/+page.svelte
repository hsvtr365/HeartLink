<svelte:head>
	<title>Account</title>
	<meta name="description" content="Account management" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
	<p class="text-sm text-white/70">계정 관리</p>
	<div class="mt-3 space-y-3">
		<div class="rounded-xl border border-white/10 bg-white/5 p-3">
			<div class="flex items-start justify-between gap-4">
				<div>
					<p class="text-sm font-semibold text-white">구글 계정</p>
					{#if data.googleLinked}
						<p class="mt-1 text-xs text-white/70">
							연동됨 · {data.googleProfile?.email ?? '이메일 없음'}
						</p>
					{:else}
						<p class="mt-1 text-xs text-white/60">연동하면 다른 기기에서도 계정을 복구할 수 있어요.</p>
					{/if}
				</div>
				{#if data.googleLinked}
					<form method="post" action="/auth/google/unlink">
						<button
							class="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/80"
						>
							연동 해제
						</button>
					</form>
				{:else}
					<a
						href="/auth/google"
						class="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black"
					>
						구글 계정 연동
					</a>
				{/if}
			</div>
			{#if data.googleLinked && data.googleProfile?.name}
				<p class="mt-2 text-xs text-white/60">표시 이름: {data.googleProfile.name}</p>
			{/if}
		</div>

		<div class="rounded-xl border border-white/10 bg-white/5 p-3 opacity-60">
			<p class="text-sm font-semibold text-white">애플 계정</p>
			<p class="mt-1 text-xs text-white/60">준비 중</p>
		</div>
	</div>
</div>
