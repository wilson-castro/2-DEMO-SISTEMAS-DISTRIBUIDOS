import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  IconButton,
  LabelDisplayedRowsArgs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow
} from '@mui/material';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@mui/icons-material';
import { ILog } from '../types/IData';


interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: Readonly<TablePaginationActionsProps>) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
  &:nth-of-type(even) {
    background-color: "grey";
  }
`;

export interface CustomPaginationActionsTable {
  data: ILog[];
}

export default function CustomPaginationActionsTable({
  data,
}: Readonly<CustomPaginationActionsTable>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <StyledTableRow key={row.hora_envio}>
              <TableCell component="th" style={{ width: 30 }} scope="row">
                {row.ip_origem}
              </TableCell>
              <TableCell style={{ width: 210 }}>
                {new Date(row.hora_envio).toLocaleString()}
              </TableCell>
              <TableCell align="left">
                {row.data}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Linhas por página"
              labelDisplayedRows={getLabelDisplayedRows}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const getLabelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
  if (count !== -1) {
    return `${from}–${to} de ${count}`;
  } else {
    return `mais que ${to}`;
  }
};
