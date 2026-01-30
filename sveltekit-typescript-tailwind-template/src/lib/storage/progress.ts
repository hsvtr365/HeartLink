export type ProgressRecord = {
	userId: string;
	chatId: string;
	episode: number;
	progressIndex: number;
	updatedAt: number;
};

export interface ProgressStorage {
	getProgress: (userId: string, chatId: string, episode: number) => Promise<ProgressRecord | null>;
	setProgress: (record: ProgressRecord) => Promise<void>;
}

const DB_NAME = 'my_game_app_001';
const DB_VERSION = 1;
const STORE_NAME = 'progress';

const openDb = () =>
	new Promise<IDBDatabase>((resolve, reject) => {
		if (typeof indexedDB === 'undefined') {
			reject(new Error('indexedDB is not available.'));
			return;
		}

		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
				store.createIndex('by_user', 'userId', { unique: false });
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB.'));
	});

const withStore = async <T>(mode: IDBTransactionMode, handler: (store: IDBObjectStore) => IDBRequest<T>) => {
	const db = await openDb();
	return new Promise<T>((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, mode);
		const store = tx.objectStore(STORE_NAME);
		const request = handler(store);

		request.onsuccess = () => resolve(request.result as T);
		request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed.'));
		tx.oncomplete = () => db.close();
		tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed.'));
	});
};

const makeKey = (userId: string, chatId: string, episode: number) =>
	`${userId}:${chatId}:${episode}`;

export const indexedDbProgressStorage: ProgressStorage = {
	getProgress: async (userId, chatId, episode) => {
		const key = makeKey(userId, chatId, episode);
		const result = await withStore<{
			key: string;
			userId: string;
			chatId: string;
			episode: number;
			progressIndex: number;
			updatedAt: number;
		} | null>('readonly', (store) => store.get(key));
		if (!result) return null;
		return {
			userId: result.userId,
			chatId: result.chatId,
			episode: result.episode,
			progressIndex: result.progressIndex,
			updatedAt: result.updatedAt
		};
	},
	setProgress: async (record) => {
		const key = makeKey(record.userId, record.chatId, record.episode);
		await withStore('readwrite', (store) =>
			store.put({
				key,
				userId: record.userId,
				chatId: record.chatId,
				episode: record.episode,
				progressIndex: record.progressIndex,
				updatedAt: record.updatedAt
			})
		);
	}
};
