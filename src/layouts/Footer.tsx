import {
	IconBrandGithub,
	IconBrandX,
	IconBrandYoutube,
} from "@tabler/icons-react";
import { LinkButton } from "../components/LinkButton";

export function Footer() {
	return (
		<footer className="h-16 w-full border-t border-zinc-500/20 bg-zinc-100 dark:bg-zinc-800">
			<div className="m-auto flex h-full max-w-5xl items-center justify-between gap-2 px-4">
				<small className="text-base">©2024 takusea</small>
				<div className="flex gap-2">
					<LinkButton icon={IconBrandX} iconOnly href="https://x.com/takusea">
						X
					</LinkButton>
					<LinkButton
						icon={IconBrandYoutube}
						iconOnly
						href="https://youtube.com/@takusea"
					>
						YouTube
					</LinkButton>
					<LinkButton
						icon={IconBrandGithub}
						iconOnly
						href="https://github.com/takusea"
					>
						GitHub
					</LinkButton>
				</div>
			</div>
		</footer>
	);
}
