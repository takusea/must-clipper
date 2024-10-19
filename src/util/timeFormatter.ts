export const formatTimeFromSeconds = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	return `${hours}h${minutes}m${remainingSeconds}s`;
};

export const parseTimeToSeconds = (time: string) => {
	const timeRegex = /(\d+)h(\d+)m(\d+)s/;
	const match = time.match(timeRegex);

	if (!match) {
		throw new Error("Invalid time format");
	}

	const hours = Number.parseInt(match[1], 10);
	const minutes = Number.parseInt(match[2], 10);
	const seconds = Number.parseInt(match[3], 10);

	return hours * 3600 + minutes * 60 + seconds;
};
