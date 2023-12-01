import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ErrorMessage: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        mt: 1,
        border: (theme) => `1px solid ${theme.palette.error.main}`,
        borderRadius: 4,
      }}
    >
      <ErrorIcon sx={{ color: 'error.main', mr: 1 }} />
      <Typography paragraph={false}>{children}</Typography>
    </Box>
  );
};

export default ErrorMessage;
