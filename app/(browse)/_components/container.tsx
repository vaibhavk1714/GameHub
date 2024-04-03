"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

export const Container = ({ children }: { children: React.ReactNode }) => {
	const matches = useMediaQuery("(max-width: 1024px)");
	const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

	useEffect(() => {
		if (matches) onCollapse();
		else onExpand();
	}, [matches, onCollapse, onExpand]);

	return (
		<div
			className={cn(
				"flex-1",
				collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
			)}>
			{children}
		</div>
	);
};
