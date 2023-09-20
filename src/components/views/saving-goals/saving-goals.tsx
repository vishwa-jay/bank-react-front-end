import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/reducers/rootReducer";
import { Box, Button, Stack, Typography } from "@mui/material";
import BankBalanceLabel from "../../bank-balance-label/bank-balance-label";
import CustomTextField from "../../custom-text-field/custome-text-field";
import { Form } from "react-final-form";
import {
    CURRENCY,
  MIN_GOAL_MSG,
  REQUIRED_MSG,
  SUCCESS_SAVING_GOAL_MSG,
  defaultAlertValue,
} from "../../../constants/common";
import { ICusSavingGoals } from "../../../store/interfaces/ICusSavingGoals";
import { checkMinNumberValue } from "../../../utils/validations";
import { createGoal } from "../../../store/actions/savingGoalAction";
import { v4 as uuidv4 } from "uuid";
import AlertBox, { AlertBoxProps } from "../../alert/alert-box";
import { useState } from "react";
import { calcGoalAndBalanceDifference } from "../../../utils/calculations";

const SavingGoals = () => {
  const initValue = undefined;
  const dispatch = useDispatch();
  const transactionsState = useSelector(
    (state: AppState) => state.transactions
  );
  const goalState = useSelector((state: AppState) => state.savingGoal);
  const availableBankBalance = transactionsState.response.at(0)?.balance || 0;
  const [alertState, setAlertState] =
    useState<AlertBoxProps>(defaultAlertValue);

  const goalBalanceDifference = calcGoalAndBalanceDifference(
    availableBankBalance,
    goalState.response?.goal_amount
  );

  const onSubmit = (e: ICusSavingGoals) => {
    const newGoalAmount = parseFloat(String(e.goal_amount));
    dispatch(
      createGoal({
        id: uuidv4(),
        cus_id: "",
        goal_amount: newGoalAmount,
      })
    );
    setAlertState({
      ...alertState,
      message: SUCCESS_SAVING_GOAL_MSG,
      severity: "success",
      showAlert: true,
    });
  };

  const validate = (values: ICusSavingGoals) => {
    const errors = { goal_amount: "" };

    if (!values.goal_amount) {
      errors.goal_amount = REQUIRED_MSG;
    }

    if (
      checkMinNumberValue(values.goal_amount, 0) ||
      checkMinNumberValue(values.goal_amount, availableBankBalance)
    ) {
      errors.goal_amount = MIN_GOAL_MSG;
    }

    //checking if the errors object is equal to error less state
    if (JSON.stringify(errors) === JSON.stringify({ goal_amount: "" })) {
      return undefined;
    }
    return errors;
  };

  const dismissAlert = () => setAlertState(defaultAlertValue);
  setTimeout(dismissAlert, 4000);

  return (
    <>
      {alertState.showAlert && (
        <AlertBox
          showAlert={alertState.showAlert}
          message={alertState.message}
          severity={alertState.severity}
        />
      )}
      <h2>Saving Goals</h2>
      <Box display={"flex"} flexDirection={"row"}>
        <Box flex={1}>
          <BankBalanceLabel />
          <Box flex={2}>
            <Form
              onSubmit={onSubmit}
              initialValues={initValue}
              validate={(values) => validate(values)}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Stack sx={{ width: "500px" }} spacing={1}>
                    <CustomTextField
                      name="goal_amount"
                      label="Enter your goal amount"                      
                      type="number"
                    />
                    <Box display="flex" flexDirection="row" sx={{ m: 1 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ mr: 1 }}
                      >
                        Update Saving Goal
                      </Button>
                    </Box>
                  </Stack>
                </form>
              )}
            />
          </Box>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{border: "1px solid #aaa", padding: "20px"}}
        >
          <Typography variant="h5" style={{color: "#00b20d"}}>{goalState.response?.goal_amount ? `Your goal is ${goalState.response?.goal_amount} ${CURRENCY}`:"Create a goal!"}</Typography>
          <Typography variant="h5">
            Your bank balance as a percentage of your goal
          </Typography>
          <Typography
            variant="h3"
            style={{}}
          >{`${goalBalanceDifference}%`}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default SavingGoals;
