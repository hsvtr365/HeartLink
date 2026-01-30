import chatsData from './chats.json';

export type ChatItem = {
	id: string;
	name: string;
	message: string;
	time: string;
};

let chats = chatsData as ChatItem[];

export const getChats = () => chats;
export const getChatById = (id: string) => chats.find((c) => c.id === id) ?? null;
export const setChats = (next: ChatItem[]) => {
	chats = next;
};
