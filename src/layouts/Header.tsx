import { IconPlus } from "@tabler/icons-react";
import { LinkButton } from "../components/LinkButton";

export function Header() {
	return (
		<header className="w-full h-16 border-b border-gray-500/20">
			<div className="m-auto max-w-screen-lg h-full flex items-center justify-between gap-2 px-4">
				<a href="/" className="flex gap-1 items-center font-bold">
					<img className="w-6" src="/icon-128.png" alt="" />
					ますとくりっぱー
				</a>
				<LinkButton icon={IconPlus} href="/" variant="primary">
					新規作成
				</LinkButton>
			</div>
		</header>
	);
}
