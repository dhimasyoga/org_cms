import { getSession } from 'next-auth/react';
import { MainLayout } from '@/components/template';
import { NextPage } from "next";
import { Box, Typography } from '@mui/material';
import { theme } from '@/config/themes.config';

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

const styles = {
  '.highlight': {
    color: theme.palette.primary.main
  },
  b: {
    fontWeight: 600,
  }
}

const Dashboard: NextPage = () => {
  return (
    <MainLayout pageTitle='Dashboard'>
      <Box component="div" sx={styles}>
        <Typography variant='h5'>
          Welcome to <span className="highlight">ORG CMS</span> Dashboard!
        </Typography>
        <Typography>
          Head over to <b>User List</b> on the sidebar to view, edit, and manage your users with ease
        </Typography>
      </Box>
    </MainLayout>
  )
}

export default Dashboard;