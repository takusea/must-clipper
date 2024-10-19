import { type ChangeEvent, useState } from "react";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import type { VideoMetadata } from "../video-metadata/type";

type Props = {
	metadata: VideoMetadata;
	onCancel: () => void;
	onDelete(id: string): void;
	onSubmit: (id: string, metadata: VideoMetadata) => void;
};

export function VideoPlayerEditForm(props: Props) {
	const [title, setTitle] = useState(props.metadata.title ?? "");
	const [id] = useState(props.metadata.id);
	const [seconds, setSeconds] = useState(props.metadata.seconds);

	function toDisplayTime(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	}

	function handleTimeChange(event: ChangeEvent<HTMLInputElement>): void {
		const arr = event.currentTarget.value.split(":");
		if (arr.length !== 3) {
			return;
		}

		const hours = Number.parseInt(arr[0], 10) ?? 0;
		const minutes = Number.parseInt(arr[1], 10);
		const seconds = Number.parseInt(arr[2], 10);

		const isContainNaN =
			Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds);
		const isOvered = minutes > 60 || seconds > 60;
		if (isContainNaN || isOvered) {
			return;
		}

		setSeconds(hours * 3600 + minutes * 60 + seconds);
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2 items-center">
				<TextField
					value={title}
					placeholder="タイトルなし"
					onChange={(event) => setTitle(event.target.value)}
				/>
			</div>
			<label
				className="flex-grow flex items-center gap-2"
				htmlFor={`seconds-${id}`}
			>
				開始位置
				<TextField
					id={`seconds-${id}`}
					value={toDisplayTime(seconds ?? 0)}
					onChange={handleTimeChange}
				/>
			</label>
			<div className="flex-grow flex items-center gap-2 w-full">
				<div className="flex-grow">
					<Button
						icon={IconTrash}
						iconOnly
						variant="warning"
						onClick={() => props.onDelete(props.metadata.id)}
					>
						削除
					</Button>
				</div>
				<Button onClick={props.onCancel}>キャンセル</Button>
				<Button
					icon={IconCheck}
					variant="primary"
					onClick={() =>
						props.onSubmit(props.metadata.id, {
							type: props.metadata.type,
							id,
							title,
							seconds,
						})
					}
				>
					完了
				</Button>
			</div>
		</div>
	);
}
