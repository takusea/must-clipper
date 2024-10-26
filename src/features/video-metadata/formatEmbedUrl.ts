import { convertTimeFromSeconds } from "../../util/timeFormatter";
import type { VideoMetadata } from "./type";

export function formatUrlFromYouTubeMetadata(metadata: VideoMetadata) {
	return `https://www.youtube.com/embed/${metadata.id}?start=${metadata.seconds}`;
}

export function formatUrlFromTwitchMetadata(metadata: VideoMetadata) {
	const time = convertTimeFromSeconds(metadata.seconds ?? 0);
	return `https://player.twitch.tv/?video=${metadata.id}&parent=${window.location.hostname}&time=${time.hours}h${time.minutes}m${time.seconds}s&autoplay=false`;
}
