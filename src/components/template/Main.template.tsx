import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { Button, Wrapper } from "ddc-ui-typescript";
import { Breadcrumbs } from "../molecules";
import { theme } from '@/config/themes.config';

import { Link } from "../atoms";
import { Box, Typography, Stack } from "@mui/material";
import {
  LogoDSF,
  LogoDSFSquare
} from "@/components/atoms/Logo/Icon.atom";
import AddIcon from '@mui/icons-material/Add';
import { navigationList } from "@/models/mainLayout.models";

//#region INTERFACE
interface LayoutProps {
  children?: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;

  addAction?(): void;
  addActionIcon?: React.ReactNode;
  additionalAction?: React.ReactNode;
  addActionText?: string;
}
//#endregion

const MainLayout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  pageSubtitle,
  addAction,
  addActionIcon,
  addActionText,
  additionalAction,
}: LayoutProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  return (
    <Wrapper
      logo={{
        main: (<LogoDSF />),
        square: (<LogoDSFSquare width={64} />),
      }}
      theme={theme}
      path={router.pathname}
      drawerDefaultOpen
      LinkComponent={Link}
      drawerWidth={300}
      navigationList={navigationList}
      profile={{
        name: session?.user?.username ?? '-'
      }}
      settings={[
        {
          label: 'Logout',
          onClick: () => {
            signOut()
          }
        }
      ]}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          my={3}
        >
          {(pageTitle || pageSubtitle || addAction) && (
            <Stack spacing={1}>
              {pageTitle && (
                <Typography variant="h4" color="primary.main">
                  {pageTitle}
                </Typography>
              )}
              {pageSubtitle && (
                <Typography variant="body2" color="text.primary">
                  {pageSubtitle}
                </Typography>
              )}
              {isClient && router.pathname !== '/' && <Breadcrumbs />}
            </Stack>
          )}
          <Stack spacing={1}>
            {addAction && (
              <Button
                startIcon={addActionIcon ?? <AddIcon />}
                text={addActionText ?? 'Create'}
                onClick={addAction}
                variant="contained"
              />
            )}
            {additionalAction}
          </Stack>
        </Stack>
        {children}
      </Box>
    </Wrapper>
  )
}

export default MainLayout;