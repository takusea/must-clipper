import YouTube from "react-youtube";
import type { VideoMetadata } from "../video-metadata/type";

type Props = {
	metadata: VideoMetadata;
	onTimeChanged: (time: number) => void;
};

export function YouTubeVideoViewer(props: Props) {
	const opts = {
		playerVars: {
			start: props.metadata.seconds,
		},
	};

	const handleStateChange = (event) => {
		if (event.data !== 1) {
			return;
		}
		const id = setInterval(() => {
			if (event.target.getPlayerState() !== 1) {
				clearInterval(id);
			}
			props.onTimeChanged(Math.round(event.target.getCurrentTime()));
		}, 1000);
	};

	return (
		<YouTube
			iframeClassName="w-full h-auto aspect-video rounded-lg"
			videoId={props.metadata.id}
			opts={opts}
			onStateChange={handleStateChange}
		/>
	);
}
