import {
	IconBrandFacebook,
	IconBrandLine,
	IconBrandX,
	IconCopy,
	IconDotsCircleHorizontal,
	IconEdit,
	IconShare,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/Button";
import { Dialog, DialogContent, DialogTrigger } from "./components/Dialog";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { LinkButton } from "./components/LinkButton";
import { TextField } from "./components/TextField";
import { PageAttributeEditForm } from "./features/page-attribute/PageAttributeEditForm";
import type { PageAttribute } from "./features/page-attribute/type";
import { usePageAttributes } from "./features/page-attribute/usePageAttribute";
import { useVideoMetadatas } from "./features/video-metadata/useVideoMetadatas";
import { VideoAddForm } from "./features/video-metadata/VideoAddForm";
import { VideoPlayer } from "./features/video-player/VideoPlayer";
import { Footer } from "./layouts/Footer";
import { Header } from "./layouts/Header";

function App() {
	const {
		videoMetadatas,
		addMetadata,
		removeMetadata,
		editMetadata,
		moveMetadata,
		videoMetadatasToUrlParam,
	} = useVideoMetadatas();
	const { pageAttribute, setPageAttribute, pageAttributeToUrlParam } =
		usePageAttributes();
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		document.title =
			pageAttribute.title !== ""
				? `${pageAttribute.title} - MuStClipper`
				: "タイトルなし - MuStClipper";

		document
			.querySelector('meta[name="description"]')
			?.setAttribute("content", pageAttribute.description);
	}, [pageAttribute]);

	const url = useMemo(() => {
		return `${window.location.origin}${window.location.pathname}?${pageAttributeToUrlParam()}${videoMetadatasToUrlParam()}`;
	}, [pageAttributeToUrlParam, videoMetadatasToUrlParam]);

	function handleAttrSubmit(attr: PageAttribute) {
		setPageAttribute(attr);
		setIsEditing(false);
	}

	function handleCopy() {
		if (!navigator.clipboard) {
			console.log("Clipboard API not support");
			return;
		}

		navigator.clipboard.writeText(url);
		console.log(`copied! ${url}`);
	}

	async function handleShare() {
		if (!navigator.share) {
			console.log("Web Share API not support");
			return;
		}

		try {
			await navigator.share({
				title: pageAttribute.title,
				text: pageAttribute.description,
				url,
			});
			console.log("successed");
		} catch (err) {
			console.log("failed", err);
		}
	}

	function handleUp(index: number): void {
		moveMetadata(index, index - 1);
	}

	function handleDown(index: number): void {
		moveMetadata(index, index + 1);
	}

	return (
		<div className="text-gray-900 dark:bg-gray-900 dark:text-white">
			<Header />
			<div className="m-auto flex min-h-screen max-w-3xl flex-col gap-8 px-4">
				<div className="w-full py-4">
					{!isEditing ? (
						<div className="flex flex-col gap-2">
							<div className="flex justify-between gap-1">
								<h1 className="text-2xl font-bold">
									{pageAttribute.title || (
										<span className="text-gray-400 select-none">
											タイトルなし
										</span>
									)}
								</h1>
								<Button
									onClick={() => setIsEditing(true)}
									icon={IconEdit}
									iconOnly
								>
									クリップ情報を編集
								</Button>
							</div>
							<p>{pageAttribute.description}</p>
						</div>
					) : (
						<PageAttributeEditForm
							attr={pageAttribute}
							onSubmit={handleAttrSubmit}
							onCancel={() => setIsEditing(false)}
						/>
					)}
				</div>
				<div className="mb-auto flex flex-col gap-8">
					{videoMetadatas.map((metadata, index) => (
						<VideoPlayer
							key={metadata.id}
							metadata={metadata}
							onChange={editMetadata}
							onDelete={() => removeMetadata(index)}
							onUp={() => handleUp(index)}
							onDown={() => handleDown(index)}
							isUpDisabled={index === 0}
							isDownDisabled={index === videoMetadatas.length - 1}
						/>
					))}
				</div>
				<div className="sticky bottom-0 mt-16 flex flex-col justify-end gap-4">
					<div className="absolute right-0 bottom-full mb-4">
						<Dialog>
							<DialogTrigger>
								<FloatingActionButton icon={IconShare}>
									共有
								</FloatingActionButton>
							</DialogTrigger>
							<DialogContent title="共有">
								<div className="flex flex-col gap-2">
									<div className="flex gap-2">
										<TextField value={url} readOnly />
										<Button icon={IconCopy} iconOnly onClick={handleCopy}>
											コピー
										</Button>
									</div>
									<h2 className="mt-4 font-semibold">SNSでシェア</h2>
									<div className="flex gap-2">
										<LinkButton
											href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&hashtags=MuStClipper`}
											icon={IconBrandX}
											iconOnly
											isOpenOnNewTab
										>
											X
										</LinkButton>
										<LinkButton
											href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`}
											icon={IconBrandLine}
											iconOnly
											isOpenOnNewTab
										>
											Line
										</LinkButton>
										<LinkButton
											href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
											icon={IconBrandFacebook}
											iconOnly
											isOpenOnNewTab
										>
											Facebook
										</LinkButton>
										<Button
											icon={IconDotsCircleHorizontal}
											iconOnly
											onClick={handleShare}
										>
											その他
										</Button>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					</div>
					<div className="w-full border-t border-gray-500/20 bg-white py-4 dark:bg-gray-900">
						<VideoAddForm onAdd={addMetadata} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
