export const PATH = {
  HOMEPAGE: '/dashboard',
  AUTH_PAGE: '/auth',
  USER_MANAGEMENT: '/user',
  USER_MANAGEMENT_CREATE: '/user/create',
  USER_MANAGEMENT_EDIT: '/user/[id]',
}

export const ROUTES = [
  {
    path: PATH.HOMEPAGE,
    label: 'Dashboard',
  },
  {
    path: PATH.USER_MANAGEMENT,
    label: 'User List',
  },
  {
    path: PATH.USER_MANAGEMENT_CREATE,
    label: 'Create',
  },
  {
    path: PATH.USER_MANAGEMENT_EDIT,
    label: 'Edit',
  },
]