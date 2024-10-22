import type { ChangeEventHandler, FocusEventHandler } from "react";

type Props = {
	value: string;
	id?: string;
	placeholder?: string;
	max?: number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function TimeField(props: Props) {
	return (
		<input
			className="border border-gray-500/40 hover:border-gray-500/60 h-10 rounded flex-grow px-2 shadow-inner"
			type="time"
			step={1}
			max={props.max}
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	);
}
