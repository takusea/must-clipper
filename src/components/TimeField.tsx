import type { ChangeEventHandler, FocusEventHandler } from "react";

type Props = {
	value: string;
	id?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function TimeField(props: Props) {
	return (
		<input
			className="border border-black/20 hover:border-black/30 h-10 rounded flex-grow px-2 shadow-inner"
			type="time"
			step={1}
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	);
}
