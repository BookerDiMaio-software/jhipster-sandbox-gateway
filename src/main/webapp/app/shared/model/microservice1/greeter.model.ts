export interface IGreeter {
  id?: number;
  firstName?: string;
  lastName?: string;
  salutation?: string;
}

export const defaultValue: Readonly<IGreeter> = {};
