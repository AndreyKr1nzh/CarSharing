import { Pagination as BootstrapPagination } from 'react-bootstrap';
import '../../styles/pagination.css';

function Pagination({ pagination, onPageChange }) {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { page, totalPages, hasPrev, hasNext } = pagination;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    return (
        <nav className="custom-pagination-wrapper d-flex justify-content-center mt-4" aria-label="Навигация по страницам">
            <BootstrapPagination>
                <BootstrapPagination.Prev 
                    onClick={() => onPageChange(page - 1)} 
                    disabled={!hasPrev}
                    aria-label="Предыдущая страница"
                />
                
                {page > 3 && totalPages > 5 && (
                    <>
                        <BootstrapPagination.Item 
                            onClick={() => onPageChange(1)}
                            aria-label="Перейти на первую страницу"
                        >
                            1
                        </BootstrapPagination.Item>
                        {page > 4 && <BootstrapPagination.Ellipsis disabled aria-hidden="true" />}
                    </>
                )}
                
                {getPageNumbers().map(pageNum => (
                    <BootstrapPagination.Item
                        key={pageNum}
                        active={pageNum === page}
                        onClick={() => onPageChange(pageNum)}
                        aria-label={`Перейти на страницу ${pageNum}`}
                        aria-current={pageNum === page ? 'page' : undefined}
                    >
                        {pageNum}
                    </BootstrapPagination.Item>
                ))}
                
                {page < totalPages - 2 && totalPages > 5 && (
                    <>
                        {page < totalPages - 3 && <BootstrapPagination.Ellipsis disabled aria-hidden="true" />}
                        <BootstrapPagination.Item 
                            onClick={() => onPageChange(totalPages)}
                            aria-label="Перейти на последнюю страницу"
                        >
                            {totalPages}
                        </BootstrapPagination.Item>
                    </>
                )}
                
                <BootstrapPagination.Next 
                    onClick={() => onPageChange(page + 1)} 
                    disabled={!hasNext}
                    aria-label="Следующая страница"
                />
            </BootstrapPagination>
        </nav>
    );
}

export default Pagination;