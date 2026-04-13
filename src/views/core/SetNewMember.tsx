import Pressa from '@components/Pressa';
import { gs } from '@constants/generalStyles';
import { twBtns } from '@utils/tw-ui';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';

const SetNewMember = function () {
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [isSending, setIsSending] = useState(false);

	return <ScrollView
		className='px-5 bg-white pt-8'
		style={gs.scroll}>
		<View className='justify-center mt-2'>
			<TextInput
				value={name}
				onChangeText={setName}
				autoFocus
				autoCapitalize='words'
				placeholder='Nombre Completo'
				placeholderTextColor='#333'
				className='mt-1 rounded-full border-2 border-gray-100 focus:border-green-500 pl-4 pr-12 h-14'
				cursorColor='black'
				selectionColor='#bef264'
			/>
			<Ionicons
				name='person'
				size={20}
				className='absolute right-5 text-green-600'
			/>
		</View>

		<View className='justify-center mt-4'>
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

		<View className='justify-center mt-4'>
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

		<View className='justify-center mt-4'>
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

		<Pressa className={twBtns.baseAcrom}>
			{isSending
				? <ActivityIndicator className={twBtns.txtAcrom} />
				: <>
					<Ionicons
						name='checkmark-circle'
						size={20}
						color='white'
					/>
					<Text className={twBtns.txtAcrom}>
						Enviar Token
					</Text>
				</>}
		</Pressa>

	</ScrollView>;
};

export default SetNewMember;
