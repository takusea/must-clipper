import { useState } from "react";
import type { VideoMetadata } from "./type";
import {
	parseUrlToTwitchMetadata,
	parseUrlToYouTubeMetadata,
} from "./parseUrl";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { IconLink, IconPlus } from "@tabler/icons-react";
import { Label } from "../../components/Label";
import { Tooltip } from "../../components/Tooltip";

type Props = {
	onAdd: (metadata: VideoMetadata) => void;
};

export function VideoAddForm(props: Props) {
	const [url, setUrl] = useState<string>("");

	const handleClick = () => {
		let metadata: VideoMetadata;
		if (url.includes("youtu")) {
			metadata = parseUrlToYouTubeMetadata(url);
		} else if (url.includes("twitch")) {
			metadata = parseUrlToTwitchMetadata(url);
		} else {
			return;
		}
		props.onAdd(metadata);
		setUrl("");
	};

	return (
		<div className="flex gap-2 items-center">
			<Label htmlFor="add-url">
				<Tooltip content="URL">
					<IconLink />
				</Tooltip>
			</Label>
			<TextField
				id="add-url"
				value={url}
				onChange={(event) => setUrl(event.target.value)}
				placeholder="YouTube Live or Twitch URL"
			/>
			<Button icon={IconPlus} iconOnly onClick={handleClick}>
				動画を追加
			</Button>
		</div>
	);
}
