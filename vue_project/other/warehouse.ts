import request from "@/utils/request";
import {
  WarehouseListReq,
  WarehouseListRes,
  WarehouseDetails,
  WarehouseCreateReq,
  WarehouseUpdateReq
} from "@/types/warehouse";

//仓库列表
export function getListApi(params: WarehouseListReq) {
  return request<WarehouseListRes>({
    method: "get",
    url: "/api/warehouse/list",
    params,
  });
}

//仓库详情
export function getDetailsApi(warehouseId: number) {
  return request<WarehouseDetails>({
    method: "get",
    url: `/api/warehouse/${warehouseId}`
  });
}

//创建仓库
export function createApi(data: WarehouseCreateReq) {
  return request<any>({
    method: "post",
    url: "/api/warehouse/create",
    data,
  });
}

//更新仓库
export function updateApi(data: WarehouseUpdateReq) {
  return request<any>({
    method: "post",
    url: "/api/warehouse/update",
    data,
  });
}