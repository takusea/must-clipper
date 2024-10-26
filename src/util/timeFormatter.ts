export const convertTimeFromSeconds = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	return { hours, minutes, seconds: remainingSeconds };
};

export const parseTimeToSeconds = (time: string, regex: RegExp) => {
	const match = time.match(regex);

	if (match?.length !== 4) {
		throw new Error("Invalid time format");
	}

	const hours = Number.parseInt(match[1], 10);
	const minutes = Number.parseInt(match[2], 10);
	const seconds = Number.parseInt(match[3], 10);

	const isContainNaN =
		Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds);
	const isOvered = minutes >= 60 || seconds >= 60;
	if (isContainNaN || isOvered) {
		throw new Error("Invalid time format");
	}

	return hours * 3600 + minutes * 60 + seconds;
};
