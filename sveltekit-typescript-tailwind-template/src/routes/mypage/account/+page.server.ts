import type { PageServerLoad } from './$types';

const decodeProfile = (raw: string) => {
	try {
		const json = Buffer.from(raw, 'base64url').toString('utf8');
		return JSON.parse(json);
	} catch {
		return null;
	}
};

export const load: PageServerLoad = ({ cookies }) => {
	const raw = cookies.get('google_link');

	if (!raw) {
		return { googleLinked: false, googleProfile: null };
	}

	const profile = decodeProfile(raw);

	if (!profile) {
		return { googleLinked: false, googleProfile: null };
	}

	return { googleLinked: true, googleProfile: profile };
};
