/**
 * 分页查询结果
 */
export type PageResult<T> = {
  //数据列表
  records: T[]
  //总记录数
  total: number
}
