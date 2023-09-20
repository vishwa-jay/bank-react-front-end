import { Reducer } from "redux";
import { TransactionState } from '../states/transactionState';
import { TransactionActionTypes } from "../actions/transactionAction";
  
  const initialState: TransactionState = {
    response: [],
    errors: undefined,
    loading: false
  };
  
  const transactionsReducer: Reducer<TransactionState> = (state = initialState, action) => {
    switch (action.type) {
        case TransactionActionTypes.TRN_ALL_FETCH_REQUEST: {
          return state;
        } 
        case TransactionActionTypes.TRN_CREATE_REQUEST: {debugger
          return {
            ...state,
            response : [action.payload, ...state.response]
          };
        }
        
        default: {
          return state;
        }
      }
  };

  export default transactionsReducer;