import { TwitchPlayer, type TwitchPlayerInstance } from "react-twitch-embed";
import type { VideoMetadata } from "../video-metadata/type";
import { convertTimeFromSeconds } from "../../util/timeFormatter";

type Props = {
	metadata: VideoMetadata;
	onTimeChanged: (time: number) => void;
};

export function TwitchVideoViewer(props: Props) {
	function handlePlay(player: TwitchPlayerInstance): void {
		const id = setInterval(() => {
			if (player.getPlayerState().playback !== "Playing") {
				clearInterval(id);
			}
			props.onTimeChanged(Math.round(player.getCurrentTime()));
		}, 1000);
	}

	const time = convertTimeFromSeconds(props.metadata.seconds ?? 0);

	return (
		<TwitchPlayer
			className="aspect-video rounded-lg overflow-hidden"
			video={props.metadata.id}
			time={`${time.hours}h${time.minutes}m${time.seconds}s`}
			width={"100%"}
			autoplay={false}
			allowFullscreen
			onPlay={handlePlay}
		/>
	);
}
