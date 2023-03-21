import { orderBy } from 'natural-orderby';
import _ from 'lodash';

interface IQueryBuilderItem {
  index: number;
}
type QueryBuilderItem<T> = T & IQueryBuilderItem;
type QueryBuilderItems<T> = Array<QueryBuilderItem<T>>;
type OrderByDirection = 'asc' | 'desc';
type Pipeline<T> = (data: T[]) => T[];

export class QueryBuilder<T> {
  private _data: QueryBuilderItems<T> = [];
  private _pipeline: Array<Pipeline<QueryBuilderItem<T>>> = [];

  constructor(data: T[]) {
    this._data = data.map((item, index) => ({ ...item, index }));
  }

  where(field: keyof QueryBuilderItem<T>, value: string | number) {
    const pipe = (data: QueryBuilderItems<T>) => data.filter((x) => x[field] === value);
    this._pipeline.push(pipe);
    return this;
  }

  whereIn(field: keyof QueryBuilderItem<T>, values: Array<string | number>) {
    const _values = values.map((x) => x.toString());
    const pipe = (data: QueryBuilderItems<T>) => data.filter((x) => _values.includes(`${x[field]}`));
    this._pipeline.push(pipe);
    return this;
  }

  greaterThan(field: keyof QueryBuilderItem<T>, value: string | number) {
    const pipe = (data: QueryBuilderItems<T>) => data.filter((x) => x[field] > value);
    this._pipeline.push(pipe);
    return this;
  }

  lessThan(field: keyof QueryBuilderItem<T>, value: string | number) {
    const pipe = (data: QueryBuilderItems<T>) => data.filter((x) => x[field] < value);
    this._pipeline.push(pipe);
    return this;
  }

  orderBy(field: keyof QueryBuilderItem<T>, direction: OrderByDirection = 'asc') {
    const pipe = (data: QueryBuilderItems<T>) => orderBy(data, (x) => x[field], direction);
    this._pipeline.push(pipe);
    return this;
  }

  like(field: keyof QueryBuilderItem<T>, substring: string) {
    const pipe = (data: QueryBuilderItems<T>) =>
      data.filter((x) => {
        try {
          // Note:
          // Currently this is a dumb search by substring. This can be
          // improved by implementing a fuzzy search algorithm.
          const value = (x[field] as string | number).toString().toLocaleLowerCase();
          return value.includes(substring.toLocaleLowerCase());
        } catch (err) {
          console.error(`Failed to convert to string: ${JSON.stringify(x[field])}`);
          console.error(err);
          return false;
        }
      });

    this._pipeline.push(pipe);
    return this;
  }

  first() {
    const [firstItem] = this.executePipeline();
    return firstItem;
  }

  last() {
    const lastItem = this.executePipeline().pop();
    return lastItem;
  }

  exec() {
    return this.executePipeline();
  }

  private executePipeline() {
    const data = _.cloneDeep(this._data);
    const results = this._pipeline.reduce((pv, fn) => fn(pv), data);
    this.resetPipeline();

    return results;
  }

  private resetPipeline() {
    this._pipeline = [];
  }
}
