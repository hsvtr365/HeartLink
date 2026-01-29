<svelte:head>
	<title>My Page</title>
	<meta name="description" content="My page settings" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="bg-black/60 p-4 shadow-xl backdrop-blur-md">
	<div class="flex items-center gap-4">
		<div class="h-14 w-14 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-lg"></div>
		<div>
			<p class="text-sm text-white/70">닉네임</p>
			<p class="text-lg font-semibold">LG</p>
		</div>
	</div>
</div>

<div class="mt-4 bg-black/60 p-4 shadow-xl backdrop-blur-md">
	<p class="text-sm text-white/70">설정</p>
	<div class="mt-3 divide-y divide-white/10">
		<a class="flex w-full items-center justify-between py-3 text-left" href="/mypage/nickname">
			<span>닉네임 변경</span>
			<span class="text-white/40">›</span>
		</a>
		<a class="flex w-full items-center justify-between py-3 text-left" href="/mypage/customize">
			<span>캐릭터 커스텀</span>
			<span class="text-white/40">›</span>
		</a>
		<a class="flex w-full items-center justify-between py-3 text-left" href="/mypage/account">
			<span>계정 관리 (구글 / 애플)</span>
			<span class="text-white/40">›</span>
		</a>
		<a class="flex w-full items-center justify-between py-3 text-left" href="/mypage/contact">
			<span>문의</span>
			<span class="text-white/40">›</span>
		</a>
		<a class="flex w-full items-center justify-between py-3 text-left" href="/mypage/terms">
			<span>약관 / 앱 정보</span>
			<span class="text-white/40">›</span>
		</a>
	</div>
</div>
