import type { Icon, IconProps } from "@tabler/icons-react";
import {
	useMemo,
	type ForwardRefExoticComponent,
	type MouseEventHandler,
	type RefAttributes,
} from "react";
import { Tooltip } from "./Tooltip";

type Props = {
	children: string | string[];
	variant?: "primary" | "default" | "warning";
	disabled?: boolean;
	iconOnly?: boolean;
	icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Button(props: Props) {
	const color = useMemo(() => {
		switch (props.variant) {
			case "primary":
				return "bg-teal-200 border border-black/20 hover:bg-teal-300";
			case "warning":
				return "bg-red-500 text-white border border-black/20 hover:bg-red-600";
			default:
				return "hover:bg-gray-500/10";
		}
	}, [props.variant]);

	const button = (
		<button
			type="button"
			className={`font-semibold h-10 min-w-10 rounded justify-center flex gap-1 items-center disabled:opacity-50 ${color} ${!props.iconOnly && "px-3"}`}
			onClick={props.onClick}
			disabled={props.disabled}
			{...(props.iconOnly && { "aria-label": props.children })}
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
