import Helmet from 'react-helmet';

function PageTitle({
  title,
  tabTitle = import.meta.env.VITE_APP_TITLE,
}: {
  title?: string;
  tabTitle?: string;
}) {
  const t = title ? ` | ${title}` : '';

  return (
    <Helmet>
      <title>{`${tabTitle} ${t}`}</title>
    </Helmet>
  );
}

export default PageTitle;
