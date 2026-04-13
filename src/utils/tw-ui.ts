import { TextStyle } from "react-native";
/**
 * @author ValenciaArcega
 * Whole this set of constants contain the joint tailwind 
 * classes to reuse inside the app interfaces.
 * wr: Wrappers and containers
 * inp: Inputs and text areas
 * btn: Buttons and pressables
 * txt: Labels, titles, paragraphs...
 */
export const wrView = "flex-1 bg-a0 dark:bg-a1";
export const wrViewModal = 'flex-1 bg-a0 dark:bg-a920';

export const wrMultimedia = "max-w-full min-h-[50px] py-2 bg-gray-100 dark:bg-a940 mt-2 px-6 rounded-full flex-row items-center";
export const txtMultimedia = "ml-3 font-medium text-black dark:text-white text-base";
export const separator = "border-b-[1px] border-b-[#eee] dark:border-b-[#222] w-full my-6";
export const txt = "text-black dark:text-white";
export const wrSwitch = "py-2.5 w-full rounded-2xl px-4 mt-8 items-center bg-gray-100 dark:bg-a940 flex-row justify-between";
export const txtHelperInp = 'text-xs text-gray-400 ml-4 mt-1.5';

export const wrInpIcon = "flex-row items-center mt-2";
export const wrPass = "flex-row items-center justify-between";

export const labelInp = "mt-5 text-[13px] text-black dark:text-gray-100 font-medium";
export const inpIcon = "h-14 w-full pr-3 pl-14 text-[17px] rounded-full bg-white dark:bg-[#0A0A0A] border-[2px] border-[#ddd] dark:border-gray-700 focus:border-p300 focus:bg-p100 flex dark:focus:bg-gray-900 dark:text-p100";
export const inp = "h-[48px] w-full mt-2 px-4 pl-6 text-[17px] rounded-full bg-white dark:bg-a970 border-2 border-gray-200 dark:border-a920 focus:border-p500 flex dark:text-white";
// buttons
export const btnTogglePass = "w-[18%] h-[60px] mt-1 items-center justify-center";
export const btnDestructive = "h-12 w-[60%] mt-8 px-6 self-center rounded-full justify-center bg-gray-100 dark:bg-a910";
export const btnIconTxtIcon = "min-w-[60%] mt-6 h-[50px] bg-[#f2f2f7] dark:bg-[#212529] rounded-2xl pl-5 flex-row items-center";
// texts
export const btnBase = "min-h-[48px] max-h-[48px] w-full mt-6 rounded-full overflow-hidden items-center justify-center bg-p800 dark:bg-p500 flex-row";
export const txtBtnBase = "text-white dark:text-p900 text-base ml-1.5";

export const txtBtnIconTxtIcon = "text-[16px] ml-3 dark:text-white flex-1";
export const txtTitle = "text-black dark:text-white text-xl font-semibold tracking-tight";
export const txtDestructive = "text-red-500 font-medium dark:text-white text-base";

export const wrEmpty = "flex-grow min-h-[90%] h-[90%] items-center justify-center px-8";
export const txtEmpty = "mt-3 text-base text-gray-400 text-center";

export const twInputs = {
	base: 'rounded-full px-6 mt-3 h-14 text-black dark:text-white bg-gray-100 dark:bg-a910 text-[16px] font-medium',
	label: 'mt-5 text-[12px] text-black dark:text-gray-300 font-medium',
	txtTipBottom: 'text-xs text-gray-400 ml-4 mt-1',
	inpBase:
		'h-14 w-full mt-2 px-5 text-[16px] rounded-full bg-[#f2f2f7] dark:bg-[#1c1c1c] dark:text-white',
	inpTop:
		'h-16 w-full pl-6 pr-4 text-[18px] rounded-t-3xl bg-[#f2f2f7] dark:bg-[#1c1c1c] dark:text-white',
	inpMiddle:
		'h-16 w-full pl-6 pr-4 text-[18px] rounded-none bg-[#f2f2f7] dark:bg-[#1c1c1c] dark:text-white border-y-[1px] border-y-gray-200 dark:border-y-[#404040]',
	inpBottom:
		'h-16 w-full pl-6 pr-4 text-[18px] rounded-b-3xl bg-[#f2f2f7] dark:bg-[#1c1c1c] dark:text-white',
	wrInpToken: 'w-full flex-row mt-2 justify-between',
	inpToken:
		'h-[92] w-[22%] bg-white text-black dark:bg-[#212529] dark:text-white rounded-3xl text-[38px] text-center border-2 border-gray-200 dark:border-gray-500 focus:border-p500',
};

export const twBtns = {
	txtAcrom: 'text-lg text-white dark:text-black',
	baseAcrom: 'min-h-[48px] max-h-[48px] min-w-[40%] px-4 mt-6 rounded-full overflow-hidden items-center justify-center bg-black gap-x-1.5 dark:bg-white flex-row self-center',
	/// icon-complement
	section: 'min-h-[48px] bg-gray-100 dark:bg-a940 mt-2 px-6 rounded-full flex-row items-center',
	txtBaseMedium: 'font-medium text-black dark:text-white text-base',
	actionIcon: 'min-h-[48px] bg-gray-100 dark:bg-a940 mt-2 px-6 rounded-full flex-row items-center justify-between',

	modalSection: 'min-h-[48px] bg-gray-100 dark:bg-a900 mt-2 px-6 rounded-full flex-row items-center gap-x-3',
	modalActionIcon: 'min-h-[48px] bg-gray-100 dark:bg-a900 mt-2 px-6 rounded-full flex-row items-center gap-x-3',
};

export const twMultimedia = {
	middleWrapper: 'flex-row justify-evenly items-center mt-3',
	middleButton: 'rounded-full w-[47%] h-14 px-5 justify-between flex-row items-center gap-x-2 bg-gray-100 dark:bg-a930',
	middleText: "text-black dark:text-white text-base"
};
