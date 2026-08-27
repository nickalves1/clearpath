import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { cn } from '@/lib/utils';

function Panel({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            data-slot="panel"
            className={cn(
                'rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border',
                className,
            )}
            {...props}
        />
    );
}

export { Panel };
