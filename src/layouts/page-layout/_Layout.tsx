import classNames from 'classnames';

interface IProps {
  children: React.ReactNode;
  className?: string;
  withScroll?: boolean;
  outerClassName?: string;
  innerClassName?: string;
}

function Layout({
  children,
  className,
  withScroll,
  outerClassName,
  innerClassName,
}: IProps) {
  return (
    <div className={classNames('page-outer-layout', outerClassName)}>
      <div className={classNames('page-inner-layout', innerClassName)}>
        <div
          className={classNames('page-layout', className, {
            'with-scroll': !withScroll,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
