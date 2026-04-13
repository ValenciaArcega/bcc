import * as Haptics from "expo-haptics";

type VibrationIntensity = "heavy" | "light" | "medium" | "rigid" | "soft" | "error" | "warning" | "success" | "ultralight";

export function hapticFeedback(type: VibrationIntensity) {
	if (type === "error") {
		return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
	}
	if (type === "warning") {
		return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
	}
	if (type === "success") {
		return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
	}
	if (type === "ultralight") {
		return Haptics.selectionAsync();
	}

	const feedbackMap = {
		heavy: Haptics.ImpactFeedbackStyle.Heavy,
		light: Haptics.ImpactFeedbackStyle.Light,
		medium: Haptics.ImpactFeedbackStyle.Medium,
		rigid: Haptics.ImpactFeedbackStyle.Rigid,
		soft: Haptics.ImpactFeedbackStyle.Soft,
	};
	const feedbackType = feedbackMap[type];

	if (feedbackType) Haptics.impactAsync(feedbackType);
}
