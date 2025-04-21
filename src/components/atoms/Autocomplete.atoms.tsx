// #region IMPORT
import { theme } from '@/config/themes.config';
import {
  Autocomplete as MuiAutocomplete,
  SelectChangeEvent,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { FieldProps } from 'formik';
// #endregion

// #region INTERFACE
export type AutocompleteOption = {
  label: string;
  value: string | number;
};
interface AutocompleteProps {
  id?: string;
  label?: string;
  options?: any[];
  required?: boolean;
  helperText?: string;
  error?: string;
  onChange?(newValue: any): void;
  onKeyUp?(event: any): void;
  onEnter?(): void;
  autocomplete?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  field?: any;
  form?: any;
  disabled?: boolean;
  primitive?: boolean;
  size?: 'medium' | 'small';
  isOptionEqualToValue?(option: any, value: any): any;
  value?: any;
  getOptionLabel?(option: any): any;
  key?: any;
  multiple?: boolean;
  placeholder?: string;
  getOptionDisabled?(option: any): any;
}

type Props = AutocompleteProps & FieldProps;
// #endregion

// #region MAIN
const Autocomplete: React.FC<Props> = ({
  id,
  label,
  options,
  onChange,
  field,
  form,
  helperText,
  error,
  autocomplete,
  primitive,
  sx,
  onEnter,
  multiple,
  placeholder,
  onKeyUp,
  ...others
}: Props) => {
  const handleChange = (
    _event: SelectChangeEvent | any,
    selected: string | string[]
  ) => {
    onChange && onChange(selected);
    onEnter && onEnter();
    form?.setFieldValue(field.name, selected);
  };

  return (
    <MuiAutocomplete
      options={options ?? []}
      multiple={multiple}
      onChange={handleChange}
      value={field?.value}
      disableClearable
      renderInput={(params) => (
        <>
          {primitive && label && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              {label}
            </Typography>
          )}
          <TextField
            error={Boolean(form?.errors[field.name])}
            label={!primitive ? label : undefined}
            sx={{
              ...sx,
              '& .MuiSvgIcon-root': {
                color: `${theme.palette.action.active} !important`,
              },
              '& .MuiAutocomplete-clearIndicator': {
                display: 'none',
              },
            }}
            helperText={form?.errors[field.name] || helperText}
            value={field?.value}
            name={field?.name}
            placeholder={placeholder}
            onKeyUp={onKeyUp}
            {...params}
          />
        </>
      )}
      sx={sx}
      {...others}
    />
  );
};
export default Autocomplete;
// #endregion
