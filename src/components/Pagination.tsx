import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const minPgae = Math.max(1, Math.min(currentPage - 5, totalPages - 9));
  const maxpage = Math.min(totalPages, Math.max(currentPage + 4, 10));

  const numberOfPageItems: JSX.Element[] = [];
  for (let page = minPgae; page <= maxpage; page++) {
    numberOfPageItems.push(
      <Link
        key={page}
        href={`?page=${page}`}
        className={`${
          page === currentPage ? "btn-active pointer-events-none" : ""
        }
          btn btn-outline join-item`}
      >
        {page}
      </Link>
    );
  }

  return (
    <>
      <div className="hidden  sm:flex join justify-center my-3">
        {numberOfPageItems}
      </div>

      <div className="join flex justify-center sm:hidden my-2">
        {currentPage !== 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className={`join-item btn btn-primary  `}
          >
            «
          </Link>
        )}
        <button
          className={`join-item btn btn-ghost
          `}
        >
          {currentPage}
        </button>
        {currentPage !== totalPages && (
          <Link
            href={`?page=${currentPage + 1}`}
            className={`join-item btn${
              currentPage === totalPages
                ? " btn-disabled pointer-events-none"
                : ""
            }`}
          >
            »
          </Link>
        )}
      </div>
    </>
  );
}
