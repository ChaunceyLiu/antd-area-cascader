import React, {useCallback} from 'react';
import MultiCascader from '../components/Cascader'

export const Cascader = (props: any) => {
  const defaultValue: any = [];
  const onChange = useCallback((value) => {
    console.log(value)
}, []);
  return (
    <>
      <MultiCascader defaultValue={defaultValue} onChange={onChange} />
    </>
  );
}

