import { Link, Box } from '@mui/material';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
type TNavBar = {
  links: {
    text: string;
    href: string;
    'data-testid'?: string;
  }[];
};

function NavBar({ links }: TNavBar) {
  const { pathname } = useLocation();
  return (
    <Box
      component="aside"
      sx={{
        background: '#0c2975',
        padding: '16px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        sx={{ cursor: 'pointer', marginBottom: '80px', marginTop: '40px' }}
      >
        <img src="/surelogo.svg" alt="logo"></img>
      </Link>

      {links.map(({ text, href, 'data-testid': dataTestId }) => {
        const active = matchPath(href, pathname);
        return (
          <Link
            component={RouterLink}
            key={href}
            to={href}
            color="#fff"
            underline="hover"
            aria-current={active ? 'page' : undefined}
            sx={{
              cursor: 'pointer',
              '&:not(:last-of-type)': {
                marginBottom: '8px',
              },
              padding: '8px 10px',
              borderRadius: 1,
              backgroundColor: active ? 'white' : '',
              color: active ? '#0c2975' : '',
            }}
            data-testid={dataTestId}
          >
            {text}
          </Link>
        );
      })}
    </Box>
  );
}

export default NavBar;
