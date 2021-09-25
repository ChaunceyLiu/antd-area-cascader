import '../index.less';

import { LoadingOutlined, RightOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';

import { prefix } from '../constants';
import MultiCascader from '../container';
import type { TreeNode } from '../index.d';
import Checkbox from './Checkbox';

export type MenuItemProps = {
  key: string;
  node: TreeNode;
};

export default React.memo((props: MenuItemProps) => {
  const { node } = props;
  const { children, name: title } = node;
  const [loading, setLoading] = useState(false);
  const hasChildren = children && children.length > 0;
  const { handleCascaderChange } = MultiCascader.useContainer();

  const handleClick = useCallback(() => {
    setLoading(true);
    handleCascaderChange(node);
  }, [node, handleCascaderChange]);

  return (
    <li onClick={handleClick} className={`${prefix}-column-item`}>
      <Checkbox node={node} />
      <p
        className={`${prefix}-column-item-label`}
      >
        <span>{title}</span>
      </p>
      {!hasChildren ? null : loading && !children?.length ? (
        <LoadingOutlined className={`${prefix}-column-item-icon`} />
      ) : (
        <RightOutlined className={`${prefix}-column-item-icon`} />
      )}
    </li>
  );
});
