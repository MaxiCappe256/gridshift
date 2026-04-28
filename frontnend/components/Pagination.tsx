interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: Props) => {
  if (totalPages <= 1) return null;

  // Creamos el array de números: si totalPages es 5, genera [1, 2, 3, 4, 5]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-ghost px-3 py-2"
      >
        &lt;
      </button>

      {/* Renderizamos el array de páginas */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn px-4 py-2.5 ${
            currentPage === page ? 'btn-primary' : 'btn-ghost'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-ghost px-3 py-2"
      >
        &gt;
      </button>
    </div>
  );
};
