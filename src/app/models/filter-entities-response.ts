export interface IFilterEntitiesResponse<T> {
  data?: T[];
  page?: number;
  perPage?: number;
  total?: number;
}
