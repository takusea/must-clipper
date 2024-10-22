import { type ReactNode, useMemo, useState } from "react";
import type { VideoMetadata } from "../video-metadata/type";
import { VideoPlayerEditForm } from "./VideoPlayerEditForm";
import { Button } from "../../components/Button";
import {
	IconBrandTwitch,
	IconBrandYoutube,
	IconChevronDown,
	IconChevronUp,
	IconEdit,
} from "@tabler/icons-react";
import { TwitchVideoViewer } from "./TwitchVideoViewer";
import { YouTubeVideoViewer } from "./YouTubeVideoViewer";

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
	const [currentTime, setCurrentTime] = useState(props.metadata.seconds);

	const videoIframe = useMemo(() => {
		switch (props.metadata.type) {
			case "yt":
				return (
					<YouTubeVideoViewer
						metadata={props.metadata}
						onTimeChanged={handleTimeChanged}
					/>
				);
			case "tw":
				return (
					<TwitchVideoViewer
						metadata={props.metadata}
						onTimeChanged={handleTimeChanged}
					/>
				);
		}
	}, [props.metadata]);

	const icon = useMemo(() => {
		switch (props.metadata.type) {
			case "yt":
				return <IconBrandYoutube />;
			case "tw":
				return <IconBrandTwitch />;
		}
	}, [props.metadata]);

	function handleDelete() {
		setIsEditing(false);
		props.onDelete();
	}

	function handleSubmit(id: string, metadata: VideoMetadata) {
		setIsEditing(false);
		props.onChange(id, metadata);
	}

	function handleTimeChanged(time: number) {
		setCurrentTime(time);
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
					currentTime={currentTime ?? 0}
					onCancel={() => setIsEditing(false)}
					onDelete={handleDelete}
					onSubmit={handleSubmit}
				/>
			)}
		</div>
	);
}
