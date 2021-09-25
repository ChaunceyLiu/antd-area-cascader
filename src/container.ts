import { useCallback, useEffect, useState } from 'react';
import { createContainer } from './unStatedNext';
import type { TreeNode } from './index.d';
import { refreshItem, reconcile } from './utils'

const useCascade = (props?:any) => {
  const [value, setValue] = useState<string[]>([]);
  const [provinceVal, setProvinceVal] = useState<TreeNode[] | undefined>()
  const [cityVal, setCityVal] = useState<TreeNode[]>()
  const [areaVal, setAreaVal] = useState<TreeNode[]>()

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  const handleSelectChange = useCallback(
    (item: TreeNode, checked: boolean) => {
      setValue((prevValue) => {
        handleCascaderChange(item);
        const value = reconcile(item, checked, prevValue)
        if(props.onChange) props.onChange(value)
        return value;
      });
    },[]
  )

  const handleCascaderChange = (item: TreeNode) => {
      const data = refreshItem(item);
      setCityVal((prev) => Array.isArray(data[0])? data[0]: prev);
      setAreaVal((prev) => Array.isArray(data[1])? data[1]: prev)
  };
  return { 
    value, 
    setValue,
    handleSelectChange, 
    handleCascaderChange, 
    provinceVal, 
    setProvinceVal,
    cityVal,
    setCityVal,
    areaVal,
    setAreaVal
   };
};
export default createContainer(useCascade);

