import type { Icon, IconProps } from "@tabler/icons-react";
import type {
	ForwardRefExoticComponent,
	MouseEventHandler,
	RefAttributes,
} from "react";

type Props = {
	children: string;
	icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function FloatingActionButton(props: Props) {
	return (
		<button
			type="button"
			className="ml-auto font-semibold px-8 h-16 rounded-full text-gray-900 bg-teal-200 hover:bg-teal-300 border  border-gray-500/20 shadow-lg justify-center flex gap-2 items-center"
			onClick={props.onClick}
		>
			{props.icon && <props.icon />}
			{props.children}
		</button>
	);
}
