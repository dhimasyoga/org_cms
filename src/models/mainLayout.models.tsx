import { PATH } from '@/modules/constants/string';
import {
  Home,
  Group
} from '@mui/icons-material';
import {
  NavigationGroup,
  Profile,
  SubNavigationList,
} from 'ddc-ui-typescript/dist/constants/types';

export const navigationList: NavigationGroup[] = [
  {
    title: '',
    data: [
      {
        icon: <Home />,
        href: PATH.HOMEPAGE,
        label: 'Dashboard',
        isActive: [PATH.HOMEPAGE, ''],
      },
      {
        icon: <Group />,
        href: PATH.USER_MANAGEMENT,
        label: 'User List',
        isActive: [
            PATH.USER_MANAGEMENT,
            PATH.USER_MANAGEMENT_CREATE,
            PATH.USER_MANAGEMENT_EDIT
        ],
      },
    ],
  },
];

export const settings: SubNavigationList[] = [
  { href: '#', label: 'Profile' },
  { href: '#', label: 'Logout' },
];

export const profile: Profile = {
  name: '',
  imageUrl: 'https://i.pravatar.cc/150?img=52',
};
