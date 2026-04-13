import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native"
//stack.replace("BottomRouter", {
//	screen: 'RouterNested',
//	params: {
//		screen: 'ScreeName'
//	}
//})
export function useFlow() {
	const go: NavigationProp<ParamListBase> = useNavigation()
	const stack = useNavigation<NativeStackNavigationProp<ParamListBase>>()

	return { go, stack }
}
