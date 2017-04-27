let language = navigator.language.toLowerCase();
switch (language) {
	case "zh-tw": break;
	default : 
		language = "en-us";
}

const strings = require("./strings-" + language + ".json");
export const stringsIndex = strings.index;
export const stringsStart = strings.start;
export const stringsSetting = strings.setting;
export const stringsLog = strings.log;
export const stringsBattle = strings.battle;