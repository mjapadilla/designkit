import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Logo } from 'assets/images';

interface IProps {
  imgClassName?: string;
  labelClassName?: string;
  logo?: string;
  url?: string;
  type?: keyof typeof renderLogo;
}

const renderLogo = {
  black: Logo,
  white: Logo,
};

function Brand({
  url = '/',
  type = 'black',
  imgClassName = 'h-10 w-auto',
  labelClassName = 'text-2xl font-semibold',
}: IProps) {
  const $logo = renderLogo[type];
  return (
    <Link to={url}>
      <div className="flex items-center space-x-3">
        <img className={cn(imgClassName)} src={$logo} alt="designkit" />
        <h4
          className={cn(labelClassName, {
            'text-black-50': type === 'black',
            'text-white-50': type === 'white',
          })}
        >
          Design System
        </h4>
      </div>
    </Link>
  );
}

export default Brand;
