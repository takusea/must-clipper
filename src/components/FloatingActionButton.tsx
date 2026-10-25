import type { Icon } from "@tabler/icons-react";
import type { MouseEventHandler } from "react";

type Props = {
	children: string;
	icon?: Icon;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function FloatingActionButton(props: Props) {
	return (
		<button
			type="button"
			className="ml-auto flex h-16 items-center justify-center gap-2 rounded-full border border-gray-500/20 bg-teal-200 px-8 font-semibold text-gray-900 shadow-lg hover:bg-teal-300"
			onClick={props.onClick}
		>
			{props.icon && <props.icon />}
			{props.children}
		</button>
	);
}
