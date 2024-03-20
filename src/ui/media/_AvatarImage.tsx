import { CgSpinner } from 'react-icons/cg';

import { mergeClasses } from 'utils';

interface IProps {
  src?: string;
  className?: string;
  isLoading?: boolean;
  name?: string;
}

function AvatarImage({
  src,
  className,
  name = 'Name',
  isLoading = false,
}: IProps) {
  const matches = name ? name.match(/\b(\w)/g) : [];
  const acronym = matches ? matches.join('') : '';

  return (
    <div
      className={mergeClasses(
        'relative flex h-8 w-8 overflow-hidden rounded-full bg-slate-200 shadow-inner',
        className
      )}
    >
      {src ? (
        <img src={src} className="object-cover" alt="" />
      ) : (
        <span className="m-auto text-xs font-medium">{acronym}</span>
      )}
      {isLoading && (
        <div className="absolute z-20 flex h-full w-full bg-gray-200/20">
          <div className="m-auto">
            <CgSpinner className="h-3 w-3 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarImage;
