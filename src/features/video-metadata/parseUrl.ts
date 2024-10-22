import { parseTimeToSeconds } from "../../util/timeFormatter";
import type { VideoMetadata } from "./type";

export function parseUrlToYouTubeMetadata(url: string): VideoMetadata {
	const query = url.includes("live")
		? url.replace("?", "&").replace("live/", "watch?v=").split("?")[1]
		: url.split("?")[1];
	const params = new URLSearchParams(query);

	const id = params.get("v");
	const seconds = params.get("t");

	if (!id) {
		throw new Error("Invalid url");
	}

	return {
		type: "yt",
		id,
		seconds:
			seconds !== null
				? seconds.includes("s")
					? Number(seconds.slice(0, seconds.length - 1))
					: Number(seconds)
				: 0,
	};
}

export function parseUrlToTwitchMetadata(url: string): VideoMetadata {
	const query = url.split("?")[1];
	const params = new URLSearchParams(query);

	const regex = /\/([^\/?]+)\?/;
	const match = url.match(regex);

	const time = params.get("t");

	if (!match) {
		throw new Error("Invalid url");
	}

	return {
		type: "tw",
		id: match[0].slice(1, match[0].length - 1),
		seconds: time !== null ? parseTimeToSeconds(time) : 0,
	};
}
