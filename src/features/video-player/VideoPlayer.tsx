import { type ReactNode, useState } from "react";
import { VideoPlayerIframe } from "./VideoPlayerIframe";
import type { VideoMetadata } from "../video-metadata/type";
import {
	formatUrlFromTwitchMetadata,
	formatUrlFromYouTubeMetadata,
} from "../video-metadata/formatUrlFromMetadata";
import { VideoPlayerEditForm } from "./VideoPlayerEditForm";
import { Button } from "../../components/Button";
import {
	IconBrandTwitch,
	IconBrandYoutube,
	IconChevronDown,
	IconChevronUp,
	IconEdit,
} from "@tabler/icons-react";

type Props = {
	metadata: VideoMetadata;
	isUpDisabled: boolean;
	isDownDisabled: boolean;
	onUp: () => void;
	onDown: () => void;
	onDelete: () => void;
	onChange: (id: string, metadata: VideoMetadata) => void;
};

export function VideoPlayer(props: Props) {
	const [isEditing, setIsEditing] = useState(false);

	let videoIframe: ReactNode;
	let icon: ReactNode;
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

	function handleSubmit(id: string, metadata: VideoMetadata) {
		setIsEditing(false);
		props.onChange(id, metadata);
	}

	return (
		<div className="flex flex-col gap-2">
			{videoIframe}
			{!isEditing ? (
				<div className="flex gap-2 items-center flex-wrap">
					<span className="text-gray-400 flex-shrink-0">{icon}</span>
					<h2 className="flex-grow text-lg font-semibold">
						{props.metadata.title || (
							<span className="text-gray-400 select-none">タイトルなし</span>
						)}
					</h2>
					<div className="flex gap-2 items-center ml-auto">
						<Button
							icon={IconChevronUp}
							iconOnly
							disabled={props.isUpDisabled}
							onClick={() => props.onUp()}
						>
							上へ
						</Button>
						<Button
							icon={IconChevronDown}
							iconOnly
							disabled={props.isDownDisabled}
							onClick={() => props.onDown()}
						>
							下へ
						</Button>
						<Button onClick={() => setIsEditing(true)} icon={IconEdit} iconOnly>
							編集
						</Button>
					</div>
				</div>
			) : (
				<VideoPlayerEditForm
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
