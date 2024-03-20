import PageLayout from 'layouts/page-layout';

import { Button } from 'ui/components';

type TButton = React.ComponentProps<typeof Button>;

interface IProps {
  solid: TButton[];
  outline: TButton[];
}

const size = ['small', 'medium', 'large'];

const data: IProps = {
  solid: [
    {
      color: 'brand',
    },
    {
      color: 'info',
    },
    {
      color: 'success',
    },
    {
      color: 'warning',
    },
    {
      color: 'danger',
    },
    {
      color: 'light',
    },
    {
      color: 'dark',
    },
  ],
  outline: [
    {
      color: 'brand-outline',
    },
    {
      color: 'info-outline',
    },
    {
      color: 'success-outline',
    },
    {
      color: 'warning-outline',
    },
    {
      color: 'danger-outline',
    },
  ],
};

function Layout() {
  return (
    <PageLayout withScroll>
      <h4 className="bg-interface text-xl font-semibold">Buttons</h4>
      <div className="flex flex-col gap-10">
        {size?.map((o) => (
          <div key={o}>
            <h4 className="mb-2 text-lg font-semibold capitalize">{o}</h4>
            <div className="flex gap-10">
              <div className="space-y-2">
                {data?.solid?.map((i, k) => (
                  <div key={k} className="flex items-center gap-2">
                    <Button size={o as never} label="Button" color={i?.color} />
                    <Button
                      size={o as never}
                      label="Button"
                      color={i?.color}
                      leading="info"
                    />
                    <Button
                      size={o as never}
                      label="Button"
                      color={i?.color}
                      leading="info"
                      trailing="arrow-right"
                    />
                    <Button
                      size={o as never}
                      label="Button"
                      color={i?.color}
                      trailing="arrow-right"
                    />
                    <h4 className="ml-2 text-sm font-semibold capitalize">
                      {i?.color}
                    </h4>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {data?.outline?.map((i, k) => (
                  <div key={k} className="flex items-center gap-2">
                    <Button size={o as never} label="Button" color={i?.color} />
                    <Button
                      size={o as never}
                      label="Button"
                      color={i?.color}
                      leading="info"
                    />
                    <Button
                      size={o as never}
                      label="Button"
                      color={i?.color}
                      leading="info"
                      trailing="arrow-right"
                    />
                    <Button
                      size={o as never}
                      label="Button"
                      color={i?.color}
                      trailing="arrow-right"
                    />
                    <h4 className="ml-2 text-sm font-semibold capitalize">
                      {i?.color}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export default Layout;
