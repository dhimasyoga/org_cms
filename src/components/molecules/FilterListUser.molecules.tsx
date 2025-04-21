import { Card } from 'ddc-ui-typescript';
import { Field, Formik, FormikHelpers } from 'formik';
import { Stack } from '@mui/material';
import { FormControl } from 'ddc-ui-typescript';
import { RefreshRounded } from '@mui/icons-material';
import { Autocomplete, IconButton } from '../atoms';
import { generateSxStyles, theme } from '@/config/themes.config';
import {
  UserFilterParams,
} from '@/modules/constants/types/userList.types';
import {
  departments,
  roles
} from '@/modules/constants/types/userDetail.types';

// #region INTERFACE
interface Props {
  onSubmit?(
    values: UserFilterParams,
    actions: FormikHelpers<UserFilterParams>
  ): void;
  onReset?(
    values: UserFilterParams,
    actions: FormikHelpers<UserFilterParams>
  ): void;
}
// #endregion

const FilterListUser: React.FC<Props> = ({ onSubmit, onReset }) => {
  const initialValues: UserFilterParams = {
    username: '',
    phone: '',
    department: null,
    role: null
  };

  const handleSubmit = (
    values: UserFilterParams,
    actions: FormikHelpers<UserFilterParams>
  ) => {
    onSubmit && onSubmit(values, actions);
  };

  const handleReset = (
    values: UserFilterParams,
    actions: FormikHelpers<UserFilterParams>
  ) => {
    onReset && onReset(values, actions);
  };

  return (
    <Card noAction sx={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {({
          handleSubmit,
          handleReset,
          isSubmitting,
          setFieldValue,
          values,
        }) => {
          return (
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Stack direction="row" spacing={1}>
                <Field
                  component={FormControl}
                  name="username"
                  label="Username"
                  size="small"
                  onEnter={handleSubmit}
                />
                <Field
                  component={FormControl}
                  name="phone"
                  label="Phone"
                  size="small"
                  onEnter={handleSubmit}
                />
                <Field
                  component={Autocomplete}
                  name="department"
                  label="Department"
                  size="small"
                  options={departments}
                  getOptionLabel={(option: any) =>
                    option?.label
                  }
                  isOptionEqualToValue={(
                    option: any,
                    value: any
                  ) => option.value == value.value}
                  loading={false}
                  onChange={handleSubmit}
                  sx={{ minWidth: 200 }}
                />
                <Field
                  component={Autocomplete}
                  name="role"
                  label="Role"
                  size="small"
                  options={roles}
                  getOptionLabel={(option: any) =>
                    option?.label
                  }
                  isOptionEqualToValue={(
                    option: any,
                    value: any
                  ) => option.value == value.value}
                  loading={false}
                  onChange={handleSubmit}
                  sx={{ minWidth: 200 }}
                />
              </Stack>

              <IconButton
                label="Reset"
                icon={<RefreshRounded />}
                sx={{ height: 40 }}
                onClick={() => {
                  handleReset()
                }}
                disabled={isSubmitting}
              />
            </Stack>
          )
        }}
      </Formik>
    </Card>
  )
}

export default FilterListUser

const styles = generateSxStyles({
  container: {
    mb: 3,
    overflow: 'auto',
    '.MuiCardContent-root': {
      p: 2,
      pb: '16px !important',
    },
    '.MuiFormControl-root': {
      minWidth: 100,
      '.MuiFormHelperText-root': { display: 'none' },
    },
  },
})