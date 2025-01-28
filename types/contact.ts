export interface IContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export type ISection = {
  title: string;
  data: IContact[];
};
