import type { Icon } from "@tabler/icons-react";
import { Tooltip } from "./Tooltip";

type Props = {
	children: string;
	href: string;
	icon?: Icon;
	iconOnly?: boolean;
	isOpenOnNewTab?: boolean;
	variant?: "primary" | "default" | "warning";
};

export function LinkButton(props: Props) {
	let color: string;
	switch (props.variant) {
		case "primary":
			color =
				"text-zinc-900 bg-teal-200 border border-zinc-500/20 hover:bg-teal-300";
			break;
		case "warning":
			color =
				"bg-red-500 text-white border border-zinc-500/20 hover:bg-red-600";
			break;
		default:
			color = "hover:bg-zinc-500/10";
			break;
	}

	const button = (
		<a
			type="button"
			className={`flex h-10 min-w-10 items-center justify-center gap-1 rounded font-semibold ${color} ${!props.iconOnly && "px-4"}`}
			href={props.href}
			{...(props.isOpenOnNewTab && { target: "_blank", rel: "noreffer" })}
			{...(props.iconOnly && { "aria-label": props.children })}
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
