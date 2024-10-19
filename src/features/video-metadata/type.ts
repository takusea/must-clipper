export type VideoMetadata = TwitchVideoMetadata | YouTubeVideoMetadata;

type TwitchVideoMetadata = {
	type: "tw";
	id: string;
	seconds?: number;
	title?: string;
};

type YouTubeVideoMetadata = {
	type: "yt";
	id: string;
	seconds?: number;
	title?: string;
};
