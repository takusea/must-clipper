import {
	IconBrandGithub,
	IconBrandX,
	IconBrandYoutube,
} from "@tabler/icons-react";
import { LinkButton } from "../components/LinkButton";

export function Footer() {
	return (
		<div className="w-full h-16 bg-black text-white">
			<div className="m-auto max-w-screen-md h-full flex gap-2 items-center justify-between px-4">
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
		</div>
	);
}
