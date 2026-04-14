import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SetNewMember from '@core/SetNewMember';
import ControlCenter from '@public/ControlCenter';
import QuizKeynote from '@core/QuizKeynote';
import OnboardingQuiz from '@core/OnboardingQuiz';
import { IS_ANDROID } from '../constants/platform';

const Stack = createNativeStackNavigator();

const RouterRoot = function () {
	return <Stack.Navigator
		initialRouteName='ControlCenter'>
		<Stack.Screen
			name="ControlCenter"
			component={ControlCenter}
			options={{
				headerTitle: 'Centro de Control',
				headerTitleStyle: {
					fontSize: 28,
				}
			}} />
		<Stack.Screen
			name="SetNewMember"
			component={SetNewMember}
			options={{
				headerTitle: 'Nuevo Registro',
				headerTitleStyle: {
					fontSize: 28,
				}
			}} />
		<Stack.Screen
			name="QuizKeynote"
			component={QuizKeynote}
			options={{
				headerTitle: 'Quiz',
				gestureEnabled: false,
				headerTitleStyle: {
					fontSize: 28,
				},
			}} />

		<Stack.Screen
			name='OnboardingQuiz'
			component={OnboardingQuiz}
			options={{
				headerShown: !IS_ANDROID,
				...(IS_ANDROID ? {
					presentation: 'formSheet',
					sheetCornerRadius: 32,
					sheetAllowedDetents: [0.5, 0.9]
				} : {
					presentation: 'modal',
					gestureEnabled: false
				})
			}}
		/>
	</Stack.Navigator>;
};

export default RouterRoot;
