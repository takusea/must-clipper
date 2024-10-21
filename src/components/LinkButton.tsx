import type { IconProps, Icon } from "@tabler/icons-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Tooltip } from "./Tooltip";

type Props = {
	children: string;
	href: string;
	icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
	iconOnly?: boolean;
	variant?: "primary" | "default" | "warning";
};

export function LinkButton(props: Props) {
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
		<a
			type="button"
			className={`font-semibold h-10 min-w-10 rounded justify-center flex gap-1 items-center ${color} ${!props.iconOnly && "px-4"}`}
			aria-label={props.iconOnly ? props.children : ""}
			href={props.href}
		>
			{props.icon && <props.icon />}
			<span className={props.iconOnly ? "hidden" : ""}>{props.children}</span>
		</a>
	);

	return props.iconOnly ? (
		<Tooltip content={props.children}>{button}</Tooltip>
	) : (
		button
	);
}
