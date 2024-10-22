import { TwitchPlayer, type TwitchPlayerInstance } from "react-twitch-embed";
import type { VideoMetadata } from "../video-metadata/type";
import { formatTimeFromSeconds } from "../../util/timeFormatter";

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

	return (
		<TwitchPlayer
			className="aspect-video rounded-lg overflow-hidden"
			video={props.metadata.id}
			time={formatTimeFromSeconds(props.metadata.seconds ?? 0)}
			width={"100%"}
			autoplay={false}
			allowFullscreen
			onPlay={handlePlay}
		/>
	);
}
