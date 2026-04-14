import { useFlow } from '@hooks/useFlow';
import { Ionicons } from '@expo/vector-icons';
import { IS_ANDROID } from '@constants/platform';
import { Pressable, Text, View } from 'react-native';
import { useLayoutEffect } from 'react';

const OnboardingQuiz = function () {
	const { go } = useFlow();

	useLayoutEffect(function () {
		go.setOptions({
			headerRight: () => IS_ANDROID ? undefined : <Pressable onPress={go.goBack}>
				<Ionicons
					name='close'
					size={26}
					className='text-black'
				/>
			</Pressable>
		});
	}, [go]);

	return <View className='px-5 flex-1 bg-white items-center pt-20'>
		<Text numberOfLines={3} className='text-3xl text-center'>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit.
		</Text>
		<Text
			numberOfLines={7}
			className='text-gray-400 text-base text-center mt-2'>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic inventore earum aliquid debitis sint veniam at quam tempora harum pariatur a ipsum provident accusantium accusamus, molestiae nobis nulla corrupti! Nostrum vero hic quas molestias veritatis quam a aperiam ullam laudantium sit voluptatem error eligendi iure corporis, explicabo velit, sed id! Labore aliquid laudantium explicabo, vero enim voluptatum, officia, obcaecati quam reiciendis harum assumenda perspiciatis. Assumenda aliquam doloremque non veniam corporis reprehenderit dignissimos quia magni error maiores earum, impedit obcaecati quibusdam mollitia dolorem saepe nulla quaerat dicta cumque sapiente quidem cupiditate ipsa reiciendis! Ducimus, ratione. Minus eligendi molestias odit sed saepe?
		</Text>
	</View>;
};

export default OnboardingQuiz;
