import { ReactNode, useState } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PressaProps extends AnimatedProps<PressableProps> {
	innerScale?: number;
	isInner?: boolean;
	outerScale?: number;
	children: ReactNode;
}

const Pressa = ({
	children,
	innerScale = 0.91,
	isInner,
	outerScale = 1.10,
	style,
	...restProps }: PressaProps) => {
	const [isPressed, setIsPressed] = useState(false);

	return (
		<AnimatedPressable
			onLongPress={() => setIsPressed(true)}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			style={[style, {
				transform: [{
					scale: isPressed ? (isInner ? innerScale : outerScale) : 1,
				}],
				transitionProperty: 'transform',
				transitionDuration: '200ms',
			}]}
			{...restProps}>
			{children}
		</AnimatedPressable>
	);
};

export default Pressa;
