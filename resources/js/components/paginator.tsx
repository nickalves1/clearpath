import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PropsPaginate = {
    meta: { current_page: number; last_page: number } | null;
    page: number;
    goToPage: (page: number) => void;
};

type PageEntry = number | 'ellipsis';

/**
 * Builds the list of page numbers to render, collapsing the middle into an
 * ellipsis once there are too many pages to show all at once. Always keeps
 * the first page, the last page, and one neighbor on each side of `current`.
 */
function getPageNumbers(current: number, last: number): PageEntry[] {
    const neighbors = 1;
    const middle: number[] = [];

    for (
        let page = Math.max(2, current - neighbors);
        page <= Math.min(last - 1, current + neighbors);
        page++
    ) {
        middle.push(page);
    }

    const pages: PageEntry[] = [1];

    if (middle[0] > 2) {
        pages.push('ellipsis');
    }

    pages.push(...middle);

    if (middle[middle.length - 1] < last - 1) {
        pages.push('ellipsis');
    }

    if (last > 1) {
        pages.push(last);
    }

    return pages;
}

/**
 * Numbered pager for an Eloquent-style paginated response.
 */
export default function Paginate({ meta, page, goToPage }: PropsPaginate) {
    const lastPage = meta?.last_page ?? 1;
    const pageNumbers = getPageNumbers(page, lastPage);
    const canGoPrevious = page > 1;
    const canGoNext = page < lastPage;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={!canGoPrevious}
                        className={
                            canGoPrevious
                                ? undefined
                                : 'pointer-events-none opacity-50'
                        }
                        onClick={(event) => {
                            event.preventDefault();

                            if (canGoPrevious) {
                                goToPage(page - 1);
                            }
                        }}
                    />
                </PaginationItem>
                {pageNumbers.map((entry, index) =>
                    entry === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={entry}>
                            <PaginationLink
                                href="#"
                                isActive={entry === page}
                                onClick={(event) => {
                                    event.preventDefault();
                                    goToPage(entry);
                                }}
                            >
                                {entry}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        aria-disabled={!canGoNext}
                        className={
                            canGoNext
                                ? undefined
                                : 'pointer-events-none opacity-50'
                        }
                        onClick={(event) => {
                            event.preventDefault();

                            if (canGoNext) {
                                goToPage(page + 1);
                            }
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
