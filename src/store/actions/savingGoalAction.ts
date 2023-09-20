import { ICusSavingGoals } from "../interfaces/ICusSavingGoals";

export enum SavingGoalTypes {
  GOAL_CREATE_REQUEST = "saving/GOAL_CREATE_REQUEST",
}

export const createGoal = (newTrn: ICusSavingGoals) => ({
  payload: newTrn,
  type: SavingGoalTypes.GOAL_CREATE_REQUEST,
});
