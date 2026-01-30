export type ChatMessage = {
	side: 'left' | 'right';
	text: string;
};

type MessagesMap = Record<string, ChatMessage[]>;

const messageFiles = import.meta.glob('./messages/*.json', { eager: true });

const loadMessages = () => {
	const map: MessagesMap = {};
	for (const [path, mod] of Object.entries(messageFiles)) {
		const match = path.match(/messages\/(.+)\.json$/);
		if (!match) continue;
		const key = match[1];
		const data = (mod as { default: ChatMessage[] }).default;
		map[key] = Array.isArray(data) ? data : [];
	}
	return map;
};

let messages = loadMessages();

const makeKey = (chatId: string, episode: number) => `${chatId}_${episode}`;

export const getMessagesByChatId = (chatId: string, episode: number) =>
	messages[makeKey(chatId, episode)] ?? [];
export const setMessagesByChatId = (chatId: string, episode: number, next: ChatMessage[]) => {
	messages[makeKey(chatId, episode)] = next;
};
export const addMessage = (chatId: string, episode: number, message: ChatMessage) => {
	const key = makeKey(chatId, episode);
	if (!messages[key]) messages[key] = [];
	messages[key].push(message);
};
