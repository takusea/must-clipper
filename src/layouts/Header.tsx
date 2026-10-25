import { IconPlus } from "@tabler/icons-react";
import { LinkButton } from "../components/LinkButton";

export function Header() {
	return (
		<header className="h-16 w-full border-b border-zinc-500/20">
			<div className="m-auto flex h-full max-w-5xl items-center justify-between gap-2 px-4">
				<a href="/" className="flex items-center gap-1 font-bold">
					<img className="w-6" src="/icon-128.png" alt="" />
					MuStClipper
				</a>
				<LinkButton icon={IconPlus} href="/" variant="primary">
					新規作成
				</LinkButton>
			</div>
		</header>
	);
}
