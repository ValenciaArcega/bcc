import "./global.css";
import Router from '@routes/Router';
import SplashScreenWrapper from '@views/SplashScreen';
import { Ionicons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      'color': 'color'
    } as Record<string, string>
  }
});

export default function App() {
  return <SplashScreenWrapper>
    <StatusBar barStyle='dark-content' animated />
    <NavigationContainer>
      <GestureHandlerRootView>
        <Router />
      </GestureHandlerRootView>
    </NavigationContainer>
  </SplashScreenWrapper>;
}
