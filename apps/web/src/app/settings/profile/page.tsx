"use client";

import { Check, Mail, Shield, User } from "lucide-react";

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Separator,
	Switch,
} from "@/shared";

export default function SettingsProfilePage() {
	return (
		<div className="space-y-6 max-w-4xl mx-auto block">
			<div className="space-y-0.5">
				<h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
				<p className="text-muted-foreground text-sm">
					Manage your account settings, security preferences, and public profile
					card.
				</p>
			</div>

			<Separator className="my-6" />

			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-base font-semibold">
								Personal Details
							</CardTitle>
							<CardDescription>
								Update your name, email address, and job title shown to your
								team.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<label
									className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
									htmlFor="name"
								>
									Display Name
								</label>
								<div className="relative">
									<User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										id="name"
										defaultValue="Alex Rivera"
										className="pl-9"
									/>
								</div>
							</div>

							<div className="grid gap-2">
								<label
									className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
									htmlFor="title"
								>
									Title
								</label>
								<Input
									id="title"
									defaultValue="Senior Frontend Engineer"
								/>
								<p className="text-[11px] text-muted-foreground">
									Your professional title will be displayed on your
									organizational tree view.
								</p>
							</div>

							<div className="grid gap-2">
								<label
									className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
									htmlFor="email"
								>
									Email Address
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										id="email"
										type="email"
										defaultValue="alex.rivera@company.com"
										className="pl-9"
									/>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-end border-t bg-muted/50 px-6 py-3 rounded-b-xl">
							<Button size="sm">Save Changes</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base font-semibold">
								System Preferences
							</CardTitle>
							<CardDescription>
								Configure how you interact with the tree parser and dashboard.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
								<div className="space-y-0.5">
									<label className="text-sm font-medium">
										Expand Tree by Default
									</label>
									<p className="text-xs text-muted-foreground">
										Automatically expand all accordion nodes on initial page
										load.
									</p>
								</div>
								<Switch defaultChecked />
							</div>

							<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
								<div className="space-y-0.5">
									<label className="text-sm font-medium">
										Desktop Notifications
									</label>
									<p className="text-xs text-muted-foreground">
										Receive real-time alerts when changes occur in your branch.
									</p>
								</div>
								<Switch />
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card className="overflow-hidden">
						<div className="h-24 bg-gradient-to-r from-violet-600 to-indigo-600" />
						<CardContent className="relative pt-0 text-center pb-6">
							<div className="mt-[-40px] flex justify-center">
								<span>avatar here</span>
							</div>

							<div className="mt-4 space-y-1">
								<h3 className="font-semibold text-lg leading-none">
									Alex Rivera
								</h3>
								<p className="text-xs text-muted-foreground font-mono">
									Senior Frontend Engineer
								</p>
							</div>

							<Separator className="my-4" />

							<div className="grid grid-cols-2 gap-2 text-left text-xs text-muted-foreground">
								<div className="flex items-center gap-1.5">
									<Shield className="h-3.5 w-3.5 text-emerald-500" />
									<span>Admin Role</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Check className="h-3.5 w-3.5 text-blue-500" />
									<span>Verified Account</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className="bg-muted/30 border-t px-4 py-3 flex justify-center">
							<Button
								variant="outline"
								size="xs"
								className="w-full text-xs"
							>
								Upload New Photo
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
