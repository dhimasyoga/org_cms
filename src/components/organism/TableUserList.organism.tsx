import { useRouter } from 'next/router';
import {
    Table,
    TableContainer,
    TablePagination,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Chip,
    Stack,
    IconButton,
    Typography,
} from '@mui/material';
import { UserList } from '@/modules/constants/types/userList.types';
import { generateSxStyles, theme } from '@/config/themes.config';
import { UserDetail, departments, roles, rolesChipColor } from '@/modules/constants/types/userDetail.types';
import { Visibility, Create, Delete } from '@mui/icons-material';

// #region INTERFACE
interface Props {
  rows?: UserDetail[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPreviewClick?(id: number): void;
  onDeleteClick?(id: number, name: string): void;
  onRemove?(row: UserList): void;
  loading?: boolean;
  refetch?: () => void;
}
// #endregion

const RenderRole = (value: string) => {
  const find = roles.find(role => role.value === value)
  const label = find ? find.label : '-'
  const chipColor = rolesChipColor[
    value as keyof typeof rolesChipColor
  ] ?? theme.palette.info.main

  return (
    <Chip
      size="small"
      label={label}
      sx={{
        color: theme.palette.common.white,
        backgroundColor: chipColor,
      }}
    />
  )
}

const TableUserList: React.FC<Props> = ({
  rows,
  count = 0,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onPreviewClick,
  onDeleteClick,
  onRemove,
  refetch,
  loading
}) => {
  const route = useRouter();
  const handlePreview = (id: number) => {
    onPreviewClick && onPreviewClick(id)
  }

  const handleDelete = (id: number, name: string) => {
    onDeleteClick && onDeleteClick(id, name)
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography variant="body2" textAlign="center">
                    Loading. . .
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.firstName} {row.lastName}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row?.company?.department}</TableCell>
                  <TableCell align="center">{RenderRole(row.role ?? '')}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        size="small"
                        sx={{
                          color: theme.palette.action.active 
                        }}
                        onClick={() => {
                          handlePreview(Number(row.id) ?? 1)
                        }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: theme.palette.action.active
                        }}
                        onClick={() => {
                          route.push(`/user/${row.id}`)
                        }}
                      >
                        <Create />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleDelete(Number(row.id), row?.username ?? '-')
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        component={Paper}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  )
}

export default TableUserList;

const styles = generateSxStyles({
  table: {
    minWidth: 650,

    '.MuiTableRow-head': {
      backgroundColor: theme.palette.primary.main,
      
      '.MuiTableCell-head': {
        color: `${theme.palette.common.white} !important`
      }
    },
  }
})