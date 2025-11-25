import type { InferInsertModel } from 'drizzle-orm'
import type { PgTable, SelectedFields, TableConfig } from 'drizzle-orm/pg-core'
import { database } from '@/database/config/database.config'
import type { DBOptions, DBOptionsWithJoin } from '@/types/database.type'

const querySingleRecord = <SelectType extends SelectedFields, TableType extends TableConfig>(
  table: PgTable<TableType>,
  select: SelectType,
  options: DBOptions
) => {
  const { where } = options
  const queryBuilder = database.select(select).from(table)

  if (where) {
    queryBuilder.where(where).limit(1)
  }

  return queryBuilder
}

const querySingleRecordWithJoin = <
  SelectType extends SelectedFields,
  TableType extends TableConfig,
  JoinTableType extends TableConfig
>(
  table: PgTable<TableType>,
  select: SelectType,
  options: DBOptionsWithJoin<JoinTableType>
) => {
  const { where, join } = options
  const queryBuilder = database.select(select).from(table)

  if (where) {
    queryBuilder.where(where).limit(1)
  }

  return queryBuilder[join.joinType](join.joinTable, join.joinQuery)
}

const queryMultipleRecords = <SelectType extends SelectedFields, TableType extends TableConfig>(
  table: PgTable<TableType>,
  select: SelectType,
  options: DBOptions
) => {
  const { where, orderBy, pagination } = options
  const queryBuilder = database.select(select).from(table)

  if (where) {
    queryBuilder.where(where)
  }

  if (orderBy) {
    queryBuilder.orderBy(orderBy)
  }

  if (pagination) {
    queryBuilder.limit(pagination.limit).offset(pagination.offset)
  }

  return queryBuilder
}

const queryMultipleRecordsWithJoin = <
  SelectType extends SelectedFields,
  TableType extends TableConfig,
  JoinTableType extends TableConfig
>(
  table: PgTable<TableType>,
  select: SelectType,
  options: DBOptionsWithJoin<JoinTableType>
) => {
  const { where, orderBy, pagination, join } = options
  const queryBuilder = database.select(select).from(table)

  if (where) {
    queryBuilder.where(where)
  }

  if (orderBy) {
    queryBuilder.orderBy(orderBy)
  }

  if (pagination) {
    queryBuilder.limit(pagination.limit).offset(pagination.offset)
  }

  return queryBuilder[join.joinType](join.joinTable, join.joinQuery)
}

const insertRecords = <TableType extends TableConfig>(
  table: PgTable<TableType>,
  data: InferInsertModel<PgTable<TableType>>[]
) => {
  const queryBuilder = database.insert(table).values(data)

  return queryBuilder.returning()
}

const updateRecords = <TableType extends TableConfig>(
  table: PgTable<TableType>,
  data: Partial<InferInsertModel<PgTable<TableType>>>,
  options: DBOptions
) => {
  const { where } = options
  const queryBuilder = database.update(table).set(data)

  if (where) {
    queryBuilder.where(where)
  }

  return queryBuilder.returning()
}

const deleteRecords = <TableType extends TableConfig>(table: PgTable<TableType>, options: DBOptions) => {
  const { where } = options
  const queryBuilder = database.delete(table)

  if (where) {
    queryBuilder.where(where)
  }

  return queryBuilder.returning()
}

export {
  deleteRecords,
  insertRecords,
  queryMultipleRecords,
  queryMultipleRecordsWithJoin,
  querySingleRecord,
  querySingleRecordWithJoin,
  updateRecords
}
