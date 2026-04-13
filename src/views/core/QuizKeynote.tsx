import Pressa from '@/src/components/Pressa';
import { gs } from '@/src/constants/generalStyles';
import { ERR_TITLE } from '@/src/constants/labels';
import { hapticFeedback } from '@/src/utils/haptics';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, BackHandler } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

interface IQuestion {
	answers: {
		id: number;
		name: string;
	}[];
	description: string;
	id: number;
	isAnswered: boolean;
	rightAnswer: number;
	selectedAnswer?: number;
}

// const shuffle = <T,>(arr: T[]): T[] =>
// 	[...arr].sort(() => Math.random() - 0.5);
const shuffle = <T,>(arr: T[]): T[] => {
	const result = [...arr];
	for (let i = result.length - 1;i > 0;i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
};

const QuizKeynote = function ({ route }: any) {
	const props: { isSoftware: boolean; } = route.params;
	const [sessionQuestions, setSessionQuestions] = useState<IQuestion[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [finished, setFinished] = useState(false);

	useEffect(() => {
		const session = shuffle(props.isSoftware ? HC_QUESTIONS : HC_QUESTIONS_AUTO)
			.slice(0, 4)
			.map((q) => ({ ...q }));
		setSessionQuestions(session);
	}, []);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
		return () => backHandler.remove();
	}, []);

	const currentQuestion = sessionQuestions[currentIndex];

	const handleNext = () => {
		hapticFeedback('rigid');
		if (selectedAnswer === null) {
			Alert.alert(ERR_TITLE, 'Asegúrate de seleccionar una respuesta para continuar.');
			return;
		};

		const updated = [...sessionQuestions];
		updated[currentIndex] = {
			...updated[currentIndex],
			isAnswered: true,
			selectedAnswer,
		};

		setSessionQuestions(updated);
		setSelectedAnswer(null);

		if (currentIndex < 3) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			setFinished(true);
		}
	};

	const correctAnswers = useMemo(() => {
		return sessionQuestions.filter(
			(q) => q.selectedAnswer === q.rightAnswer
		).length;
	}, [sessionQuestions]);

	if (!currentQuestion && !finished) return null;

	if (finished) {
		const getRankingData = () => {
			if (correctAnswers === 4) {
				return {
					label: "Expert",
					image: require("@/assets/images/butterfly-trophy.png"),
				};
			}
			if (correctAnswers >= 3) {
				return {
					label: "Advanced",
					image: require("@/assets/images/butterfly-medal.png"),
				};
			}
			if (correctAnswers >= 2) {
				return {
					label: "Intermediate",
					image: require("@/assets/images/butterfly-thinking.png"),
				};
			}
			return {
				label: "Beginner",
				image: require("@/assets/images/butterfly-tired.png"),
			};
		};

		const { label, image } = getRankingData();

		return (
			<ScrollView
				className='px-3 bg-white'
				contentContainerStyle={{
					alignItems: 'center',
					paddingBottom: 132
				}}
				style={gs.scroll}>
				<Animated.View
					entering={FadeInDown.duration(500)}
					style={{
						marginTop: 24,
						width: 232,
						height: 240,
					}}>
					<Image
						resizeMode='contain'
						className='w-full h-full'
						source={image}
					/>
				</Animated.View>
				<Text className='font-semibold text-4xl tracking-tighter text-center'>
					{label}
				</Text>

				<Text className='mt-2 text-lg text-gray-400'>
					Puntuación: <Text className=''>
						{correctAnswers} / 4
					</Text>
				</Text>

				<View className="mt-8 w-full">
					{sessionQuestions.map((q, index) => (
						<View key={q.id} className="mb-3 p-4 rounded-3xl border border-gray-100">
							<Text className="font-semibold mb-2">
								{index + 1}. {q.description}
							</Text>

							{q.answers.map((a) => {
								const isSelected = a.id === q.selectedAnswer;
								const isRight = a.id === q.rightAnswer;

								let textStyle = "text-gray-700";

								if (isRight) textStyle = "text-green-600";
								if (isSelected && !isRight)
									textStyle = "text-red-600";

								return (
									<View className={`rounded-full border flex-row justify-between ${isRight
										? 'mt-1 py-1 px-2 border-green-100 bg-green-50'
										: (isSelected && !isRight)
											? 'mt-1 py-1 px-2 border-red-100 bg-red-50'
											: 'border-transparent bg-transparent'
										}`}>
										<Text key={a.id} className={`${textStyle} ml-2`}>
											• {a.name}
										</Text>
										{isRight
											? <Ionicons
												name='checkmark-circle'
												size={16}
												className='text-green-500'
											/>
											: (isSelected && !isRight)
												? <Ionicons
													name='close-circle'
													size={16}
													className='text-red-500'
												/> : null}
									</View>
								);
							})}
						</View>
					))}
				</View>

				<View className='items-center mt-20'>
					<Ionicons
						name='checkmark-circle'
						size={24}
						className='text-green-500'
					/>
					<Text className='text-center text-base'>
						¡Gracias por participar!
					</Text>
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView
			className='px-4 bg-white'
			contentContainerStyle={{
				alignItems: 'center',
				paddingBottom: 164
			}}
			style={[gs.scroll]}>
			<Text style={styles.progress}>
				Pregunta {currentIndex + 1} / 4
			</Text>

			<Text style={styles.question}>{currentQuestion.description}</Text>

			<View style={styles.answersContainer}>
				{currentQuestion.answers.map((a) => (
					<Pressa
						isInner
						key={a.id}
						style={[
							styles.answerButton,
							selectedAnswer === a.id && styles.answerSelected,
						]}
						onPress={() => setSelectedAnswer(a.id)}
					>
						<Text style={[styles.answerText, {
							color: selectedAnswer === a.id ? 'white' : 'black'
						}]}>
							{a.name}
						</Text>
					</Pressa>
				))}
			</View>

			<Pressa className='bg-black px-4 self-center rounded-full h-14 items-center flex-row gap-x-2 mt-16 justify-center' onPress={handleNext}>
				{currentIndex == 3 && <Ionicons
					name='checkmark-circle'
					size={20}
					color='white'
				/>}
				<Text style={styles.nextText}>
					{currentIndex === 3 ? "Terminar & Enviar" : "Siguiente Pregunta"}
				</Text>
				{currentIndex !== 3 && <Ionicons
					name='arrow-forward-outline'
					size={20}
					color='white'
				/>}
			</Pressa>
		</ScrollView>
	);
};

export default QuizKeynote;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: "center",
		paddingHorizontal: 20,
	},
	progress: {
		marginTop: 64,
		fontSize: 18,
		marginBottom: 6,
		color: '#9ca3af'
	},
	question: {
		fontSize: 24,
		textAlign: "center",
		marginBottom: 30,
	},
	answersContainer: {
		width: "100%",
		gap: 12,
	},
	answerButton: {
		padding: 12,
		borderRadius: 50,
		backgroundColor: "#eee",
	},
	answerSelected: {
		backgroundColor: "#3b82f6",
	},
	answerText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: 500
	},
	nextText: {
		color: "#fff",
		fontSize: 18,
	},
	title: {
		fontSize: 28,
		marginBottom: 20,
	},
});

const HC_QUESTIONS: IQuestion[] = [
	{
		id: 1,
		description: "¿Qué significa HTTP?",
		answers: [
			{ id: 1, name: "Protocolo de Transferencia de Hipertexto" },
			{ id: 2, name: "Protocolo de Texto de Alta Transferencia" },
			{ id: 3, name: "Proceso de Transferencia de Hipertexto" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 2,
		description: "¿Qué lenguaje se usa principalmente para estilos web?",
		answers: [
			{ id: 1, name: "HTML" },
			{ id: 2, name: "CSS" },
			{ id: 3, name: "Python" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 3,
		description: "¿Qué significa SQL?",
		answers: [
			{ id: 1, name: "Lenguaje de Consulta Estructurado" },
			{ id: 2, name: "Lógica de Consulta Simple" },
			{ id: 3, name: "Lenguaje de Consulta Secuencial" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 4,
		description: "¿Qué empresa desarrolló Java?",
		answers: [
			{ id: 1, name: "Microsoft" },
			{ id: 2, name: "Sun Microsystems" },
			{ id: 3, name: "Google" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 5,
		description: "¿Qué significa API?",
		answers: [
			{ id: 1, name: "Interfaz de Programación de Aplicaciones" },
			{ id: 2, name: "Integración Avanzada de Programas" },
			{ id: 3, name: "Interfaz de Proceso de Aplicaciones" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 6,
		description: "¿Qué estructura de datos usa FIFO?",
		answers: [
			{ id: 1, name: "Pila (Stack)" },
			{ id: 2, name: "Cola (Queue)" },
			{ id: 3, name: "Árbol (Tree)" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 7,
		description: "¿Qué protocolo se usa para navegación web segura?",
		answers: [
			{ id: 1, name: "HTTP" },
			{ id: 2, name: "FTP" },
			{ id: 3, name: "HTTPS" },
		],
		rightAnswer: 3,
		isAnswered: false,
	},
	{
		id: 8,
		description: "¿Qué lenguaje se usa para desarrollo Android?",
		answers: [
			{ id: 1, name: "Kotlin" },
			{ id: 2, name: "Swift" },
			{ id: 3, name: "Ruby" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 9,
		description: "¿Qué rastrea principalmente Git?",
		answers: [
			{ id: 1, name: "Versiones de archivos" },
			{ id: 2, name: "Tráfico de red" },
			{ id: 3, name: "Uso de CPU" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 10,
		description: "¿Cuál es una base de datos NoSQL?",
		answers: [
			{ id: 1, name: "MySQL" },
			{ id: 2, name: "MongoDB" },
			{ id: 3, name: "PostgreSQL" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 11,
		description: "¿Qué significa CPU?",
		answers: [
			{ id: 1, name: "Unidad Central de Procesamiento" },
			{ id: 2, name: "Unidad de Procesamiento de Computadora" },
			{ id: 3, name: "Utilidad Central de Programa" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 12,
		description: "¿Cuál se usa para control de versiones?",
		answers: [
			{ id: 1, name: "Docker" },
			{ id: 2, name: "Git" },
			{ id: 3, name: "Jenkins" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 13,
		description: "¿Qué palabra clave declara una constante en JavaScript?",
		answers: [
			{ id: 1, name: "var" },
			{ id: 2, name: "let" },
			{ id: 3, name: "const" },
		],
		rightAnswer: 3,
		isAnswered: false,
	},
	{
		id: 14,
		description: "¿Qué empresa creó React?",
		answers: [
			{ id: 1, name: "Google" },
			{ id: 2, name: "Facebook" },
			{ id: 3, name: "Amazon" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 15,
		description: "¿Qué método HTTP se usa para obtener datos?",
		answers: [
			{ id: 1, name: "POST" },
			{ id: 2, name: "GET" },
			{ id: 3, name: "PUT" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 16,
		description: "¿Cuál es la extensión de un archivo TypeScript?",
		answers: [
			{ id: 1, name: ".ts" },
			{ id: 2, name: ".js" },
			{ id: 3, name: ".tsx?" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 17,
		description: "¿Cuál es un framework de frontend?",
		answers: [
			{ id: 1, name: "React" },
			{ id: 2, name: "Node.js" },
			{ id: 3, name: "Express" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 18,
		description: "¿Qué herramienta se usa para contenerización?",
		answers: [
			{ id: 1, name: "Docker" },
			{ id: 2, name: "Git" },
			{ id: 3, name: "NPM" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
	{
		id: 19,
		description: "¿Cuál NO es un lenguaje de programación?",
		answers: [
			{ id: 1, name: "Python" },
			{ id: 2, name: "HTML" },
			{ id: 3, name: "Java" },
		],
		rightAnswer: 2,
		isAnswered: false,
	},
	{
		id: 20,
		description: "¿Qué significa RAM?",
		answers: [
			{ id: 1, name: "Memoria de Acceso Aleatorio" },
			{ id: 2, name: "Memoria de Lectura de Acceso" },
			{ id: 3, name: "Memoria de Acción Rápida" },
		],
		rightAnswer: 1,
		isAnswered: false,
	},
];

const HC_QUESTIONS_AUTO: IQuestion[] = [
	{
		id: 1,
		description: "¿Qué es un PLC?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Un tipo de sensor" },
			{ id: 2, name: "Un controlador lógico programable" },
			{ id: 3, name: "Un motor eléctrico" },
			{ id: 4, name: "Un software de diseño" },
		],
	},
	{
		id: 2,
		description: "¿Qué lenguaje es común en PLC?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Python" },
			{ id: 2, name: "Ladder" },
			{ id: 3, name: "Java" },
			{ id: 4, name: "C#" },
		],
	},
	{
		id: 3,
		description: "¿Qué significa SCADA?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Sistema de Control Automático Digital Avanzado" },
			{ id: 2, name: "Supervisión, Control y Adquisición de Datos" },
			{ id: 3, name: "Sistema Central de Datos Analógicos" },
			{ id: 4, name: "Control Secuencial Automatizado Digital" },
		],
	},
	{
		id: 4,
		description: "¿Cuál es la función de un sensor?",
		isAnswered: false,
		rightAnswer: 3,
		answers: [
			{ id: 1, name: "Controlar motores" },
			{ id: 2, name: "Convertir energía eléctrica en mecánica" },
			{ id: 3, name: "Detectar variables físicas" },
			{ id: 4, name: "Almacenar datos" },
		],
	},
	{
		id: 5,
		description: "¿Qué es un actuador?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Un dispositivo de entrada" },
			{ id: 2, name: "Un dispositivo que ejecuta una acción" },
			{ id: 3, name: "Un tipo de controlador" },
			{ id: 4, name: "Un software industrial" },
		],
	},
	{
		id: 6,
		description: "¿Qué protocolo es común en automatización industrial?",
		isAnswered: false,
		rightAnswer: 3,
		answers: [
			{ id: 1, name: "HTTP" },
			{ id: 2, name: "FTP" },
			{ id: 3, name: "Modbus" },
			{ id: 4, name: "SMTP" },
		],
	},
	{
		id: 7,
		description: "¿Qué tipo de señal es 4-20 mA?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Digital" },
			{ id: 2, name: "Analógica" },
			{ id: 3, name: "Binaria" },
			{ id: 4, name: "Discreta" },
		],
	},
	{
		id: 8,
		description: "¿Qué hace un HMI?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Controla motores directamente" },
			{ id: 2, name: "Interfaz entre humano y máquina" },
			{ id: 3, name: "Convierte señales analógicas" },
			{ id: 4, name: "Almacena energía" },
		],
	},
	{
		id: 9,
		description: "¿Qué es un sistema de control en lazo cerrado?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Sin retroalimentación" },
			{ id: 2, name: "Con retroalimentación" },
			{ id: 3, name: "Manual" },
			{ id: 4, name: "Desconectado" },
		],
	},
	{
		id: 10,
		description: "¿Qué componente mide temperatura?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Encoder" },
			{ id: 2, name: "Termopar" },
			{ id: 3, name: "Relé" },
			{ id: 4, name: "Motor" },
		],
	},
	{
		id: 11,
		description: "¿Qué es un relé?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Un sensor de presión" },
			{ id: 2, name: "Un interruptor controlado eléctricamente" },
			{ id: 3, name: "Un tipo de motor" },
			{ id: 4, name: "Un protocolo de red" },
		],
	},
	{
		id: 12,
		description: "¿Qué mide un encoder?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Temperatura" },
			{ id: 2, name: "Posición o velocidad" },
			{ id: 3, name: "Presión" },
			{ id: 4, name: "Voltaje" },
		],
	},
	{
		id: 13,
		description: "¿Qué es la automatización industrial?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Uso de humanos para operar máquinas" },
			{ id: 2, name: "Uso de sistemas automáticos para controlar procesos" },
			{ id: 3, name: "Solo programación de software" },
			{ id: 4, name: "Uso exclusivo de robots" },
		],
	},
	{
		id: 14,
		description: "¿Qué tipo de motor es común en automatización?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Motor de combustión" },
			{ id: 2, name: "Motor paso a paso" },
			{ id: 3, name: "Motor hidráulico" },
			{ id: 4, name: "Motor nuclear" },
		],
	},
	{
		id: 15,
		description: "¿Qué hace un inversor de frecuencia?",
		isAnswered: false,
		rightAnswer: 2,
		answers: [
			{ id: 1, name: "Convierte corriente AC a DC" },
			{ id: 2, name: "Controla la velocidad de un motor" },
			{ id: 3, name: "Almacena energía" },
			{ id: 4, name: "Convierte señales digitales" },
		],
	},
];
// const HC_QUESTIONS: IQuestion[] = [
// 	{
// 		id: 1,
// 		description: "What does HTTP stand for?",
// 		answers: [
// 			{ id: 1, name: "HyperText Transfer Protocol" },
// 			{ id: 2, name: "High Transfer Text Protocol" },
// 			{ id: 3, name: "Hyper Transfer Text Process" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 2,
// 		description: "Which language is primarily used for web styling?",
// 		answers: [
// 			{ id: 1, name: "HTML" },
// 			{ id: 2, name: "CSS" },
// 			{ id: 3, name: "Python" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 3,
// 		description: "What does SQL stand for?",
// 		answers: [
// 			{ id: 1, name: "Structured Query Language" },
// 			{ id: 2, name: "Simple Query Logic" },
// 			{ id: 3, name: "Sequential Query Language" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 4,
// 		description: "Which company developed Java?",
// 		answers: [
// 			{ id: 1, name: "Microsoft" },
// 			{ id: 2, name: "Sun Microsystems" },
// 			{ id: 3, name: "Google" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 5,
// 		description: "What does API stand for?",
// 		answers: [
// 			{ id: 1, name: "Application Programming Interface" },
// 			{ id: 2, name: "Advanced Program Integration" },
// 			{ id: 3, name: "Application Process Interface" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 6,
// 		description: "Which data structure uses FIFO?",
// 		answers: [
// 			{ id: 1, name: "Stack" },
// 			{ id: 2, name: "Queue" },
// 			{ id: 3, name: "Tree" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 7,
// 		description: "Which protocol is used for secure web browsing?",
// 		answers: [
// 			{ id: 1, name: "HTTP" },
// 			{ id: 2, name: "FTP" },
// 			{ id: 3, name: "HTTPS" },
// 		],
// 		rightAnswer: 3,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 8,
// 		description: "Which language is used for Android development?",
// 		answers: [
// 			{ id: 1, name: "Kotlin" },
// 			{ id: 2, name: "Swift" },
// 			{ id: 3, name: "Ruby" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 9,
// 		description: "What does Git primarily track?",
// 		answers: [
// 			{ id: 1, name: "File versions" },
// 			{ id: 2, name: "Network traffic" },
// 			{ id: 3, name: "CPU usage" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 10,
// 		description: "Which is a NoSQL database?",
// 		answers: [
// 			{ id: 1, name: "MySQL" },
// 			{ id: 2, name: "MongoDB" },
// 			{ id: 3, name: "PostgreSQL" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 11,
// 		description: "What does CPU stand for?",
// 		answers: [
// 			{ id: 1, name: "Central Processing Unit" },
// 			{ id: 2, name: "Computer Processing Unit" },
// 			{ id: 3, name: "Central Program Utility" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 12,
// 		description: "Which is used for version control?",
// 		answers: [
// 			{ id: 1, name: "Docker" },
// 			{ id: 2, name: "Git" },
// 			{ id: 3, name: "Jenkins" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 13,
// 		description: "Which keyword declares a constant in JavaScript?",
// 		answers: [
// 			{ id: 1, name: "var" },
// 			{ id: 2, name: "let" },
// 			{ id: 3, name: "const" },
// 		],
// 		rightAnswer: 3,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 14,
// 		description: "Which company created React?",
// 		answers: [
// 			{ id: 1, name: "Google" },
// 			{ id: 2, name: "Facebook" },
// 			{ id: 3, name: "Amazon" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 15,
// 		description: "Which HTTP method is used to retrieve data?",
// 		answers: [
// 			{ id: 1, name: "POST" },
// 			{ id: 2, name: "GET" },
// 			{ id: 3, name: "PUT" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 16,
// 		description: "What is the extension of a TypeScript file?",
// 		answers: [
// 			{ id: 1, name: ".ts" },
// 			{ id: 2, name: ".js" },
// 			{ id: 3, name: ".tsx?" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 17,
// 		description: "Which is a frontend framework?",
// 		answers: [
// 			{ id: 1, name: "React" },
// 			{ id: 2, name: "Node.js" },
// 			{ id: 3, name: "Express" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 18,
// 		description: "Which tool is used for containerization?",
// 		answers: [
// 			{ id: 1, name: "Docker" },
// 			{ id: 2, name: "Git" },
// 			{ id: 3, name: "NPM" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 19,
// 		description: "Which is NOT a programming language?",
// 		answers: [
// 			{ id: 1, name: "Python" },
// 			{ id: 2, name: "HTML" },
// 			{ id: 3, name: "Java" },
// 		],
// 		rightAnswer: 2,
// 		isAnswered: false,
// 	},
// 	{
// 		id: 20,
// 		description: "What does RAM stand for?",
// 		answers: [
// 			{ id: 1, name: "Random Access Memory" },
// 			{ id: 2, name: "Read Access Memory" },
// 			{ id: 3, name: "Rapid Action Memory" },
// 		],
// 		rightAnswer: 1,
// 		isAnswered: false,
// 	},
// ];
