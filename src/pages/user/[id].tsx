import { MainLayout } from '@/components/template';
import { useRouter } from 'next/router';
import { NextPage } from "next";

import { Field, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Autocomplete } from '@/components/atoms';
import { Button, Card, FormControl } from 'ddc-ui-typescript';
import { Stack, Typography } from '@mui/material';
import MainService from '@/modules/services/user/https';

import {
    UserDetail as UserDetailProps,
} from '@/modules/constants/types/userDetail.types';
import { departments, roles, statuses } from '@/modules/constants/types/userDetail.types';
import { generateSxStyles } from '@/config/themes.config';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const session = await getSession({ req });
  const userToken = session?.accessToken;

  try {
    if (!userToken) return { redirect: { destination: '/auth', permanent: false } };
    return { props: { session } };
  } catch (error) {
    console.log(error);
  }
};


const UserDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserDetailProps>({
    firstName: '',
    lastName: '',
    username: '',
    nip: '',
    email: '',
    phone: '',
    department: null,
    role: null,
    status: null
  })

  const formatUserDetail = (data: any) => {
    const parsed: any = JSON.parse(JSON.stringify(data))
    delete parsed['password']

    parsed['status'] = {
      label: data.gender == 'female' ? 'Active' : 'Inactive' ,
      value: data.gender == 'female' ? 'active' : 'inactive' 
    }
    parsed['department'] = {
      label: data.company.department,
      value: departments.find((dep) => dep.label === data.company.department)?.value
    }
    parsed['role'] = {
      label: roles.find((role) => role.value === data.role)?.label,
      value: data.role
    }

    parsed['nip'] = data.ssn
    return parsed
  }

  const getUserDetailData = async () => {
    const res = await MainService.GetUserById(Number(id))
    const formattedRes = formatUserDetail(res)
    setUserData(formattedRes)

    setLoading(false)
  }

  useEffect(() => {
    getUserDetailData()
  }, [])

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
    const parsed = JSON.parse(JSON.stringify(data))
    
    parsed['status'] = parsed.status.value
    parsed['company']['department'] = parsed.department.label
    parsed['role'] = parsed.role.value

    delete parsed['department']
    return parsed
  }

  const handleSubmit = async (
    value: UserDetailProps,
    actions: FormikHelpers<UserDetailProps>
  ) => {
    actions.setSubmitting(true)
    const formattedPayload = formatPayload(value)
    const res = await MainService.UpdateUser(Number(id), formattedPayload)

    if (res) {
      const data = {
        res: res.status == 200 ? 'success' : 'error',
        type: 'update',
        username: res.data.username
      }
      const urlParams = new URLSearchParams(data).toString()
      router.push(`/user?${urlParams}`)
    }
  }

  return (
    <MainLayout
      pageTitle='Edit User'
    >
      {loading ? (
        <Typography variant='body2'>
          Loading data. . .
        </Typography>
      ) : (
        <>
          <Formik
            enableReinitialize
            initialValues={userData}
            validationSchema={FormValidation}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              isValid,
              dirty,
              handleReset,
              isSubmitting,
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
                        value={userData.firstName}
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
                        ) => option.value == value}
                        loading={false}
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
                        ) => option.value == value}
                        loading={false}
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
                        ) => {
                          return option.value == value
                        }}
                        loading={false}
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
        </>
      )}
    </MainLayout>
  )
}

export default UserDetail;

const styles = generateSxStyles({
  cardContainer: {
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