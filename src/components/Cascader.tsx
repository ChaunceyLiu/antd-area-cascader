import '../index.less';

import React from 'react';

import Menu from './Menu';
import { prefix } from '../constants';
import { Checkbox } from 'antd';
import MultiCascaderContainer from '../container';
import type { TreeNodeSim } from '../index.d';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';

function AreaSelect(props:any) {
  // let pca = [{code: '', name: ''}];
  // fetch('https://unpkg.com/browse/province-city-china@8.0.0/dist/level.json').then((data: any)=>{
  //   console.log(data);
  //   console.log(data.json);
  //   pca = data;
  //   })
  let pca = require('../region.json');
  const { value: containValue ,setValue } = MultiCascaderContainer.useContainer();

  function tranCityList(cityJSON: TreeNodeSim[]) {
    const provinceList:string[] = [];
    const dfs = (nodeList:TreeNodeSim[] , parent: TreeNodeSim|null) => {
      for(let i = 0; i< nodeList.length; i++) {
        if(parent === null) {
          provinceList.push(nodeList[i].code)
        } 
        nodeList[i].parent = parent;
        if( nodeList[i].children ) {
          dfs(nodeList[i].children || [] , nodeList[i]);
        }
      }
      return {nodeList, provinceList};
    };
    return dfs(cityJSON, null);
  }
  const {nodeList, provinceList} = tranCityList(pca);
  
  const onChange = (e: CheckboxChangeEvent) => { 
    if(e.target.checked) {
      if(props.onChange) props.onChange(provinceList)
      setValue(provinceList);
    } else {
      setValue([]);
      if(props.onChange) props.onChange([])
    }
   }
  return (
    <>
      <div className={`${prefix}-allCheck`}>
        <Checkbox checked ={containValue.length === provinceList.length} onChange={onChange}>全选</Checkbox>
      </div>
      <div className={`${prefix}-main`}>
        <div>
          <Menu menuData={nodeList} />
        </div>
      </div>
    </>
  );
}

const MultiCascader: React.FunctionComponent<any> = React.forwardRef((props: any, ref) => {
  return (
    <MultiCascaderContainer.Provider initialState={props}>
      <AreaSelect {...props} ref={ref} />
    </MultiCascaderContainer.Provider>
  );
});


export default MultiCascader;

