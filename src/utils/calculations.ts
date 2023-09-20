export const calcBankBalance = (
  balance: number,
  amount: number,
  trnType: "Withdraw" | "Deposit"
) => {
  const availableBankBalance = balance;
  let newBankBalance = 0;

  if (trnType === "Withdraw") {
    newBankBalance = availableBankBalance - amount;
  } else if (trnType === "Deposit") {
    newBankBalance = availableBankBalance + amount;
  }

  return newBankBalance;
};


export const calcGoalAndBalanceDifference = (balance: number, goal: number | undefined) =>{
    let percentage = 0;
    if(!goal){
        return percentage;
    }
   
    if(balance > 0 && goal > balance){
        percentage = (balance / goal) *100;
    }

    return percentage.toFixed(2);
}