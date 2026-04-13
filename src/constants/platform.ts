import { Platform } from "react-native";

const SO_VERSION = parseInt(String(Platform.Version), 10);
export const IS_IOS = Platform.OS == "ios";
export const IS_LIQUID = IS_IOS && SO_VERSION >= 26;
export const IS_ANDROID = Platform.OS == "android";

export const FONT_MONO = IS_IOS ? 'Courier New' : 'monospace';
