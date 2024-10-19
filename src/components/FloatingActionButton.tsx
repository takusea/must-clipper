import type { IconNode } from "@tabler/icons-react";
import type { MouseEventHandler } from "react";

type Props = {
	icon: IconNode;
	children: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export function FloatingActionButton(props: Props) {
	return (
		<button
			type="button"
			className="ml-auto font-bold px-8 h-16 rounded-full bg-teal-200 hover:bg-teal-300 border border-black/20 shadow-lg justify-center flex gap-2 items-center"
			onClick={props.onClick}
		>
			{props.icon}
			{props.children}
		</button>
	);
}
