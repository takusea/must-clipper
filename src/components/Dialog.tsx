import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { Button } from "./Button";

type Props = {
	title: string;
	children: ReactNode;
};

export const DialogContent = (props: Props) => (
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay className="fixed inset-0 bg-black/20" />
		<DialogPrimitive.Content
			className="fixed inset-0 m-4 grid place-content-center"
			{...props}
		>
			<div className="relative bg-white border border-gray-500/20 p-4 rounded-2xl overflow-hidden">
				<header className="flex gap-1 items-center justify-between mb-2">
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
