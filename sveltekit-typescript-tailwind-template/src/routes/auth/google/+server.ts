import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
	const clientId = env.GOOGLE_CLIENT_ID;
	const clientSecret = env.GOOGLE_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw error(500, 'Missing Google OAuth env variables.');
	}

	const redirectUri = env.GOOGLE_REDIRECT_URI ?? `${url.origin}/auth/google/callback`;
	const state = crypto.randomUUID();

	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		secure: !dev,
		maxAge: 60 * 10
	});

	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: 'openid email profile',
		state
	});

	throw redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
};
