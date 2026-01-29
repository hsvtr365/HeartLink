<script>
	import { getContext } from 'svelte';

	const chatSearch = getContext('chatSearch');
	const chats = [
		{ name: 'Game room', message: 'I will be online at 9 PM', time: '8:12 PM' },
		{ name: 'Support', message: 'Bug fix has been completed', time: '6:40 PM' },
		{ name: 'Luna', message: '오늘 저녁에 같이 할래?', time: '5:22 PM' },
		{ name: 'Theo', message: '새 캐릭터 나왔어', time: '4:10 PM' },
		{ name: 'Mia', message: '지금 접속 가능?', time: '3:05 PM' },
		{ name: 'Kira', message: '퀘스트 보상 확인해줘', time: '1:18 PM' },
		{ name: 'Hana', message: '채팅방 링크 보냈어', time: '11:47 AM' },
		{ name: 'Rex', message: '오늘 업데이트 봤어?', time: '9:30 AM' },
		{ name: 'Aria', message: '캐릭터 스킨 바꿔볼까?', time: '9:05 AM' },
		{ name: 'Noah', message: '점심 전에 한 판?', time: '8:50 AM' },
		{ name: 'Bella', message: '새 퀘스트 떴어', time: '8:33 AM' },
		{ name: 'Juno', message: '이벤트 보상 챙겨!', time: '8:10 AM' },
		{ name: 'Eden', message: '파티 초대 보냈어', time: '7:55 AM' },
		{ name: 'Zoe', message: '오늘 접속할게', time: '7:40 AM' },
		{ name: 'Aiden', message: '보스 공략 같이?', time: '7:25 AM' },
		{ name: 'Fiona', message: '랭킹 올랐어!', time: '7:10 AM' },
		{ name: 'Owen', message: '업데이트 노트 봤어?', time: '6:55 AM' },
		{ name: 'Iris', message: '아이템 교환 가능?', time: '6:40 AM' },
		{ name: 'Daisy', message: '길드 모집 중', time: '6:20 AM' },
		{ name: 'Theo 2', message: '테스트 메시지', time: '6:05 AM' },
		{ name: 'Mia 2', message: '테스트 메시지', time: '5:50 AM' },
		{ name: 'Kira 2', message: '테스트 메시지', time: '5:35 AM' },
		{ name: 'Hana 2', message: '테스트 메시지', time: '5:20 AM' },
		{ name: 'Rex 2', message: '테스트 메시지', time: '5:05 AM' },
		{ name: 'Luna 2', message: '테스트 메시지', time: '4:50 AM' },
		{ name: 'Aria 2', message: '테스트 메시지', time: '4:35 AM' },
		{ name: 'Noah 2', message: '테스트 메시지', time: '4:20 AM' }
	];

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
					<div class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-full bg-white/20"></div>
						<div class="flex-1">
							<p class="text-sm font-semibold">
								{@html highlight(chat.name, query)}
							</p>
							<p class="text-xs text-white/60">{chat.message}</p>
						</div>
						<span class="text-xs text-white/50">{chat.time}</span>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
