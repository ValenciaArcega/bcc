const IS_SANDBOX = true;

const URI_API_DEBUG = 'http://192.168.100.184:5046/api/';
const URI_API_SANDBOX = process.env.EXPO_PUBLIC_API_URL;

export const API_URL = IS_SANDBOX
	? URI_API_SANDBOX
	: URI_API_DEBUG;
