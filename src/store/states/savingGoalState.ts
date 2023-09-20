import { ICusSavingGoals } from "../interfaces/ICusSavingGoals";

export interface SavingGoalState {
  loading: boolean;
  response: ICusSavingGoals | null;
  errors?: string;
}
