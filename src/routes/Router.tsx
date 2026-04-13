import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SetNewMember from '@core/SetNewMember';
import ControlCenter from '@public/ControlCenter';
import QuizKeynote from '@core/QuizKeynote';

const Stack = createNativeStackNavigator();

const Router = function () {
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
				headerTitleStyle: {
					fontSize: 28,
				},
				gestureEnabled: false
			}} />
	</Stack.Navigator>;
};

export default Router;
