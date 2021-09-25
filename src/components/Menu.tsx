import '../index.less';

import React from 'react';

import { prefix } from '../constants';
import MenuItem from './MenuItem';
import MultiCascader from '../container';

function Menu(props: any) {
    const { provinceVal, cityVal, areaVal, value: containerValue } = MultiCascader.useContainer();
    const computedMenu = [0, 0, 0];
    if (containerValue.length) {
        const defaultView = containerValue[0];
        if (defaultView.substring(0, 2)) {
            for (let [k, v] of props.menuData.entries()) {
                if (v.code === defaultView.substring(0, 2)) {
                    computedMenu[0] = k;
                    break;
                }
            }
        }
        if (defaultView.substring(0, 4)) {
            for (let [k, v] of props.menuData[computedMenu[0]].children.entries()) {
                if (v.code === defaultView.substring(0, 4)) {
                    computedMenu[1] = k;
                    break;
                }
            }
        }
    }
    if(!props.menuData[0].code) return <></>
    const province = provinceVal || props.menuData;
    const city = cityVal || props.menuData[computedMenu[0]].children || [];
    const area = areaVal || props.menuData[computedMenu[0]].children[computedMenu[1]].children;
    return (
        <>
            <div className={`${prefix}-column`}>
                <ul>
                    {province.map((item: any) => {
                        return <MenuItem key={item.code} node={item} />;
                    })}
                </ul>
            </div>
            <div className={`${prefix}-column`}>
                <ul>
                    {city.map((item: any) => {
                        return <MenuItem key={item.code} node={item} />;
                    })}
                </ul>
            </div>
            <div className={`${prefix}-column`}>
                <ul>
                    {area.map((item: any) => {
                        return <MenuItem key={item.code} node={item} />;
                    })}
                </ul>
            </div>
        </>
    );
}

export default Menu;
