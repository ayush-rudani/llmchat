import { useRootContext } from "@/libs/context/root";
import { useChatStore } from "@/libs/store/chat.store";
import { Button } from "@repo/ui";
import { IconMessageCircleFilled } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RecentThreads = () => {
        const { setIsCommandSearchOpen } = useRootContext();
        const threads = useChatStore(state => state.threads.slice(0, 4));
        const router = useRouter();

        useEffect(() => {
                threads.forEach(thread => {
                        router.prefetch(`/c/${thread.id}`);
                });
        }, [threads]);

        if (threads.length === 0) {
                return null;
        }
        return (
                <div className='flex flex-col mx-1.5'>
                        <div className='flex flex-row gap-2 items-center py-2 px-1'>
                                <p className='text-sm font-medium text-muted-foreground'>Recent Messages</p>
                                <div className='flex-1' />
                                <Button variant='ghost' size='xs' rounded='full' onClick={() => setIsCommandSearchOpen(true)}>
                                        View all
                                </Button>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                                {threads.map(thread => <div key={thread.id} className='p-4 gap-1 cursor-pointer hover:shadow-sm hover:border-yellow-900/20 hover:bg-yellow-700/5 transition-all duration-200 flex flex-col bg-background rounded-2xl border border-border text-sm' onClick={() => router.push(`/c/${thread.id}`)}>
                                        <IconMessageCircleFilled size={16} strokeWidth={2} className='text-muted-foreground/50' />
                                        <div className='min-h-2 flex-1' />
                                        <p className='line-clamp-2 text-sm font-medium leading-tight'>{thread.title}</p>
                                        <p className='text-muted-foreground text-xs'>{moment(thread.createdAt).fromNow(true)} ago</p>
                                </div>)}
                        </div>
                </div>
        );
}