import { MainLayout } from '@/components/template';
import { useRouter } from 'next/router';
import { NextPage } from "next";

import { Field, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Autocomplete } from '@/components/atoms';
import { Button, Card, FormControl } from 'ddc-ui-typescript';
import { Stack } from '@mui/material';

import { UserDetail } from '@/modules/constants/types/userDetail.types';
import { departments, roles, statuses } from '@/modules/constants/types/userDetail.types';
import { generateSxStyles } from '@/config/themes.config';
import MainService from '@/modules/services/user/https';

const UserCreate: NextPage = () => {
  const router = useRouter()

  const initialValues: UserDetail = {
    firstName: '',
    lastName: '',
    username: '',
    nip: '',
    email: '',
    phone: '',
    department: null,
    role: null,
    status: null
  }

  const FormValidation = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    nip: Yup.string().required('NIP is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    department: Yup.object({
      value: Yup.string().required(),
      label: Yup.string().required()
    }).required('Department is required').nullable(),
    role: Yup.object({
      value: Yup.string().required(),
      label: Yup.string().required()
    }).required('Role is required').nullable(),
    status: Yup.object({
      value: Yup.string().required(),
      label: Yup.string().required()
    }).required('Status is required').nullable(),
    password: Yup.string(),
    passwordConfirmation: Yup.string()
      .when('password', {
        is: (val: string | undefined) => val && val.length > 0,
        then: (schema) =>
          schema
            .required('Password Confirmation is required')
            .oneOf([Yup.ref('password')], 'Password Confirmation does not match'),
        otherwise: (schema) => schema.notRequired(),
      }),
  })

  const formatPayload = (data: any) => {
    const copiedData = JSON.parse(JSON.stringify(data))
    copiedData['role'] = copiedData['role'].value
    copiedData['department'] = copiedData['department'].value
    copiedData['status'] = copiedData['status'].value

    return copiedData
  }

  const handleSubmit = async (value: any) => {
    const formattedData = formatPayload(value)
    const res = await MainService.CreateUser(formattedData)
    if (res) {
      const data = {
        res: res.status == 201 ? 'success' : 'error',
        type: 'add',
        username: res.data.username
      }
      const urlParams = new URLSearchParams(data).toString()
      router.push(`/user?${urlParams}`)
    }
  }

  const handleReset = () => {

  }

  return (
    <MainLayout
      pageTitle='Create New User'
    >
      <Formik
        initialValues={initialValues}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {({
          handleSubmit,
          handleReset,
          isSubmitting,
          dirty,
          isValid,
          setFieldValue,
          values,
        }) => {
          return (
            <>
              <Card
                sx={styles.cardContainer}
                title="General Information"
                headerStyle={styles.header}
                noAction
              >
                <Stack direction="column" spacing={2}>
                  <Field
                    component={FormControl}
                    name="firstName"
                    label="First Name"
                    size="small"
                  />
                  <Field
                    component={FormControl}
                    name="lastName"
                    label="Last Name"
                    size="small"
                  />
                  <Field
                    component={FormControl}
                    name="username"
                    label="Username"
                    size="small"
                  />
                  <Field
                    component={FormControl}
                    name="nip"
                    label="NIP"
                    size="small"
                  />
                  <Field
                    component={FormControl}
                    name="email"
                    label="Email"
                    size="small"
                  />
                  <Field
                    component={FormControl}
                    name="phone"
                    label="Phone"
                    size="small"
                  />
                  <Field
                    component={Autocomplete}
                    name="department"
                    label="Department"
                    options={departments}
                    size="small"
                    getOptionLabel={(option: any) =>
                      option?.label
                    }
                    isOptionEqualToValue={(
                      option: any,
                      value: any
                    ) => option.value == value.value}
                    loading={false}
                    onEnter={handleSubmit}
                    sx={{ minWidth: 200 }}
                  />
                  <Field
                    component={Autocomplete}
                    name="role"
                    label="Role"
                    options={roles}
                    size="small"
                    getOptionLabel={(option: any) =>
                      option?.label
                    }
                    isOptionEqualToValue={(
                      option: any,
                      value: any
                    ) => option.value == value.value}
                    loading={false}
                    onEnter={handleSubmit}
                    sx={{ minWidth: 200 }}
                  />
                  <Field
                    component={Autocomplete}
                    name="status"
                    label="Status"
                    options={statuses}
                    size="small"
                    getOptionLabel={(option: any) =>
                      option?.label
                    }
                    isOptionEqualToValue={(
                      option: any,
                      value: any
                    ) => option.value == value.value}
                    loading={false}
                    onEnter={handleSubmit}
                    sx={{ minWidth: 200 }}
                  />
                </Stack>
              </Card>

              <Card
                sx={styles.cardContainer}
                title="Credentials"
                headerStyle={styles.header}
                noAction
              >
                <Stack direction="column" spacing={2}>
                  <Field
                    component={FormControl}
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                  />
                  <Field
                    component={FormControl}
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    type="password"
                    size="small"
                  />
                </Stack>
              </Card>

              <Card sx={styles.cardContainer} noAction={true}>
                <Stack gap="1em" direction="row" justifyContent="flex-end">
                  <Button
                    text="Cancel"
                    type="button"
                    variant="text"
                    onClick={() => {
                      router.push('/user')
                    }}
                  />
                  <Button
                    text="Save"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!(dirty && isValid) || isSubmitting}
                  />
                </Stack>
              </Card>
            </>
          )
        }}
      </Formik>
    </MainLayout>
  )
}

export default UserCreate;

const styles = generateSxStyles({
  cardContainer: {
    // border: '1px solid red',
    width: '60%',
    marginBottom: '2rem'
  },
  cardActionContainer: {
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  header: {
    borderBottom: '1.25px solid rgba(0, 0, 0, 0.23) !important',
    paddingBottom: '1rem !important',
    '.MuiCardHeader-title': {
      fontWeight: '500 !important',
      fontSize: '1.15rem !important'
    },
  }
})