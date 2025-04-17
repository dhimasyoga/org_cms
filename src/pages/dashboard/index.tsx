import { MainLayout } from '@/components/template';
import { generateSxStyles, theme } from '@/config/themes.config';
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <MainLayout
      pageTitle='Dashboard'
    />
  )
}

export default Dashboard;