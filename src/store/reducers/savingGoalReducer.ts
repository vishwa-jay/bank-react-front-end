import { Reducer } from "redux";
import { SavingGoalTypes } from "../actions/savingGoalAction";
import { SavingGoalState } from "../states/savingGoalState";

const initialState: SavingGoalState = {
  response: null,
  errors: undefined,
  loading: false,
};

const savingGoalReducer: Reducer<SavingGoalState> = (state = initialState, action) => {
  switch (action.type) {
    case SavingGoalTypes.GOAL_CREATE_REQUEST: {        
      return { ...state, loading: false, response: action.payload, errors: undefined };
    }
    default: {
      return state;
    }
  }
};

export default savingGoalReducer;
