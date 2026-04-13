import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { ReactNode, useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 500,
	fade: true,
});

const SplashScreenWrapper = function ({ children }: { children: ReactNode; }) {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(function () {
		sugarDelay();
	}, []);

	const sugarDelay = async function () {
		try {
			await new Promise(resolve => setTimeout(resolve, 100));
		} finally {
			setAppIsReady(true);
		}
	};

	const onLayoutRootView = useCallback(() => {
		if (appIsReady) SplashScreen.hide();
	}, [appIsReady]);

	if (!appIsReady) return null;

	return <View className='flex-1' onLayout={onLayoutRootView}>
		{children}
	</View>;
};

export default SplashScreenWrapper;
