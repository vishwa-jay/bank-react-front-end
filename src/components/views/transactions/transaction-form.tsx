import { Form } from "react-final-form";
import CustomTextField from "../../custom-text-field/custome-text-field";
import { Box, Button, Stack } from "@mui/material";
import { MAX_AMOUNT, MAX_TEXTAREA_LENGHT, MAX_TEXTAREA_LENGHT_MSG, MAX_WITHDRAW_MSG, MIN_AMOUNT, MIN_MAX_NUMBER_MSG, REQUIRED_MSG} from "../../../constants/common";
import { ICusTransaction } from "../../../store/interfaces/ICusTransaction";
import { useDispatch } from "react-redux";
import { createTrn } from "../../../store/actions/transactionAction";
import { checkMaxNumberValue, checkMinNumberValue, checkStringMaxLength } from "../../../utils/validations";
import { calcBankBalance } from "../../../utils/calculations";
import { v4 as uuidv4 } from 'uuid';

interface TransactionFormProps {
    bankBalance: number;
    transactionType: "Withdraw" | "Deposit";
    handleSubmission: (isSubmissionSuccessfull?: boolean) => void;
}

const TransactionForm = (props: TransactionFormProps) => {
  
  const initDepositValues = undefined;
  const dispatch = useDispatch();

  const validate = (values: ICusTransaction) => {
    const errors = { amount: "", remarks: ""};

    if (!values.amount) {
      errors.amount = REQUIRED_MSG;
    }

    if (!values.remarks) {
      errors.remarks = REQUIRED_MSG;
    }

    if (
      checkMinNumberValue(values.amount, MIN_AMOUNT) ||
      checkMaxNumberValue(values.amount, MAX_AMOUNT)
    ) {
      errors.amount = MIN_MAX_NUMBER_MSG;
    }

    if (checkStringMaxLength(values.remarks, MAX_TEXTAREA_LENGHT)) {
      errors.remarks = MAX_TEXTAREA_LENGHT_MSG;
    }

    if(values.amount > props.bankBalance && props.transactionType === "Withdraw"){
      errors.amount = MAX_WITHDRAW_MSG;
    }

    //checking if the errors object is equal to error less state
    if (
      JSON.stringify(errors) ===
      JSON.stringify({ amount: "", remarks: ""})
    ) {
      return undefined;
    }
    return errors;
  };

  const onSubmit = (e: ICusTransaction) => { 
    const newAmount = parseFloat(String(e.amount));
    const newBalance = calcBankBalance(props.bankBalance, newAmount, props.transactionType);
    const newDepositData: ICusTransaction = {
      id: uuidv4(),
      amount: newAmount,
      balance: newBalance,
      cus_id: "",
      remarks: e.remarks,
      trn_date: new Date().toDateString(),
      trn_type: props.transactionType,
    };

    dispatch(createTrn(newDepositData));
    props.handleSubmission(true);
  };

  const handleCancel = () => {
    props.handleSubmission(false);
  };

  return (
    <>      
      <Form
        onSubmit={onSubmit}
        initialValues={initDepositValues}
        validate={(values) => validate(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack sx={{ width: "500px" }} spacing={1}>
              <CustomTextField
                name="amount"
                label={`${props.transactionType} Amount*`}
                textBoxFullWidth
                type="number"
              />
              <CustomTextField
                name="remarks"
                label="Remarks*"
                textBoxFullWidth
                isMultiline
                rows={2}
              />

              <Box display="flex" flexDirection="row" sx={{ m: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                >
                  Complete Transaction
                </Button>
                <Button variant="contained" color="info" onClick={handleCancel}>
                  Cancel Transaction
                </Button>
              </Box>
            </Stack>
          </form>
        )}
      />
    </>
  );
};

export default TransactionForm;
