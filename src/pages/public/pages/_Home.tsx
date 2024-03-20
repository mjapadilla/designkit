import Authentication from 'features/authentication';

import { Brand } from 'ui/components';

function Home() {
  return (
    <div className="w-full bg-gradient-to-r from-neutral-800 to-neutral-900">
      <div className="container mx-auto flex h-full w-full space-x-14 p-5">
        <div className="m-auto w-full max-w-md rounded-xl bg-white-50 p-8">
          <div className="flex justify-center">
            <Brand />
          </div>
          <div className="my-8 space-y-2 text-center">
            <h4 className="text-3xl font-black leading-10">
              Login to your account
            </h4>
          </div>
          <Authentication />
        </div>
      </div>
    </div>
  );
}

export default Home;
