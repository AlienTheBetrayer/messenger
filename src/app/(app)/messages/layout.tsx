import { MessagesLayoutWrapper } from "@/src/features/messaging/message/ui/MessagesLayoutWrapper";
import Link from "next/link";

export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex w-full relative">
            <ul className="flex flex-col gap-2 w-full lg:max-w-96 overflow-y-auto">
                {Array.from({ length: 3 }, (_, k) => (
                    <li key={k}>
                        <Link href={`/messages/u/${k}`}>
                            <span>conversation {k}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <MessagesLayoutWrapper>{children}</MessagesLayoutWrapper>
        </section>
    );
}
