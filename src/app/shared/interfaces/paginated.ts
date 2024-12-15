export interface Paginated<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
}
