import type { ChangeEventHandler } from "react";

type Props = {
	id: string;
	value: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export function TextArea(props: Props) {
	return (
		<textarea
			className="border border-black/20 hover:border-black/30 h-10 rounded flex-grow px-2 shadow-inner resize-y min-h-32"
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}
