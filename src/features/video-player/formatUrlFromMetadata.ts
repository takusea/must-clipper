import { formatTimeFromSeconds } from "../../util/timeFormatter";
import type { VideoMetadata } from "../video-metadata/type";

export function formatUrlFromYouTubeMetadata(metadata: VideoMetadata) {
	return `https://www.youtube.com/embed/${metadata.id}?start=${metadata.seconds}`;
}

export function formatUrlFromTwitchMetadata(metadata: VideoMetadata) {
	return `https://player.twitch.tv/?video=${metadata.id}&parent=${window.location.hostname}&time=${formatTimeFromSeconds(metadata.seconds)}&autoplay=false`;
}
