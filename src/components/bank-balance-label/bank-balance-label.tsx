import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../store/reducers/rootReducer";
import { CURRENCY } from "../../constants/common";

const BankBalanceLabel = () => {
  const transactionsState = useSelector(
    (state: AppState) => state.transactions
  );
  const availableBankBalance = transactionsState.response.at(0)?.balance || 0;

  return (
    <Box flex={2} sx={{ marginBottom: "20px" }}>
      <Typography
        variant="h4"
        style={{ marginBottom: "5px", fontSize: "20px" }}
      >
        Current available balance
      </Typography>
      <Typography
        variant="h3"
        style={{ fontSize: "32px" }}
        color={"#f50a"}
      >{`${availableBankBalance.toFixed(2)} ${CURRENCY}`}</Typography>
    </Box>
  );
};

export default BankBalanceLabel;
