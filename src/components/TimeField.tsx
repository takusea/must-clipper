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
			className="h-10 grow rounded border border-zinc-500/40 bg-white/10 px-2 shadow-inner hover:border-zinc-500/60"
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
