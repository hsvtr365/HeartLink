import { redirect } from '@sveltejs/kit';

export const POST = ({ cookies }) => {
	cookies.delete('google_link', { path: '/' });
	throw redirect(303, '/mypage/account');
};
