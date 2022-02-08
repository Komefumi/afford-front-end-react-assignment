export interface APIPerformRegistrationInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export enum PerformRegistrationStatusEnum {
  NEVER_PERFORMED,
  LOADING,
  SUCCEEDED,
  ERRORED,
}
