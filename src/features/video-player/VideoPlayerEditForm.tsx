import { IconCheck, IconClock, IconTrash } from "@tabler/icons-react";
import { type ChangeEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { TextField } from "../../components/TextField";
import { TimeField } from "../../components/TimeField";
import { Tooltip } from "../../components/Tooltip";
import {
	convertTimeFromSeconds,
	parseTimeToSeconds,
} from "../../util/timeFormatter";
import type { VideoMetadata } from "../video-metadata/type";

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
			<div className="flex items-center gap-2">
				<TextField
					value={title}
					placeholder="タイトルなし"
					onChange={(event) => setTitle(event.target.value)}
				/>
			</div>
			<div className="flex grow items-center gap-2">
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
			<div className="flex w-full grow items-center gap-2">
				<div className="grow">
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
