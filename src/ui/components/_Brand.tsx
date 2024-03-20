import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Logo } from 'assets/images';

type TColorType = 'default' | 'white';
interface IProps {
  imgClassName?: string;
  labelClassName?: string;
  logo?: string;
  url?: string;
  type?: TColorType;
}

const renderLogo: Record<TColorType, string> = {
  default: Logo,
  white: Logo,
};

function Brand({
  url = '/',
  type = 'default',
  imgClassName = 'h-10 w-auto',
  labelClassName = 'text-2xl font-semibold',
}: IProps) {
  const $logo = renderLogo[type];
  return (
    <Link to={url}>
      <div className="flex items-center space-x-3">
        <img className={cn(imgClassName)} src={$logo} alt="designkit" />
        <h4 className={labelClassName}>Design System</h4>
      </div>
    </Link>
  );
}

export default Brand;
