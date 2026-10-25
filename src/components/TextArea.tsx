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
			className="h-10 min-h-32 grow resize-y rounded border border-gray-500/40 bg-white/10 px-2 shadow-inner hover:border-gray-500/60"
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}
