export interface Item {
  _id: string;
  title: string;
  description: string;
  price: string;
  images: Array<string>;
  createdOn: Date;
  creator: string;
  status: string;
}