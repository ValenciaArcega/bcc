import { Alert } from 'react-native';
import { ERR_SERVER, ERR_TITLE } from '@constants/labels';

export const toastExeption = function (ex: any) {
	if (/^(00|01|02)/.test(String(ex.message).trimStart()))
		Alert.alert(ERR_TITLE, String(ex.message).slice(2));
	else Alert.alert(ERR_TITLE, ERR_SERVER);
};
