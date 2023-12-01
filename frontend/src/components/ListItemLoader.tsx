import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';

import ItemLoader from '@/components/ItemLoader';

interface Props {
  count: number;
}

const ListItemLoader: FC<Props> = ({ count }) => {
  const loaders = Array.from(Array(count).keys());

  return loaders.map((i) => (
    <ListItem key={i}>
      <ListItemText>
        <ItemLoader isLoading />
      </ListItemText>
    </ListItem>
  ));
};

export default ListItemLoader;
