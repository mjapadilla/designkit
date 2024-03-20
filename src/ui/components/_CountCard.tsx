type TProps = {
  value: string;
  title: string;
};

function CountCard({ value, title }: TProps) {
  return (
    <div className="card space-y-2.5 shadow-none">
      <h4 className="text-xl font-semibold text-primary-500">{value}</h4>
      <p className="text-xs font-normal leading-none text-zinc-800">{title}</p>
    </div>
  );
}

export default CountCard;
