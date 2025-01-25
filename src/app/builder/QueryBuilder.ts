import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  //Search
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  //Filter
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  //Sorting
  sort() {
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
  //Sort by order
  sortOrder() {
    const sortOrder = this?.query?.sortOrder;
    if (sortOrder === 'asc') {
      this.modelQuery = this.modelQuery.sort('createdAt');
    } else if (sortOrder === 'desc') {
      this.modelQuery = this.modelQuery.sort('-createdAt');
    }
    return this;
  }
}
export default QueryBuilder;
