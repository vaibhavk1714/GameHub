"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

interface ActionProps {
	isFollowing: boolean;
	userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionProps) => {
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then((data: any) => {
					toast.success(
						`You are now following ${data.following.username}`
					);
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const handleUnfollow = () => {
		startTransition(() => {
			onUnfollow(userId)
				.then((data: any) => {
					toast.success(
						`You have unfollowed ${data.following.username}`
					);
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onClick = () => (isFollowing ? handleUnfollow() : handleFollow());

	return (
		<Button
			disabled={isPending}
			variant="primary"
			onClick={onClick}>
			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
};
