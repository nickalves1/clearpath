import { Button } from '@/components/ui/button';

type PropsPaginate = {
    meta: { current_page: number; last_page: number } | null;
    page: number;
    goToPage: (page: number) => void;
};

/**
 * Previous/next pager for an Eloquent-style paginated response.
 * Both buttons are disabled at their respective bounds.
 */
export default function Paginate({ meta, page, goToPage }: PropsPaginate) {
    return (
        <>
            <div className="flex items-center justify-center">
                <Button variant="ghost" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                    Previous
                </Button>
                <span className="text-sm text-muted-foreground mx-5">
                    Page {meta?.current_page} of {meta?.last_page}
                </span>
                <Button variant="ghost" disabled={!meta || page >= meta.last_page} onClick={() => { if (meta && page < meta.last_page) goToPage(page+1)}}>
                    Next
                </Button>
            </div>
        </>
    );
}