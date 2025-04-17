import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/template';
import { PersonAdd } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { NextPage } from "next";
import { Alert } from 'ddc-ui-typescript';
import { AlertProps } from 'ddc-ui-typescript/dist/components/Alert/Alert';

import { FilterListUser } from '@/components/molecules';
import {
  UserFilterParams,
} from '@/modules/constants/types/userList.types';
import {
  UserDetail,
} from '@/modules/constants/types/userDetail.types';
import MainService from '@/modules/services/user/https';

import {
  TableUser,
  CustomDialog
} from '@/components/organism';
import { FormikHelpers } from 'formik';

interface CustomAlertProps extends AlertProps {
  open?: boolean
  customOnClose?: () => any
}

const UserList: NextPage = () => {
  const router = useRouter()
  const urlParams = router.query;

  const [user, setUser] = useState<any>({})
  const [alert, setAlert] = useState<CustomAlertProps>({})
  const [tableLoading, setTableLoading] = useState(true)
  const [userList, setUserList] = useState<UserDetail[]>([])

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0)
  const [params, setParams] = useState<UserFilterParams>({
    username: '',
    phone: '',
    department: '',
    role: '',
    skip: 0,
    limit: 10,
  })

  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false)
  const [dialogConfirmContent, setDialogConfirmContent] = useState('')
  const [dialogConfirmLoading, setDialogConfirmLoading] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogLoading, setDialogLoading] = useState(false)
  const [dialogData, setDialogData] = useState<UserDetail>({})

  const getUser = async (data?: UserFilterParams) => {
    setTableLoading(true)

    const res = await MainService.GetUser(data ?? params)
    setUserList(res.data.users)
    setCount(res.data.total)

    setTableLoading(false)
  }

  const onPageChange = async (newPage: number) => {
    setPage(newPage);

    let updatedParam = JSON.parse(JSON.stringify(params))
    updatedParam['skip'] = newPage * rowsPerPage

    setParams(updatedParam);
    getUser(updatedParam)
  };

  const onRowsPerPageChange = async (e: any) => {
    const limit = e?.target?.value ?? 5

    setPage(0);
    setRowsPerPage(limit);

    let updatedParam = JSON.parse(JSON.stringify(params))
    updatedParam['skip'] = 0
    updatedParam['limit'] = limit

    setParams(updatedParam);
    getUser(updatedParam)
  };

  const deleteUser = async () => {
    setDialogConfirmLoading(true)
    const res = await MainService.DeleteUser(user.id)

    if (res.status == 200) {
      setAlert({
        open: true,
        message: `User ${user.name} successfully deleted`,
        severity: 'success',
        variant: 'standard',
      })
    } else {
      setAlert({
        open: true,
        message: res.statusText,
        severity: 'error',
        variant: 'standard',
      })
    }

    setDialogConfirmLoading(false)
    setDialogConfirmOpen(false)
  }

  const displayCrudResponseAlert = () => {
    const username = urlParams?.username ?? '-'
    const resType = urlParams?.type
    const msg = resType == 'add'
                      ? 'added'
                      : resType == 'update'
                      ? 'updated'
                      : ''

    setAlert({
      open: true,
      severity: urlParams.res as 'success' | 'error' | 'info' | 'warning',
      variant: 'standard',
      message: urlParams?.res == 'success'
                ? `User ${username} already successfully ${msg}`
                : 'Error!',
      customOnClose: () => {
        router.replace('/user', undefined, { shallow: true })
      }
    })
  }

  useEffect(() => {
    getUser()

    Object.keys(urlParams).length > 0 && (displayCrudResponseAlert())
  }, [])

  const handleSubmit = async (
    value: any,
    actions: FormikHelpers<UserFilterParams>
  ) => {
    let filterParam = JSON.parse(JSON.stringify(params))
    filterParam['username'] = value?.username ?? ''
    filterParam['phone'] = value?.phone ?? ''
    filterParam['department'] = value?.department?.label ?? ''
    filterParam['role'] = value?.role?.value ?? ''
    filterParam['skip'] = 0

    setPage(0);
    setParams(filterParam)
    getUser(filterParam)

    actions.setSubmitting(false)
  }

  const handleReset = async (
    values: UserFilterParams,
    actions: FormikHelpers<UserFilterParams>
  ) => {
    setParams({
      username: '',
      phone: '',
      department: '',
      role: '',
      skip: 0,
      limit: 10,
    })

    getUser()

    actions.setSubmitting(false)
  }

  const handlePreviewClick = async (value: number) => {
    setDialogLoading(true)
    setDialogOpen(true)

    const data = await MainService.GetUserById(value)
    setDialogData(data)

    setDialogLoading(false)
  }

  const confirmDeleteClick = async (id: number, name: string) => {
    setUser({ id: id, name: name })
    setDialogConfirmContent(`User <b>${name}</b> will be deleted.`)
    setDialogConfirmOpen(true)
  }

  return (
    <MainLayout
      pageTitle='User Management List'
      addAction={() => {
        router.push('user/create')
      }}
      addActionText='New User'
      addActionIcon={<PersonAdd />}
    >
      {alert.open && (
        <Alert
          variant={alert.variant}
          severity={alert.severity}
          message={alert.message}
          sx={{ marginBottom: '1rem' }}
          onClose={() => {
            alert.customOnClose && (alert.customOnClose())
            setTimeout(() => {
              setAlert({})
            }, 350)
          }}
        />
      )}
      <FilterListUser onSubmit={handleSubmit} onReset={handleReset} />

      {/* <TableUser rows={dummyUsers} /> */}
      <TableUser
        rows={userList}
        loading={tableLoading}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(page) => onPageChange(page)}
        onRowsPerPageChange={(v: any) => onRowsPerPageChange(v)}
        onPreviewClick={handlePreviewClick}
        onDeleteClick={confirmDeleteClick}
      />

      <CustomDialog.UserDetail
        open={dialogOpen}
        data={dialogData}
        loading={dialogLoading}
        handleClose={() => {
          setDialogOpen(false)
        }}
      />
      <CustomDialog.Confirm
        confirmTitle="Are You Sure?"
        confirmText="Yes, Sure"
        open={dialogConfirmOpen}
        loading={dialogConfirmLoading}
        message={dialogConfirmContent}
        handleClose={() => {
          setDialogConfirmOpen(false)
        }}
        handleConfirm={() => {
          deleteUser()
        }}
      />
    </MainLayout>
  )
}

export default UserList;