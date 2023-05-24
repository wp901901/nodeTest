import { ListRes } from "./common.d";

export interface WarehouseListReq {
  name?: string;
  pageSize?: number;
  pageIndex?: number;
}

export interface WarehouseRecord {
  warehouseId: number;
  traderId: number;
  name: string;
  description: string;
  createUserId: number;
  lastUpdateUserId: number;
  createTime: string;
  lastUpdateTime: string;
}
export interface ListRes<T> {
  total: number;
  pageIndex: number;
  pageSize: number;
  rows: T[];
}
// rows是个数组包对象的类型，对返回的对象的每个key进行类型声明
// rows :{
//   warehouseId: number;
//   traderId: number;
//   name: string;
//   description: string;
//   createUserId: number;
//   lastUpdateUserId: number;
//   createTime: string;
//   lastUpdateTime: string;
// }
export type WarehouseListRes = ListRes<WarehouseRecord>;

export interface WarehouseDetails {
  warehouseId: number;
  traderId: number;
  name: string;
  description: string;
  createUserId: number;
  lastUpdateUserId: number;
  createTime: string;
  lastUpdateTime: string;
}

export interface WarehouseCreateReq {
  name: string;
  description?: string;
}

export interface WarehouseUpdateReq {
  name: string;
  description?: string;
  warehouseId: number;
}
