import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useCallback } from 'react';

import MultiCascader from '../container';
import { hasChildChecked, hasParentChecked } from '../utils';
import type { MenuItemProps } from './MenuItem';

export default React.memo((props: Pick<MenuItemProps, 'node'>) => {
  const { node } = props;
  const { value: containerValue, handleSelectChange } = MultiCascader.useContainer();
  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
  }, []);
  const handleChange = useCallback(
    (event: CheckboxChangeEvent) => {
      const { checked } = event.target;
      handleSelectChange(node, checked);
    },
    [handleSelectChange, node],
  );

  const checked = hasParentChecked(node, containerValue);
  const indeterminate = !checked && hasChildChecked(node, containerValue);

  return (
    <Checkbox
      onClick={handleClick}
      onChange={handleChange}
      checked={checked}
      indeterminate={indeterminate}
    />
  );
});
