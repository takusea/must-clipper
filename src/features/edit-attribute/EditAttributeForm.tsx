import { useState } from "react";
import type { PageAttribute } from "./type";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { IconCheck } from "@tabler/icons-react";

type Props = {
	attr: PageAttribute;
	onCancel: () => void;
	onSubmit: (attr: PageAttribute) => void;
};

export function EditAttributeForm(props: Props) {
	const [title, setTitle] = useState<string>(props.attr.title);
	const [description, setDescription] = useState<string>(
		props.attr.description,
	);

	return (
		<div className="flex flex-col items-stretch">
			<label className="font-bold" htmlFor="clip-name">
				クリップ名
			</label>
			<TextField
				id="clip-name"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<label className="font-bold mt-4" htmlFor="description">
				クリップの説明
			</label>
			<TextArea
				id="description"
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<div className="ml-auto flex gap-2 mt-4">
				<Button onClick={props.onCancel}>キャンセル</Button>
				<Button
					variant="primary"
					icon={<IconCheck />}
					onClick={() => props.onSubmit({ title, description })}
				>
					確定
				</Button>
			</div>
		</div>
	);
}
