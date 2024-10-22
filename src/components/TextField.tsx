import type { ChangeEventHandler, FocusEventHandler } from "react";

type Props = {
	value: string;
	id?: string;
	placeholder?: string;
	readOnly?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function TextField(props: Props) {
	return (
		<input
			className="border border-gray-500/40 hover:border-gray-500/60 h-10 rounded flex-grow px-2 shadow-inner"
			type="text"
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			readOnly={props.readOnly}
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	);
}
