export interface Pagination {
  skip: number;
  limit: number;
  query?: string;
  filter?: { [key: string]: any };
  sort?: { [key: string]: any };
}

export function paginationToQueryString(pagination: Pagination): string {
  let queryString = `skip=${pagination.skip}&limit=${pagination.limit}`;

  if (pagination.query) {
    queryString += `&query=${pagination.query}`;
  }

  if (pagination.filter) {
    const filterString = JSON.stringify(pagination.filter);
    queryString += `&filter=${filterString}`;
  }

  if (pagination.sort) {
    const sortString = JSON.stringify(pagination.sort);
    queryString += `&sort=${sortString}`;
  }

  return queryString;
}
