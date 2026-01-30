import { json } from '@sveltejs/kit';

const decodeProfile = (raw: string) => {
	try {
		const data = Buffer.from(raw, 'base64url').toString('utf8');
		return JSON.parse(data);
	} catch {
		return null;
	}
};

export const GET = ({ cookies }) => {
	const raw = cookies.get('google_link');

	if (!raw) {
		return json({ linked: false, profile: null });
	}

	const profile = decodeProfile(raw);

	if (!profile) {
		return json({ linked: false, profile: null });
	}

	return json({ linked: true, profile });
};
