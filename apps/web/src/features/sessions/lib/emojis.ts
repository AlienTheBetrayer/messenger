import { randomElement } from "@gravity/shared";

/**
 * default group emojis (randomly selected)
 */
export const GROUP_EMOJIS = [
	// organization
	"📁",
	"📂",
	"🗂️",
	"📦",
	"📌",
	"🏷️",

	// favorites / highlights
	"⭐",
	"✨",
	"💎",
	"🔥",
	"💡",
	"🌟",

	// work / productivity
	"📝",
	"📋",
	"📊",
	"📈",
	"📚",
	"📖",

	// tech
	"💻",
	"🖥️",
	"⚙️",
	"🔧",
	"🛠️",
	"🧩",

	// communication
	"💬",
	"📨",
	"📬",
	"📢",

	// creative
	"🎨",
	"🎵",
	"🎬",
	"📷",

	// general
	"🎯",
	"🚀",
	"🌍",
	"🌱",
	"🍀",
	"❤️",
	"💜",
	"🩵",
	"🤍",
	"🧠",
	"🔒",
	"🔑",
	"🛡️",
	"🎉",
	"🎁",
];

/**
 * picks a random emoji for a group
 * @returns random emoji
 */
export const randomGroupFormEmoji = () => {
	return randomElement(GROUP_EMOJIS);
};
