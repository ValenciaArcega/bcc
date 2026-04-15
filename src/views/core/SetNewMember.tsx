import Pressa from '@components/Pressa';
import { gs } from '@constants/generalStyles';
import { twBtns } from '@utils/tw-ui';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { toastExeption } from '@utils/primitives/errors';
import { hapticFeedback } from '@utils/haptics';
import { ActivityIndicator, Image, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFlow } from '@hooks/useFlow';
import { REG_EMAIL } from '@constants/regex';

const SetNewMember = function () {
	const { go } = useFlow();

	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [isDone, setIsDone] = useState(false);

	const registerNewMember = async function () {
		try {
			hapticFeedback('light');
			if (!name || !name.trim())
				throw new Error(`00Ingresa tu nombre completo para poder continuar.`);
			if (!company || !company.trim())
				throw new Error(`00Ingresa la compañia para poder continuar.`);
			if (!email || !email.trim())
				throw new Error(`00Ingresa el correo electrónico para poder continuar.`);
			if (!email.match(REG_EMAIL))
				throw new Error(`00Asegúrate de ingresar un formato de correo válido.`);
			if (!phone || !phone.trim())
				throw new Error(`00Ingresa tu número de celular para poder continuar.`);

			setIsSending(true);
			const payload = {
				"nombre": name,
				"telefono": phone,
				"compania": company,
				"correo": email
			};
			const sendResponse = await fetch(`https://baacc.dyndns.org:8019/api/whatsapp/send`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});
			const sendPayload = await sendResponse.json();
			if (!sendPayload.ok)
				throw new Error(`01${sendPayload.message}`);
			setPhone('');
			setEmail('');
			setIsDone(true);
			Keyboard.dismiss();
		} catch (ex: any) {
			toastExeption(ex);
		} finally {
			setIsSending(false);
		}
	};

	return <ScrollView
		className='px-5 bg-white pt-8'
		style={gs.scroll}>
		<View className='justify-center w-full max-w-[500px] self-center mt-2'>
			<TextInput
				value={name}
				onChangeText={setName}
				autoFocus
				autoCapitalize='words'
				placeholder='Nombre Completo'
				placeholderTextColor='#333'
				className='mt-1 rounded-full border-2 border-gray-100 focus:border-lime-500 pl-4 pr-12 h-14'
				cursorColor='black'
				selectionColor='#bef264'
			/>
			<Ionicons
				name='person'
				size={20}
				className='absolute right-5 text-lime-600'
			/>
		</View>

		<View className='justify-center w-full max-w-[500px] self-center mt-4'>
			<TextInput
				value={company}
				onChangeText={setCompany}
				autoCapitalize='words'
				placeholder='Empresa / Puesto'
				placeholderTextColor='#333'
				className='mt-1 rounded-full border-2 border-gray-100 focus:border-blue-500 pl-4 pr-12 h-14'
				cursorColor='black'
				selectionColor='#60a5fa'
			/>
			<Ionicons
				name='briefcase'
				size={20}
				className='absolute right-5 text-blue-400'
			/>
		</View>

		<View className='justify-center w-full max-w-[500px] self-center mt-4'>
			<TextInput
				value={email}
				onChangeText={setEmail}
				autoCapitalize='none'
				keyboardType='email-address'
				inputMode='email'
				placeholder='Correo Electrónico'
				placeholderTextColor='#333'
				className='mt-1 rounded-full border-2 border-gray-100 focus:border-yellow-500 pl-4 pr-12 h-14'
				cursorColor='black'
				selectionColor='#facc15'
			/>
			<Ionicons
				name='mail'
				size={20}
				className='absolute right-5 text-yellow-400'
			/>
		</View>

		<View className='justify-center w-full max-w-[500px] self-center mt-4'>
			<TextInput
				value={phone}
				onChangeText={setPhone}
				autoCapitalize='none'
				maxLength={20}
				keyboardType='phone-pad'
				inputMode='numeric'
				placeholder='Número Telefónico'
				placeholderTextColor='#333'
				className='mt-1 rounded-full border-2 border-gray-100 focus:border-orange-500 pl-4 pr-12 h-14'
				cursorColor='black'
				selectionColor='#fb923c'
			/>
			<Ionicons
				name='call'
				size={20}
				className='absolute right-5 text-orange-400'
			/>
		</View>

		<Pressa
			disabled={isSending}
			onPress={registerNewMember}
			className={twBtns.baseAcrom}>
			{isSending
				? <ActivityIndicator className={twBtns.txtAcrom} />
				: <>
					<Ionicons
						name='checkmark-circle'
						size={20}
						color='white'
					/>
					<Text className={twBtns.txtAcrom}>
						Comenzar Quiz
					</Text>
				</>}
		</Pressa>

		<Modal transparent animationType="fade" visible={isDone}>
			<Pressable
				className='bg-black/50 items-center justify-center'
				style={[StyleSheet.absoluteFill, {
					backgroundColor: 'rgba(0,0,0,0.4)'
				}]}>
				<View className='rounded-[32px] max-w-[96%] bg-white p-5'>
					<Pressable onPress={() => setIsDone(false)} className='self-end'>
						<Ionicons
							name='close-outline'
							size={30}
							color='black'
						/>
					</Pressable>
					<Ionicons
						name='checkmark-circle'
						className='text-green-600 self-center'
						size={24}
					/>
					<Text className='text-center text-gray-400 font-medium'>
						¡Fantástico registro éxitoso!
					</Text>
					<Text className='mt-5 text-center text-3xl font-semibold'>
						¿Cúal es tu área de especialización?
					</Text>
					<View className='flex-row items-center justify-between gap-4 flex-wrap pt-8'>
						<Pressa
							outerScale={0.9}
							className='bg-gray-100 border border-gray-200 rounded-3xl w-[332px] gap-y-2 items-center justify-between p-4'
							onPress={() => {
								hapticFeedback('ultralight');
								go.navigate('QuizKeynote', {
									isSoftware: true,
								});
								setIsDone(false);
							}}>
							<View className='h-44 w-64'>
								<Image
									resizeMode='contain'
									className='w-full h-full'
									source={require("@/assets/images/utils/software.png")}
								/>
							</View>
							<Text className='font-medium text-xl text-black'>
								Desarrollo de Software
							</Text>
						</Pressa>

						<Pressa
							outerScale={0.9}
							className='bg-gray-100 border border-gray-200 rounded-3xl w-[332px] gap-y-2 items-center justify-between p-4'
							onPress={() => {
								hapticFeedback('ultralight');
								go.navigate('QuizKeynote', {
									isSoftware: false,
								});
								setIsDone(false);
							}}>
							<View className='h-44 w-64'>
								<Image
									resizeMode='contain'
									className='w-full h-full'
									source={require("@/assets/images/utils/automation.png")}
								/>
							</View>
							<Text className='font-medium text-xl text-black'>
								Automatización & Robótica
							</Text>
						</Pressa>
					</View>
				</View>
			</Pressable>
		</Modal>

	</ScrollView>;
};

export default SetNewMember;
