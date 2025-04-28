import { getSession } from 'next-auth/react';
import { MainLayout } from '@/components/template';
import { NextPage } from "next";

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

const Dashboard: NextPage = () => {
  return (
    <MainLayout
      pageTitle='Dashboard'
    />
  )
}

export default Dashboard;