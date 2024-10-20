import type { Icon, IconProps } from "@tabler/icons-react";
import type {
	ForwardRefExoticComponent,
	MouseEventHandler,
	RefAttributes,
} from "react";
import { Tooltip } from "./Tooltip";

type Props = {
	children: string;
	icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
	iconOnly?: boolean;
	variant?: "primary" | "default" | "warning";
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

	return props.iconOnly ? (
		<Tooltip content={props.children}>
			<button
				type="button"
				className={`font-bold h-10 min-w-10 rounded justify-center flex gap-1 items-center ${color} ${!props.iconOnly && "px-4"}`}
				aria-label={props.iconOnly ? props.children : ""}
				onClick={props.onClick}
			>
				{props.icon && <props.icon />}
				<span className={props.iconOnly ? "hidden" : ""}>
					{props.children}
				</span>{" "}
			</button>
		</Tooltip>
	) : (
		<>
			<button
				type="button"
				className={`font-bold h-10 min-w-10 rounded justify-center flex gap-1 items-center ${color} ${!props.iconOnly && "px-4"}`}
				aria-label={props.iconOnly ? props.children : ""}
				onClick={props.onClick}
			>
				{props.icon && <props.icon />}
				<span className={props.iconOnly ? "hidden" : ""}>{props.children}</span>
			</button>
		</>
	);
}
