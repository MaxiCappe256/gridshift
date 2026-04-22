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
        className=" cursor-pointer px-3 font-bold py-1 bg-gray-100 rounded disabled:opacity-50"
      >
        &lt;
      </button>

      {/* Renderizamos el array de páginas */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentPage === page
              ? "bg-green-500 text-white font-bold" // Estilo página activa
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          } cursor-pointer`}
        >
          {page}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer px-3 py-1 font-bold bg-gray-100 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};
