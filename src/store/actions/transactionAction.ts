import { ICusTransaction } from "../interfaces/ICusTransaction";

export enum TransactionActionTypes {
  TRN_ALL_FETCH_REQUEST = "trn/ALL_FETCH_REQUEST",
  TRN_ALL_FETCH_SUCCESS = "trn/ALL_FETCH_SUCCESS",
  TRN_ALL_FETCH_ERROR = "trn/ALL_FETCH_ERROR",

  TRN_CREATE_REQUEST = "trn/TRN_CREATE_REQUEST",
  TRN_CREATE_SUCCESS = "trn/TRN_CREATE_SUCCESS",
  TRN_CREATE_ERROR = "trn/TRN_CREATE_ERROR",
}

export const getAllTrnList = () => ({
  payload: null,
  type: TransactionActionTypes.TRN_ALL_FETCH_REQUEST,
});

export const createTrn = (newTrn : ICusTransaction) => ({
  payload: newTrn,
  type: TransactionActionTypes.TRN_CREATE_REQUEST,
})
