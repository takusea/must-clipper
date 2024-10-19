import type { ChangeEventHandler, FocusEventHandler } from "react";

type Props = {
	value: string;
	id?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function TextField(props: Props) {
	return (
		<input
			className="border border-black/20 h-10 rounded flex-grow px-2 shadow-inner"
			type="text"
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	);
}
