import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/reducers/rootReducer";
import TransactionDataTable from "./transaction-data-table";
import {
  ABORT_TRANSACTION_MSG,
  SUCCESS_TRANSACTION_MSG,
  defaultAlertValue,
} from "../../../constants/common";
import { Box, Button } from "@mui/material";
import PopupModal, { PopupModalProps } from "../../modal/popup-modal";
import AlertBox, { AlertBoxProps } from "../../alert/alert-box";
import TransactionForm from "./transaction-form";
import BankBalanceLabel from "../../bank-balance-label/bank-balance-label";

const Operations = () => {
  const [modelProps, setModelProps] = useState<PopupModalProps>();
  const transactionsState = useSelector(
    (state: AppState) => state.transactions
  );
  const availableBankBalance = transactionsState.response.at(0)?.balance || 0;
  const [alertState, setAlertState] =
    useState<AlertBoxProps>(defaultAlertValue);

  const handleFormSubmission = (isSuccess: boolean | undefined) => {
    handleClose();
    if (isSuccess === true) {
      setAlertState({
        ...alertState,
        message: SUCCESS_TRANSACTION_MSG,
        severity: "success",
        showAlert: true,
      });
    } else {
      setAlertState({
        message: ABORT_TRANSACTION_MSG,
        severity: "error",
        showAlert: true,
      });
    }
  };

  const handleTransaction = (type: "Withdraw" | "Deposit") => {
    setModelProps({
      open: true,
      children: (
        <TransactionForm
          bankBalance={availableBankBalance}
          transactionType={type}
          handleSubmission={handleFormSubmission}
        />
      ),
      title: type === "Deposit" ? "Deposit form" : "Withdraw form",
      onClose: handleClose,
    });
  };

  const handleClose = () => {
    setModelProps({
      open: false,
      children: <></>,
      title: "",
      onClose: handleClose,
    });
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
      <h2>Bank account operations & Transaction history</h2>  
      <Box display={"flex"} flexDirection={"row"}>
        <BankBalanceLabel />
        <Box flex={1} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            color="success"
            style={{ height: "50px", marginRight: "25px" }}
            onClick={() => handleTransaction("Deposit")}
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            color="warning"
            style={{ height: "50px" }}
            disabled={availableBankBalance === 0}
            onClick={() => handleTransaction("Withdraw")}
          >
            Withdraw
          </Button>
        </Box>
      </Box>
      <PopupModal
        open={modelProps?.open || false}
        children={modelProps?.children}
        title={modelProps?.title || ""}
        onClose={handleClose}
      />
      
      <TransactionDataTable />
    </>
  );
};

export default Operations;
