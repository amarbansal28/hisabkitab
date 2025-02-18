import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/hooks";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  fetchAccounts,
  SearchAccount,
} from "@/store/apps/accounts/AccountSlice";
import { AccountType } from "@/app/(DashboardLayout)/types/apps/accounts";

const AccountListing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const accounts = useSelector((state) => state.accountReducer.accounts);

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
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Mobile</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">OTP</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account: AccountType, index: number) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight={600} noWrap>
                      {account?._id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight={600} noWrap>
                      {account?.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Typography variant="h6">{account.mobile}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{account.OTP}</Typography>
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
