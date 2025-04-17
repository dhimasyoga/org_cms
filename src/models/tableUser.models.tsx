import { UserList } from "@/modules/constants/types/userList.types";
import { Chip, TableCell } from "@mui/material";
import { CustomColumnRender, TableColumn } from "ddc-ui-typescript/dist/components/Table/Table.types";
import {
  departments,
  roles,
  rolesChipColor
} from "@/modules/constants/types/userDetail.types";
import { theme } from "@/config/themes.config";

const RenderDepartments: CustomColumnRender<UserList> = {
  desktop: (row) => {
    const find = departments.find(dept => dept.value === row.data.department)
    const label = find ? find.label : '-'

    return (
      <TableCell key={row.colIndex}>
        {label}
      </TableCell>
    )
  }
}
const RenderRole: CustomColumnRender<UserList> = {
  desktop: (row) => {
    const find = roles.find(role => role.value === row.data.role)
    const label = find ? find.label : '-'
    const chipColor = rolesChipColor[
      row.data.role as keyof typeof rolesChipColor
    ] ?? theme.palette.info.main

    return (
      <TableCell key={row.colIndex} sx={{
        textAlign: 'center'
      }}>
        <Chip
          size="small"
          label={label}
          sx={{
            color: theme.palette.common.white,
            backgroundColor: chipColor,
          }}
        />
      </TableCell>
    );
  },
};

export const columnsUser: TableColumn<UserList>[] = [
  {
    field: 'id',
    label: 'User ID',
    options: { sx: { minWidth: 100 } }
  },
  {
    field: 'fullname',
    label: 'Fullname',
    options: { sx: { minWidth: 175 } }
  },
  {
    field: 'username',
    label: 'Username',
    options: { sx: { minWidth: 120 } }
  },
  {
    field: 'phone',
    label: 'Phone',
    options: { sx: { minWidth: 150 } }
  },
  {
    field: 'department',
    label: 'Department',
    options: { sx: { minWidth: 150 } },
    customRender: RenderDepartments
  },
  {
    field: 'role',
    label: 'Role',
    options: { sx: { minWidth: 175, textAlign: 'center' } },
    customRender: RenderRole
  }
]