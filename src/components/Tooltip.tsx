import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
	content: string;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export function Tooltip(props: Props) {
	return (
		<TooltipPrimitive.Root
			open={props.open}
			defaultOpen={props.defaultOpen}
			onOpenChange={props.onOpenChange}
		>
			<TooltipPrimitive.Trigger asChild>
				{props.children}
			</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Content
				side="top"
				align="center"
				sideOffset={4}
				className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white border border-gray-500/20 shadow-md h-8 px-2 flex items-center rounded z-0 select-none"
			>
				{props.content}
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Root>
	);
}
