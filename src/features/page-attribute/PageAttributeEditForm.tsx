import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { TextArea } from "../../components/TextArea";
import { TextField } from "../../components/TextField";
import type { PageAttribute } from "./type";

type Props = {
	attr: PageAttribute;
	onCancel: () => void;
	onSubmit: (attr: PageAttribute) => void;
};

export function PageAttributeEditForm(props: Props) {
	const [title, setTitle] = useState<string>(props.attr.title);
	const [description, setDescription] = useState<string>(
		props.attr.description,
	);

	return (
		<div className="flex flex-col items-stretch">
			<Label htmlFor="clip-name">クリップの名前</Label>
			<TextField
				id="clip-name"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<div className="mt-4">
				<Label htmlFor="description">クリップの概要</Label>
			</div>
			<TextArea
				id="description"
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<div className="mt-4 ml-auto flex gap-2">
				<Button onClick={props.onCancel}>キャンセル</Button>
				<Button
					variant="primary"
					icon={IconCheck}
					onClick={() => props.onSubmit({ title, description })}
				>
					確定
				</Button>
			</div>
		</div>
	);
}
