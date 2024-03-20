import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TParams } from 'types';

import { Button, SkeletonLoader } from 'ui/components';
import FilterWrapper from 'ui/filter-wrapper';
import { FormInputSelect } from 'ui/forms';

import { checkHasDomPermission } from 'utils';

import { INIT_FILTER, ORDERBY_OPTIONS, SORTBY_OPTIONS } from '../_constants.ts';

interface IProps {
  form: TParams;
  isLoading?: boolean;
  onSubmit: (res: typeof INIT_FILTER) => void;
}

function Filter({ form, isLoading = false, onSubmit }: IProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [filter, setFilter] = React.useState(form);

  const handleOnSubmit = (v: TParams) => {
    setFilter(v);
    onSubmit(v as typeof INIT_FILTER);
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`${pathname}/create`);
  };

  return (
    <div>
      <FilterWrapper
        form={filter}
        withActiveFilter
        isLoading={isLoading}
        onSubmit={handleOnSubmit}
        defaultValue={INIT_FILTER}
        placeholder="Search routes..."
        actionElement={checkHasDomPermission(
          <SkeletonLoader isLoading={isLoading}>
            <Button color="brand" label="Add User" onClick={onClick} />
          </SkeletonLoader>,
          'static-r'
        )}
      >
        {({ onChange, state }) => (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium ">Arrange by:</h4>
              <div className="mt-1 space-y-3">
                <FormInputSelect
                  withUnselect
                  label="Sory By"
                  name="sort_by"
                  onChange={onChange}
                  value={state?.sort_by ?? ''}
                  options={SORTBY_OPTIONS}
                />
                <FormInputSelect
                  withUnselect
                  name="order_by"
                  label="Order By"
                  onChange={onChange}
                  value={state?.order_by ?? ''}
                  options={ORDERBY_OPTIONS}
                />
              </div>
            </div>
          </div>
        )}
      </FilterWrapper>
    </div>
  );
}

export default Filter;
