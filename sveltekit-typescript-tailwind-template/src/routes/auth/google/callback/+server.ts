import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

const encodeProfile = (profile: Record<string, unknown>) =>
	Buffer.from(JSON.stringify(profile)).toString('base64url');

export const GET = async ({ url, cookies, fetch }) => {
	const storedState = cookies.get('google_oauth_state');
	const returnedState = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	cookies.delete('google_oauth_state', { path: '/' });

	if (!storedState || !returnedState || storedState !== returnedState || !code) {
		throw redirect(303, '/mypage/account?error=oauth_state');
	}

	const clientId = env.GOOGLE_CLIENT_ID;
	const clientSecret = env.GOOGLE_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw redirect(303, '/mypage/account?error=missing_env');
	}

	const redirectUri = env.GOOGLE_REDIRECT_URI ?? `${url.origin}/auth/google/callback`;

	const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code'
		})
	});

	const tokenJson = await tokenResponse.json();

	if (!tokenResponse.ok || !tokenJson.access_token) {
		throw redirect(303, '/mypage/account?error=token_exchange');
	}

	const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
		headers: { Authorization: `Bearer ${tokenJson.access_token}` }
	});

	const profileJson = await profileResponse.json();

	if (!profileResponse.ok || !profileJson.sub) {
		throw redirect(303, '/mypage/account?error=profile_fetch');
	}

	const profile = {
		sub: profileJson.sub,
		email: profileJson.email ?? null,
		name: profileJson.name ?? null,
		picture: profileJson.picture ?? null
	};

	cookies.set('google_link', encodeProfile(profile), {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(303, '/mypage/account?linked=1');
};
