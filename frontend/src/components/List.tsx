import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MuiList from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { FC, ReactElement } from 'react';

import ListItemLoader from '@/components/ListItemLoader.tsx';

interface Props {
  headerText: string;
  children: ReactElement | ReactElement[] | undefined;
  isLoading: boolean;
  loadingCount: number;
}

const List: FC<Props> = ({ headerText, children, isLoading, loadingCount }) => {
  return (
    <Card sx={{ mt: 1 }}>
      <CardHeader
        disableTypography
        title={<Typography variant="h6">{headerText}</Typography>}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary.main}` }}
      />
      <CardContent>
        <MuiList dense>
          {isLoading && <ListItemLoader count={loadingCount} />}
          {children}
        </MuiList>
      </CardContent>
    </Card>
  );
};

export default List;
