import { FC } from 'react';
import ContentLoader from 'react-content-loader';

interface Props {
  isLoading: boolean;
  value?: string | number | undefined;
}

const ItemLoader: FC<Props> = ({ isLoading, value }) => {
  if (isLoading) {
    return (
      <ContentLoader
        speed={2}
        width={120}
        height={10}
        viewBox="0 0 120 10"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="10" y="0" rx="5" ry="5" width="100" height="10" />
      </ContentLoader>
    );
  }

  return value;
};

export default ItemLoader;
