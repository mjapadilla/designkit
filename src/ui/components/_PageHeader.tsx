import { mergeClasses } from 'utils';

import { Button } from '.';

interface IProps {
  title: string;
  description?: string;
  onGoBack?: () => void;
  titleClassName?: string;
  actionButton?: React.ReactNode;
}

function PageHeader({
  onGoBack,
  description,
  actionButton,
  title = 'Page title',
  titleClassName,
}: IProps) {
  return (
    <div className="flex">
      <div className="flex">
        {onGoBack && (
          <div className="my-auto mr-3 flex-shrink-0">
            <Button
              color="brand"
              onClick={onGoBack}
              leading="arrow-left"
              className="h-8 min-h-0 w-8 p-2"
            />
          </div>
        )}
        <div className="space-y-1">
          <h4
            className={mergeClasses(
              'text-2xl font-bold text-zinc-800',
              titleClassName
            )}
          >
            {title}
          </h4>
          {description && (
            <p className="text-sm font-normal text-gray-500">{description}</p>
          )}
        </div>
      </div>
      {actionButton && <div className="ml-auto">{actionButton}</div>}
    </div>
  );
}

export default PageHeader;
