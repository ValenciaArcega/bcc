import Pressa from '@components/Pressa';
import { useFlow } from '@hooks/useFlow';
import { Ionicons } from '@expo/vector-icons';
import { hapticFeedback } from '@utils/haptics';
import { Image, Text, View } from 'react-native';

const ControlCenter = function () {
	const { go } = useFlow();

	return <View className='flex-1 items-center bg-white'>
		<Image
			className='w-72 h-44'
			resizeMode='contain'
			source={{ uri: 'https://baacc.mx/wp-content/uploads/2024/09/baacc-header-b.png' }}
		/>
		<Pressa
			className='mt-10 bg-lime-500 rounded-full w-[70%] max-w-[432px] flex-row gap-x-2 items-center justify-between px-4 h-14'
			onPress={() => {
				hapticFeedback('ultralight');
				go.navigate('SetNewMember');
			}}>
			<Text className='font-medium text-base text-white'>
				Nuevo Registro
			</Text>
			<Ionicons
				name='create-outline'
				size={20}
				className='text-white'
			/>
		</Pressa>

		<Pressa
			className='mt-6 bg-orange-400 rounded-full w-[70%] max-w-[432px] flex-row gap-x-2 items-center justify-between px-4 h-14'
			onPress={() => {
				hapticFeedback('ultralight');
				go.navigate('QuizKeynote', {
					isSoftware: true,
				});
			}}>
			<Text className='font-medium text-base text-white'>
				Quiz de Software
			</Text>
			<Ionicons
				name='code-outline'
				size={22}
				className='text-white'
			/>
		</Pressa>

		<Pressa
			className='mt-6 bg-blue-400 rounded-full w-[70%] max-w-[432px] flex-row gap-x-2 items-center justify-between px-4 h-14'
			onPress={() => {
				hapticFeedback('ultralight');
				go.navigate('QuizKeynote', {
					isSoftware: false,
				});
			}}>
			<Text className='font-medium text-base text-white'>
				Quiz de Automatización
			</Text>
			<Ionicons
				name='pulse-outline'
				size={22}
				className='text-white'
			/>
		</Pressa>

	</View>;
};

export default ControlCenter;
