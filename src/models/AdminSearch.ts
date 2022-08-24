export interface AdminSearch {
  _id: string;
  date: string;
  seating: string;
  tableamount: string;
  customer: string;
}

export interface customerSearch {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface customerSearchResponse {
  data: customerSearch[];
}
