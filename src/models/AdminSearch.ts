export interface TableSearch {
  _id: string;
  date: string;
  seating: string;
  personAmount: string;
  tableamount: string;
  customer: string;
}
export interface TableSearchResponse {
  data: {
    bookingsByDate: TableSearch[];
    tableSumSeatingOne: number;
    tableSumSeatingTwo: number;
  };
}

export interface CustomerSearch {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CustomerSearchResponse {
  data: CustomerSearch[];
}

export interface TableInfo {
  date: string;
  seating: string;
  personAmount: string;
  tableamount: string;
  customer: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface TableAmountSum {
  tableSumSeatingOne: number;
  tableSumSeatingTwo: number;
}
