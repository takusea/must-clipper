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
			className="h-10 grow rounded border border-zinc-500/40 bg-white/10 px-2 shadow-inner hover:border-zinc-500/60"
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
