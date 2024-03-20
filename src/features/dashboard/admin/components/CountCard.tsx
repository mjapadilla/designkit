type TProps = {
  amount: string;
  title: string;
};

function CountCard({ amount, title }: TProps) {
  return (
    <div className="card w-full shadow-none">
      <div className="items-start justify-start gap-2 ">
        <div className="flex flex-col">
          <h4 className="text-xl font-bold text-primary-500">{amount}</h4>
          <p className="text-xs font-normal leading-4 text-zinc-800">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default CountCard;
