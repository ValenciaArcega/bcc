import { IS_LIQUID } from '@constants/platform';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { paletteAchromatic as pa } from '@constants/theme';
/**
 * This properties had to be used inside
 * the <Stack.Navigator to toogle the apperance
 * @property screenOptions={{
 * 	...headerTheme(isDarkMode)
 */
export const headerTheme = (isDarkMode: boolean) => {
	const baseConfig: NativeStackNavigationOptions = {
		headerTintColor: isDarkMode ? pa[0] : pa[1],
		headerTitleStyle: {
			color: isDarkMode ? pa[0] : pa[950]
		},
		headerLargeStyle: {
			backgroundColor: isDarkMode ? pa[950] : pa[0]
		},
		headerStyle: {
			backgroundColor: isDarkMode ? pa[950] : pa[0]
		},
	};

	if (IS_LIQUID) {
		return {
			...baseConfig,
			headerTransparent: true,
			headerLargeStyle: { backgroundColor: 'transparent' },
			headerStyle: { backgroundColor: 'transparent' },
		};
	}
	return baseConfig;
};
/// ...(IS_ANDROID ? {} : IS_MODAL)
export const IS_MODAL: NativeStackNavigationOptions = {
	presentation: 'modal',
	gestureEnabled: false,
};
