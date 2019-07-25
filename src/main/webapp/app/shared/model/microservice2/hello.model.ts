export interface IHello {
  id?: number;
  firstName?: string;
  lastName?: string;
  salutation?: string;
}

export const defaultValue: Readonly<IHello> = {};
