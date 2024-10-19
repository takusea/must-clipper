import { type ReactNode, useState } from "react";
import { VideoPlayerIframe } from "./VideoPlayerIframe";
import type { VideoMetadata } from "../video-metadata/type";
import {
	formatUrlFromTwitchMetadata,
	formatUrlFromYouTubeMetadata,
} from "./formatUrlFromMetadata";
import { VideoPlayerForm, type VideoForm } from "./VideoPlayerForm";
import { Button } from "../../components/Button";
import {
	IconBrandTwitch,
	IconBrandYoutube,
	IconEdit,
} from "@tabler/icons-react";

type Props = {
	onChange: (id: string, form: VideoForm) => void;
	metadata: VideoMetadata;
	onDelete: (id: string) => void;
};

export function VideoPlayer(props: Props) {
	const [isEditing, setIsEditing] = useState(false);

	let videoIframe: ReactNode;
	let icon: IconNode;
	switch (props.metadata.type) {
		case "yt":
			videoIframe = <YouTubeVideoViewer {...props} />;
			icon = <IconBrandYoutube />;
			break;
		case "tw":
			videoIframe = <TwitchVideoViewer {...props} />;
			icon = <IconBrandTwitch />;
			break;
	}

	function handleDelete(id: string) {
		setIsEditing(false);
		props.onDelete(id);
	}

	function handleSubmit(id: string, metadata: VideoForm) {
		setIsEditing(false);
		props.onChange(id, metadata);
	}

	return (
		<div className="flex flex-col gap-2">
			{videoIframe}
			{!isEditing ? (
				<>
					<div className="flex gap-2 items-center">
						<span className="text-gray-400 flex-shrink-0">{icon}</span>
						<h2 className="flex-grow text-xl font-bold">
							{props.metadata.title ? (
								props.metadata.title
							) : (
								<span className="text-gray-400">タイトルなし</span>
							)}
						</h2>
						<Button
							onClick={() => setIsEditing(true)}
							icon={<IconEdit />}
							iconOnly
						>
							編集
						</Button>
					</div>
				</>
			) : (
				<VideoPlayerForm
					metadata={props.metadata}
					onCancel={() => setIsEditing(false)}
					onDelete={handleDelete}
					onSubmit={handleSubmit}
				/>
			)}
		</div>
	);
}

function YouTubeVideoViewer(props: Props) {
	return (
		<VideoPlayerIframe
			src={formatUrlFromYouTubeMetadata(props.metadata)}
			url={props.metadata.id}
			time={props.metadata.seconds}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
		/>
	);
}

function TwitchVideoViewer(props: Props) {
	return (
		<VideoPlayerIframe
			src={formatUrlFromTwitchMetadata(props.metadata)}
			url={props.metadata.id}
			time={props.metadata.seconds}
			allowFullScreen
		/>
	);
}
