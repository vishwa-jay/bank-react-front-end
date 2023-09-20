import { Box } from "@mui/material";
import DataTable from "../../data-table/data-table.component";
import { AppState } from "../../../store/reducers/rootReducer";
import { useSelector } from "react-redux";

const TransactionDataTable = () =>{
    const transactionsState = useSelector((state: AppState) => state.transactions);
    
    const columns = [
        { field: "id", width: 300 },
        { field: "remarks", width: 300 },
        { field: "amount",width: 200,  },
        { field: "balance",width: 200,  },
        { field: "trn_date", headerName: "Transaction Date", width: 300, },
        { field: "trn_type", headerName: "Withdraw/Deposit", width: 200},   
      ];
    
    return <>
      <Box>
        <DataTable
          cols={columns}
          rows={transactionsState.response}
          tableHeight={450}
          tableWidth={1500}
        />
      </Box>
    </>;
}

export default TransactionDataTable;