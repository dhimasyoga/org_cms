import { PATH, ROUTES } from '@/modules/constants/string';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import NextLinkComposed from '../atoms/Link.atoms';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  const paths = useMemo(() => {
    if (!pathname) {
      return [];
    }
    const splitPaths = pathname.split('/').filter(Boolean);
    return splitPaths;
  }, [pathname]);

  const getLabelForPath = (path: string) => {
    if (path === '') return 'Dashboard';
    const route = ROUTES.find((r) => r.path === `/${path}`);
    return route ? route.label : path.replace(/-/g, ' ');
  };

  return (
    <MuiBreadcrumbs
      sx={{
        fontWeight: 400,
        fontSize: '16px',
        color: 'rgba(0, 0, 0, 0.6)',
      }}
      separator="/"
    >
      <NextLinkComposed
        href={PATH.HOMEPAGE}
        underline="hover"
        color="inherit"
        textTransform="capitalize"
        sx={{
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        Dashboard
      </NextLinkComposed>
      {paths.map((path, index) => {
        if (index > 0 && paths[index - 1] === 'detail') {
          return null;
        }

        const isLast =
          index === paths.length - 1 ||
          (index === paths.length - 2 && paths[index + 1] === 'detail');
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const label = getLabelForPath(path);

        if (path === 'detail' || isLast) {
          return (
            <Typography
              key={`breadcrumb-${index}`}
              color="text.primary"
              textTransform="capitalize"
            >
              {label}
            </Typography>
          );
        }

        return (
          <NextLinkComposed
            key={`breadcrumb-${index}`}
            href={href}
            underline="hover"
            color="inherit"
            textTransform="capitalize"
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            {label}
          </NextLinkComposed>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default React.memo(Breadcrumbs);
