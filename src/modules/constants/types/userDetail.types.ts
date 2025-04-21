import { theme } from "@/config/themes.config";

export interface UserDetail {
  id?: string;
  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color: string;
    type: string;
  }
  ip?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    },
    country: string;
  },
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  },
  company?: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      },
      country: string;
    }
  },
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: {
    coin: string;
    wallet: string;
    network: string;
  },
  role?: string | null;
  nip?: string;
  department?: string | null;
  status?: string | null;
}

export const departments = [
  {
    value: 'eng',
    label: 'Engineering'
  },
  {
    value: 'rnd',
    label: 'Research and Development'
  },
  {
    value: 'sup',
    label: 'Support'
  },
  {
    value: 'pm',
    label: 'Product Management'
  },
  {
    value: 'hr',
    label: 'Human Resource'
  }
]

export const rolesChipColor = {
  admin: theme.palette.info.main,
  user: theme.palette.warning.main,
  moderator: '#9c27b0'
}

export const roles = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'moderator',
    label: 'Moderator'
  },
  {
    value: 'user',
    label: 'User'
  }
]

export const statuses = [
  {
    value: 'inactive',
    label: 'Inactive'
  },
  {
    value: 'active',
    label: 'Active'
  }
]
