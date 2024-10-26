import { type ChangeEvent, useState } from "react";
import { IconCheck, IconClock, IconTrash } from "@tabler/icons-react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import type { VideoMetadata } from "../video-metadata/type";
import { TimeField } from "../../components/TimeField";
import { Label } from "../../components/Label";
import { Tooltip } from "../../components/Tooltip";
import {
	convertTimeFromSeconds,
	parseTimeToSeconds,
} from "../../util/timeFormatter";

type Props = {
	metadata: VideoMetadata;
	currentTime: number;
	onCancel: () => void;
	onDelete(id: string): void;
	onSubmit: (id: string, metadata: VideoMetadata) => void;
};

export function VideoPlayerEditForm(props: Props) {
	const [title, setTitle] = useState(props.metadata.title ?? "");
	const [id] = useState(props.metadata.id);
	const [seconds, setSeconds] = useState(props.metadata.seconds);

	function toDisplayTime(seconds: number) {
		const time = convertTimeFromSeconds(seconds);

		const toPadding = (time: number) => time.toString().padStart(2, "0");

		return `${toPadding(time.hours)}:${toPadding(time.minutes)}:${toPadding(time.seconds)}`;
	}

	function handleTimeChange(event: ChangeEvent<HTMLInputElement>): void {
		const seconds = parseTimeToSeconds(
			event.currentTarget.value,
			/(\d+):(\d+):(\d+)/,
		);

		if (!seconds) {
			return;
		}

		setSeconds(seconds);
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
			<div className="flex-grow flex items-center gap-2">
				<Label htmlFor={`seconds-${id}`}>
					<Tooltip content="開始位置">
						<IconClock />
					</Tooltip>
				</Label>
				<TimeField
					id={`seconds-${id}`}
					value={toDisplayTime(seconds ?? 0)}
					onChange={handleTimeChange}
				/>
				<Button onClick={() => setSeconds(props.currentTime)}>
					{`${toDisplayTime(props.currentTime)}に設定`}
				</Button>
			</div>
			<div className="flex-grow flex items-center gap-2 w-full">
				<div className="flex-grow">
					<Button
						icon={IconTrash}
						iconOnly
						variant="warning"
						onClick={() => props.onDelete(props.metadata.id)}
					>
						動画を削除
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
