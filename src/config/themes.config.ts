import { createTheme, responsiveFontSizes, SxProps } from '@mui/material';

export const generateSxStyles = <T = unknown>(
  params: Record<keyof T, SxProps<typeof theme>> | T
): Record<keyof T, SxProps<typeof theme>> | T => params;

let theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1440 } },
  palette: {
    mode: 'light',
    primary: {
      main: '#ED264F',
      light: 'rgba(237, 38, 79, 0.04)',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.56)',
    },
    grey: {
      900: 'rgba(33, 33, 33, 1)',
    },
    secondary: {
      main: '#F26C4F',
      light: '#FFCFC4',
    },
    success: {
      main: '#2E7D32',
      light: '#E5FAFB',
    },
    error: {
      main: '#ED264F',
      light: '#FDF3F5',
    },
    info: {
      main: '#0288D1',
      light: '#DFF5FF',
    },
    warning: {
      main: '#EF6C00',
      light: '#FFE3D0',
    },
    background: { default: '#FAFBFB' },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: '#999999',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          paddingRight: '0px !important',
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ED264F',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px !important',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          zIndex: '0 !important',
          marginBottom: '0px !important',
          marginRight: '0px !important',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          paddingRight: '0px !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '5px',
          boxShadow: 'none',
          ':hover': { boxShadow: 'none' },
        },
        contained: { color: '#FFF' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          border: 'none !important',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 1201,
          a: {
            paddingTop: 0,
            paddingBottom: 0,
            '&:hover': { textDecoration: 'none' },
          },
        },
        paper: {
          borderRight: 0,
          padding: 'unset',
          boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: `"Poppins", sans-serif` },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: '0px 2px 4px 0px #00000014',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: { border: 'none !important', paddingBottom: '0 !important' },
        title: {
          color: '#ED264F',
          fontWeight: '700',
          fontSize: 20,
          lineHeight: '24px',
          letterSpacing: '0.00938em',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { color: '#000 !important' }
      }
    },
    MuiTable: {
      styleOverrides: { root: { borderRadius: 4, overflow: 'hidden' } },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: { color: '#f1f3f4 !important' },
        icon: { color: '#f1f3f4 !important' },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ED264F',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '.MuiAlert-action': {
            marginRight: 8,
          },
          '.MuiAlert-message': {
            fontWeight: 500
          },
        },
        standardSuccess: {
          backgroundColor: 'rgb(237, 247, 237)',
          color: 'rgb(30, 70, 32)',
          'button': {
            color: 'rgb(30, 70, 32)'
          }
        },
        standardError: {
          backgroundColor: 'rgb(253, 237, 237)',
          color: 'rgb(95, 33, 32)',
          'button': {
            color: 'rgb(95, 33, 32)'
          }
        },
        filled: {
          '.MuiButtonBase-root': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px',
          ':first-of-type': {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
          ':last-of-type': {
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          },
        },
      },
    },
  },
  spacing: 8,
  typography: {
    allVariants: { fontFamily: `"Poppins", sans-serif` },
    h1: {
      fontSize: '60px',
      lineHeight: 1.1875,
      letterSpacing: '2px',
      fontWeight: 500,
      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '60px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '54px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '50px !important',
      },
    },
    h2: {
      fontSize: '44px',
      lineHeight: 1.25,
      fontWeight: 500,
      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '44px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '40px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '36px !important',
      },
    },
    h3: {
      fontSize: '36px',
      lineHeight: 1,
      fontWeight: 500,
      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '36px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '32px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '28px !important',
      },
    },
    h4: {
      fontSize: '30px',
      fontWeight: 500,
      lineHeight: 0.941,

      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '30px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '24px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '20px !important',
      },
    },
    h5: {
      fontSize: '24px',
      lineHeight: 1.5,
      fontWeight: 500,
      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '24px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '20px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '18px !important',
      },
    },
    h6: {
      fontSize: '16px',
      lineHeight: 1.333,
      fontWeight: 500,
      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '16px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '14px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '12px !important',
      },
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '16px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '14px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '12px !important',
      },
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5,
      fontFamily: `"Poppins", sans-serif`,
      '@media screen and (min-width:1280px)': {
        fontSize: '14px !important',
      },
      '@media screen and (max-width:960px)': {
        fontSize: '12px !important',
      },
      '@media screen and (max-width:600px)': {
        fontSize: '10px !important',
      },
    },
  },
});

theme = createTheme(theme, {
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: theme.palette.common.white,
                    backgrounColor: theme.palette.primary.main
                }
            }
        }
    }
})

theme = responsiveFontSizes(theme);

export { theme };
