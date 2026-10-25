import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Button } from "./Button";

type Props = {
	title: string;
	children: ReactNode;
};

export const DialogContent = (props: Props) => (
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
		<DialogPrimitive.Content
			className="fixed inset-0 m-4 grid place-content-center"
			{...props}
		>
			<div className="relative overflow-hidden rounded-2xl border border-gray-500/20 bg-white p-4 dark:bg-gray-900 dark:text-white">
				<header className="mb-2 flex items-center justify-between gap-1">
					<DialogPrimitive.DialogTitle className="text-lg font-bold">
						{props.title}
					</DialogPrimitive.DialogTitle>
					<DialogPrimitive.Close asChild>
						<Button icon={IconX} iconOnly>
							閉じる
						</Button>
					</DialogPrimitive.Close>
				</header>
				{props.children}
			</div>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
);

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = (props: { children: ReactNode }) => (
	<DialogPrimitive.Trigger asChild>{props.children}</DialogPrimitive.Trigger>
);
