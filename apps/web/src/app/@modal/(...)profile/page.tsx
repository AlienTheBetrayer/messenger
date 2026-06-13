"use client";

import { useRouter } from "next/navigation";

import { useNotificationDispatch } from "@/features";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Field,
	FieldGroup,
	Input,
	Label,
} from "@/shared";

export default function ProfileModal() {
	// routing
	const router = useRouter();

	// notification
	const { promise } = useNotificationDispatch();

	// jsx
	return (
		<Dialog
			onOpenChange={(state) => {
				if (!state) {
					setTimeout(() => {
						router.back();
					}, 300);
				}
			}}
			defaultOpen
		>
			<form>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you&apos;re
							done.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<Field>
							<Label htmlFor="name-1">Name</Label>
							<Input
								id="name-1"
								name="name"
								defaultValue="Pedro Duarte"
							/>
						</Field>
						<Field>
							<Label htmlFor="username-1">Username</Label>
							<Input
								id="username-1"
								name="username"
								defaultValue="@peduarte"
							/>
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							type="button"
							onClick={() => {
								promise<boolean>(
									() =>
										new Promise((res) => {
											setTimeout(() => {
												res(true);
											}, 1000);
										}),
									{
										success: (ret) => ({
											node: (
												<div>
													{ret} <Button>why?</Button>
												</div>
											),
											text: "Profile updated successfully!",
										}),
										error: (ret) => ({
											node: (
												<div>
													<span>error:</span> <Button>why?</Button>
												</div>
											),
											text: "Something went wrong",
										}),
									},
								);
							}}
						>
							hi
						</Button>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
