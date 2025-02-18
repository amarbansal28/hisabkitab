import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/hooks";
import { format } from "date-fns";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  fetchAccounts,
  DeleteAccount,
  SearchAccount,
} from "@/store/apps/accounts/AccountSlice";
import { IconTrash } from "@tabler/icons-react";
import { AccountType } from "../../../(DashboardLayout)/types/apps/accounts";

const AccountListing = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const getVisibleAccounts = (
    accounts: AccountType[],
    filter: string,
    accountSearch: string
  ) => {
    switch (filter) {
      case "total_accounts":
        return accounts.filter(
          (c) =>
            !c.deleted &&
            c.accountTitle.toLocaleLowerCase().includes(accountSearch)
        );

      case "Pending":
        return accounts.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Pending" &&
            c.accountTitle.toLocaleLowerCase().includes(accountSearch)
        );

      case "Closed":
        return accounts.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Closed" &&
            c.accountTitle.toLocaleLowerCase().includes(accountSearch)
        );

      case "Open":
        return accounts.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Open" &&
            c.accountTitle.toLocaleLowerCase().includes(accountSearch)
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const accounts = useSelector((state) =>
    getVisibleAccounts(
      state.accountReducer.accounts,
      state.accountReducer.currentFilter,
      state.accountReducer.accountSearch
    )
  );
  const accountBadge = (account: AccountType) => {
    return account.Status === "Open"
      ? theme.palette.success.light
      : account.Status === "Closed"
      ? theme.palette.error.light
      : account.Status === "Pending"
      ? theme.palette.warning.light
      : account.Status === "Moderate"
      ? theme.palette.primary.light
      : "primary";
  };

  return (
    <Box mt={4}>
      <Box sx={{ maxWidth: "260px", ml: "auto" }} mb={3}>
        <TextField
          size="small"
          label="Search"
          fullWidth
          onChange={(e) => dispatch(SearchAccount(e.target.value))}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Account</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Assigned To</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.Id} hover>
                <TableCell>{account.Id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight={600} noWrap>
                      {account.accountTitle}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      noWrap
                      sx={{ maxWidth: "250px" }}
                      variant="subtitle2"
                      fontWeight={400}>
                      {account.accountDescription}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Avatar
                      src={account.thumb}
                      alt={account.thumb}
                      sx={{
                        borderRadius: "100%",
                        width: "35",
                        height: "35",
                      }}
                    />
                    <Typography variant="h6">{account.AgentName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      backgroundColor: accountBadge(account),
                    }}
                    size="small"
                    label={account.Status}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {format(new Date(account.Date), "E, MMM d")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Account">
                    <IconButton
                      onClick={() => dispatch(DeleteAccount(account.Id))}>
                      <IconTrash size="18" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent={"center"}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default AccountListing;
