import { StyleSheet } from "react-native";
import { IS_ANDROID } from './platform';
/**
 * Tints and shades
 * ***********************************
 * 100 - Thin 
 * 200 - Extra Light or Ultra Light 
 * 300 - Light 
 * 400 - Regular or Normal
 * 500 - Medium 
 * 600 - Semi Bold or Demi Bold 
 * 700 - Bold 
 * 800 - Extra Bold or Ultra Bold 
 * 900 - Black or Heavy 
 * ***********************************
 */
/**
 * @description
 * Usar `StyleSheet.create()` en lugar de estilos en línea es recomendable por las siguientes razones:
 * @equality
 * `{}` es diferente de `{}` en React, ya que cada vez que se crea un nuevo objeto en línea, su referencia es distinta, lo que puede causar renderizados innecesarios. Usar `StyleSheet.create` evita este problema al mantener referencias constantes.
*
 * @performance
 * `StyleSheet.create` optimiza los estilos, asegurando que solo se procesen una vez, a diferencia de los estilos en línea que se recrean en cada renderizado, impactando negativamente el rendimiento.
 *
 * @scalability
 * Centraliza y reutiliza los estilos, facilitando la gestión y mantenimiento del código en aplicaciones grandes.
 *
 */
export const gs = StyleSheet.create({
	scroll: {
		overflow: "visible",
		minHeight: "100%",
		flexGrow: 1,
	},
	scrollWholeViewSpaced: {
		overflow: "visible",
		minHeight: "100%",
		flexGrow: 1,
		paddingTop: IS_ANDROID ? 40 : 0,
		paddingHorizontal: 14,
	},
	scrollModalFormSheet: {
		overflow: "visible",
		minHeight: "100%",
		flexGrow: 1,
		paddingTop: IS_ANDROID ? 40 : 64,
	},
	scrollSpacedBottom: {
		overflow: "visible",
		minHeight: "100%",
		flexGrow: 1,
		paddingHorizontal: 14,
		paddingBottom: 72,
	},
	overlay: {
		height: "100%",
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.7)',
		alignItems: "center",
		justifyContent: "center",
		zIndex: 999999,
	},
});
