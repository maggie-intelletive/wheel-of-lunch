export interface Order {
  id: number;
  resId: number;
  dateOrdered: Date;
  cost: number;
  dishes: string;
  personWhoOrdered: string;
  resDto?: any;
}
