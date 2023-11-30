import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  linkTo: string;
  text: string;
}

const ListItem: FC<Props> = ({ linkTo, text }) => {
  return (
    <li>
      <Link to={linkTo}>{text}</Link>
    </li>
  );
};

export default ListItem;
