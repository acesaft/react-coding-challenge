import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MuiListItem from '@mui/material/ListItem';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  linkTo: string;
  text: string;
}

const ListItem: FC<Props> = ({ linkTo, text }) => {
  return (
    <MuiListItem>
      <ListItemText>
        <Typography sx={{ color: 'text.primary' }} component={Link} to={linkTo}>
          {text}
        </Typography>
      </ListItemText>
    </MuiListItem>
  );
};

export default ListItem;
