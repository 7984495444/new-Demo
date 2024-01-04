import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function PaginationComponent({
  totalPage,
  page,
  changePageToNumberHandal,
  nextAndPrevHandal,
}) {
  let pagination = [];
  let i = 1;

  while (i <= totalPage) {
    if (i <= 1 || i >= totalPage - 1 || (i >= page - 1 && i <= page + 1)) {
      pagination.push(i);
      i++;
    } else {
      pagination.push("...");
      //jump to the next page to be linked in the navigation
      i = i < page ? page - 1 : totalPage - 1;
    }
  }

  return (
    <Pagination listClassName="gap-1 justify-content-end">
      <PaginationItem disabled={page <= 1 ? true : false}>
        <PaginationLink previous onClick={() => nextAndPrevHandal(false)} />
      </PaginationItem>
      {pagination?.map((val, index) => {
        return (
          <PaginationItem
            key={index}
            active={val === page}
            onClick={() => (val === "..." ? "" : changePageToNumberHandal(val))}
          >
            <PaginationLink>{val}</PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={totalPage === page ? true : false}>
        <PaginationLink next onClick={() => nextAndPrevHandal(true)} />
      </PaginationItem>
    </Pagination>
  );
}

export default PaginationComponent;
