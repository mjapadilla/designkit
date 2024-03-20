import { BsFillGearFill, BsRocketFill } from 'react-icons/bs';

import { wipLaptop } from 'assets/images';

function WipContainer({ label }: { label?: string }) {
  return (
    <div className="flex h-full w-full place-items-center overflow-hidden p-2">
      <section className="m-auto text-center">
        <div className="mb-4 flex items-center justify-between">
          <BsRocketFill className="animate-fade-up text-5xl text-primary-500 animate-duration-[5000ms] animate-infinite animate-ease-in-out" />
        </div>
        <img src={wipLaptop} className="h-48 w-auto object-cover" />
        <div className="mt-2 flex justify-center gap-2">
          <h2 className="mt-2 text-4xl font-semibold">Work In Progress</h2>
          <BsFillGearFill className="animate-spin text-4xl text-primary-500 animate-duration-[3000ms] animate-ease-in-out" />
        </div>
        <p className="mt-2">
          Sorry, the page you&apos;re looking for is still under contruction.
        </p>
        {label && <p className="mt-2 font-medium">{label}</p>}
      </section>
    </div>
  );
}

export default WipContainer;
