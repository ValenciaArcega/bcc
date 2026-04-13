import Pressa from '@/src/components/Pressa';
import { useFlow } from '@/src/hooks/useFlow';
import { hapticFeedback } from '@/src/utils/haptics';
import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';

interface IQuestion {
	answers: {
		id: number;
		name: string;
	}[];
	description: string;
	id: number;
	isAnswered: boolean;
	rightAnswer: number;
}

const ControlCenter = function () {
	const { go } = useFlow();

	return <View className='flex-1 items-center bg-white'>
		<Image
			className='w-72 h-44'
			resizeMode='contain'
			source={{ uri: 'https://baacc.mx/wp-content/uploads/2024/09/baacc-header-b.png' }}
		/>
		<Pressa
			className='mt-10 bg-green-500 rounded-full px-5 self-center flex-row gap-x-2 items-center justify-center h-14'
			onPress={() => {
				hapticFeedback('ultralight');
				go.navigate('SetNewMember');
			}}>
			<Ionicons
				name='create-outline'
				size={22}
				className='text-white'
			/>
			<Text className='font-medium text-base text-white'>
				Nuevo Registro
			</Text>
		</Pressa>

		<Pressa
			className='mt-6 bg-orange-400 rounded-full px-5 self-center flex-row gap-x-2 items-center justify-center h-14'
			onPress={() => {
				hapticFeedback('ultralight');
				go.navigate('QuizKeynote', {
					isSoftware: true,
				});
			}}>
			<Ionicons
				name='code-outline'
				size={22}
				className='text-white'
			/>
			<Text className='font-medium text-base text-white'>
				Quiz de Software
			</Text>
		</Pressa>

		<Pressa
			className='mt-6 bg-blue-400 rounded-full px-5 self-center flex-row gap-x-2 items-center justify-center h-14'
			onPress={() => {
				hapticFeedback('ultralight');
				go.navigate('QuizKeynote', {
					isSoftware: false,
				});
			}}>
			<Ionicons
				name='code-outline'
				size={22}
				className='text-white'
			/>
			<Text className='font-medium text-base text-white'>
				Quiz de Automatización
			</Text>
		</Pressa>

	</View>;
};

export default ControlCenter;
