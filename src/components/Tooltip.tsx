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
				className="z-0 flex h-8 items-center rounded border border-gray-500/20 bg-white px-2 text-gray-900 shadow-md select-none dark:bg-gray-800 dark:text-white"
			>
				{props.content}
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Root>
	);
}
