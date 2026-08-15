import { Button } from '@/components/ui/button';

type PropsPaginate = {
    meta: { current_page: number; last_page: number } | null;
    page: number;
    goToPage: (page: number) => void;
};

export default function Paginate({ meta, page, goToPage }: PropsPaginate) {
    return (
        <>
            <div className="flex items-center justify-center">
                <Button variant="ghost" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                    Anterior
                </Button>
                <span className="text-sm text-muted-foreground mx-5">
                    Página {meta?.current_page} de {meta?.last_page}
                </span>
                <Button variant="ghost" disabled={!meta || page >= meta.last_page} onClick={() => { if (meta && page < meta.last_page) goToPage(page+1)}}>
                    Próxima
                </Button>
            </div>
        </>
    );
}