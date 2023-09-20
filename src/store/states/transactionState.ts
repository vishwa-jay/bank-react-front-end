import { ICusTransaction } from "../interfaces/ICusTransaction";

export interface TransactionState {
  loading: boolean;
  response: ICusTransaction[] | [];
  errors?: string;
}
