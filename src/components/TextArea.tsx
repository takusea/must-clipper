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
			className="bg-white/10 border border-gray-500/40 hover:border-gray-500/60 h-10 rounded flex-grow px-2 shadow-inner resize-y min-h-32"
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}
