import {
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Button,
  Table,
  TableRow,
  TableCell,
  Typography
} from '@mui/material';
import { generateSxStyles, theme } from '@/config/themes.config';
import { UserDetail, roles } from "@/modules/constants/types/userDetail.types"

interface Props {
	data?: UserDetail | null;
	message?: string;
	open?: boolean;
	loading?: boolean;
	handleClose?(value: boolean): void;
	handleConfirm?(value: boolean): void;
	cancelText?: string;
	confirmText?: string;
	confirmTitle?: string;
}

const UserDetail: React.FC<Props> = ({
	data,
	open=false,
	loading=false,
	handleClose,
}) => {
	const renderRole = (role: string) => {
		return roles.find((r) => r.value === role)?.label
	}

	return (
		<Dialog open={open} onClose={() => {
			handleClose && handleClose(false)
		}}>
			<DialogTitle variant="h5" fontWeight="600">
				Detail Users
			</DialogTitle>

			<Box padding="0 1.5em">
				{loading ? (
					<Box sx={{ minWidth: '500px' }}>
						<Typography variant='body2'>
							Loading user's data. . .
						</Typography>
					</Box>
				) : (
					<Table size="small" sx={styles.tableStyles}>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>{data?.firstName ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Last Name</TableCell>
							<TableCell>{data?.lastName ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell>{data?.username ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>NIP</TableCell>
							<TableCell>{data?.ssn ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Email</TableCell>
							<TableCell>{data?.email ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Phone</TableCell>
							<TableCell>{data?.phone ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Department</TableCell>
							<TableCell>{data?.company?.department ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Role</TableCell>
							<TableCell>
								{renderRole(data?.role ?? '')}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Status</TableCell>
							<TableCell>
								{data?.gender == 'female' ? 'Active' : 'Inactive'}
							</TableCell>
						</TableRow>
					</Table>
				)}
			</Box>

			<DialogActions sx={{ padding: '2em' }}>
				<Button
					variant="outlined"
					onClick={() => {
						handleClose && handleClose(false)
					}}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const Confirm: React.FC<Props> = ({
	message,
	loading,
	open=false,
	handleClose,
	handleConfirm,
	confirmTitle="Confirmation",
	cancelText="Cancel",
	confirmText="Yes"
}) => {
	return(
		<Dialog open={open} onClose={() => {
			handleClose && handleClose(false)
		}}>
			<DialogTitle variant="h5" fontWeight="600">
				{confirmTitle}
			</DialogTitle>

			<Box padding="0 1.5em">
				<div dangerouslySetInnerHTML={{
					__html: message ?? ''
				}} />
			</Box>

			<DialogActions sx={{ padding: '2em' }}>
			<Button
					variant="outlined"
					onClick={() => {
						handleClose && handleClose(false)
					}}
				>
					{cancelText}
				</Button>
				<Button
					variant="contained"
					disabled={loading}
					onClick={() => {
						handleConfirm && handleConfirm(false)
					}}
				>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}


const CustomDialog = {
	UserDetail,
	Confirm
}

export default CustomDialog;

const styles = generateSxStyles({
	tableStyles: {
		minWidth: '500px',

		'.MuiTableRow-root': {
			'.MuiTableCell-root': {
				paddingInline: '0 !important',
				borderBottom: 'none',

				'&:last-of-type': {
					fontWeight: '500'
				}
			}
		}
	}
})