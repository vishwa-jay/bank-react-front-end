import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {
  OPERATIONS_ROUTE,
  SAVING_GOALS_ROUTE,
} from "../../constants/routes";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ABC Bank
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" onClick={() => navigate(OPERATIONS_ROUTE)}>
                Banking Operations
              </Button>
              <Button color="inherit" onClick={() => navigate(SAVING_GOALS_ROUTE)}>
                Saving Goals
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box p={2}>{props.children}</Box>
    </Box>
  );
};

export default Layout;
