import React from 'react';
import { Link } from 'react-router-dom';

import PageLoader from './_PageLoader';

const wait = (t: number) =>
  new Promise((r) => {
    setTimeout(r, t);
  });

function Page404({
  duration = 500,
  withDelay = false,
}: {
  duration?: number;
  withDelay?: boolean;
}) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const dispatchDelay = async () => {
      await wait(duration);
      setShow(true);
    };

    if (withDelay) {
      dispatchDelay();
    }
  }, [duration, withDelay]);

  if (!show && withDelay) {
    return <PageLoader />;
  }

  return (
    <div className="bg-white h-full w-full bg-opacity-100">
      <div className="flex h-full flex-col items-center justify-center gap-12">
        <div className="space-y-3 text-center">
          <div className="text-2xl font-bold">Page not found</div>
          <div className="text-sm font-light">
            Sorry, we can’t find that page you’re looking for
          </div>

          <Link to="/">
            <button className="primary md btn !mt-5 px-5" type="button">
              Go to homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;
