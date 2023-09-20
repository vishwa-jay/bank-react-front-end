import { combineReducers } from "redux";
import transactionsReducer from "./transactionsReducer";
import savingGoalReducer from "./savingGoalReducer";

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  savingGoal: savingGoalReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;