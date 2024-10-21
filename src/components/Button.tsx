import type { Icon, IconProps } from "@tabler/icons-react";
import type {
	ForwardRefExoticComponent,
	MouseEventHandler,
	RefAttributes,
} from "react";
import { Tooltip } from "./Tooltip";

type Props = {
	children: string;
	variant?: "primary" | "default" | "warning";
	disabled?: boolean;
	iconOnly?: boolean;
	icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Button(props: Props) {
	let color: string;
	switch (props.variant) {
		case "primary":
			color = "bg-teal-200 border border-black/20 hover:bg-teal-300";
			break;
		case "warning":
			color = "bg-red-500 text-white border border-black/20 hover:bg-red-600";
			break;
		default:
			color = "hover:bg-gray-500/10";
			break;
	}

	const button = (
		<button
			type="button"
			className={`font-semibold h-10 min-w-10 rounded justify-center flex gap-1 items-center disabled:opacity-50 ${color} ${!props.iconOnly && "px-4"}`}
			aria-label={props.iconOnly ? props.children : ""}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.icon && <props.icon />}
			<span className={props.iconOnly ? "hidden" : ""}>{props.children}</span>
		</button>
	);

	return props.iconOnly ? (
		<Tooltip content={props.children}>{button}</Tooltip>
	) : (
		button
	);
}
