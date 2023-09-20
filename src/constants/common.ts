import { AlertBoxProps } from "../components/alert/alert-box";

export const CURRENCY = "SGD";
export const MIN_AMOUNT = 100;
export const MAX_AMOUNT = 100000;
export const MAX_TEXTAREA_LENGHT = 50;

export const defaultAlertValue: AlertBoxProps = {
  message: "",
  severity: "info",
  showAlert: false,
};

//error, success messages
export const REQUIRED_MSG = "Required";
export const MIN_MAX_NUMBER_MSG = `Value should be atleast ${MIN_AMOUNT} and less than ${MAX_AMOUNT}`;
export const MAX_TEXTAREA_LENGHT_MSG = `This field should be less than ${MAX_TEXTAREA_LENGHT}`;
export const SUCCESS_TRANSACTION_MSG = "Transaction completed successfully!";
export const ABORT_TRANSACTION_MSG = "No changes made! Operation abort."
export const MAX_WITHDRAW_MSG = "Sorry, Operation cannot proceed due to insufficient bank balance!";
export const MIN_GOAL_MSG = "Minimum goal amount should be greater than zero and your current balance!";
export const SUCCESS_SAVING_GOAL_MSG = "Your saving goal completed successfully!";
