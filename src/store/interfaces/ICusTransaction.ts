export interface ICusTransaction {
  id: string;
  cus_id: string;
  remarks: string;
  amount: number;
  balance: number;
  trn_date: string;
  trn_type: "Withdraw" | "Deposit";
}
