/* eslint-disable no-unused-vars */

export enum FetchApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum SearchFiltersParams {
  PAGE = "page",
  PER_PAGE = "per_page",
  SEARCH = "search",
  SORT = "sort",
  SORT_TYPE = "sort_type",
  CITY = "city",
}

export enum EmailType {
  LATE_CHECKOUT = "late_checkout",
  REAL_ESTATE_AGENT_FORM = "real_estate_agent_form",
}

export enum LocalStorageKey {
  CITY_LIST = "city_list",
}

export enum ModuleNames {
  VENDOR = "vendor",
  PROPERTY = "property",
  INQUIRY = "inquiry",
}
