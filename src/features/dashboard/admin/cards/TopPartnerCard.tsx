import { PieGraph } from 'ui/graph';

function TopPartnerCard() {
  return (
    <div className="card flex h-full w-full flex-col shadow-none">
      <div>
        <h4 className="card-title">Top 3 Partners</h4>
        <p className="card-description">Lorem ipsum dolor sit</p>
      </div>
      <div className="flex-1 overflow-hidden px-4 pt-2">
        <PieGraph />
      </div>
    </div>
  );
}

export default TopPartnerCard;
