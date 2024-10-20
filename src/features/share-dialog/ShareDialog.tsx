import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import {
	IconShare,
	IconCopy,
	IconBrandX,
	IconBrandInstagram,
	IconBrandLine,
} from "@tabler/icons-react";
import { Button } from "../../components/Button";
import { FloatingActionButton } from "../../components/FloatingActionButton";
import { TextField } from "../../components/TextField";

type Props = {
	url: string;
	onCopy: () => void;
};

export function ShareDialog(props: Props) {
	return (
		<Dialog>
			<DialogTrigger>
				<FloatingActionButton icon={IconShare}>共有</FloatingActionButton>
			</DialogTrigger>
			<DialogContent title="共有">
				<div className="flex flex-col gap-4">
					<div className="flex gap-2">
						<TextField value={props.url} readOnly />
						<Button icon={IconCopy} iconOnly onClick={props.onCopy}>
							コピー
						</Button>
					</div>
					<div className="flex gap-2">
						<Button icon={IconBrandX} iconOnly>
							X
						</Button>
						<Button icon={IconBrandInstagram} iconOnly>
							Instagram
						</Button>
						<Button icon={IconBrandLine} iconOnly>
							Line
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
