import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { get_branch, get_department } from '../../api';

const DEBUG = true;
const defaultFilters = {
    all_data: true
}

export const SelectBranch = (props) => {
    if(DEBUG) console.log('SelectBranch: load');

    const {
        list = null,
        filters = defaultFilters,
        key = 'bid',
        label = 'name',
        showSearch=true,
        placeholder="Pilih cabang",
        optionFilterProp="children",
        ...rest
    } = props;
    
    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);

    const getData = async () => {
        if(DEBUG) console.log('SelectBranch: get data');
        
        if(!success) {
            const [result, error] = await get_branch(filters);
            if(error) {
                if(DEBUG) console.log('SelectBranch: load error');
            } else {
                if(DEBUG) console.log('SelectBranch: load success');
                setSuccess(true);
                setData(result.data);
            }
        }
    }
    useEffect(() => {
        if(!list) getData();
        else {
            if(DEBUG) console.log('SelectBranch: list define');
            setData(list);
        }
    }, [list]);

    return(
        <Select
            {...rest}
            showSearch={showSearch}
            placeholder={placeholder}
            optionFilterProp={optionFilterProp}
            filterOption={(input, option) =>
                option.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {   Object.keys(data).map(index => {
                    let row = data[index];
                    return <Select.Option key={row[key]} value={row['key']}>{row['name']}</Select.Option>;
                })
            }
        </Select>
    );
}

export const SelectDepartment = (props) => {
    if(DEBUG) console.log('SelectDepartment: load');

    const {
        list = null,
        filters = defaultFilters,
        key = 'deid',
        label = 'name',
        showSearch=true,
        placeholder="Pilih departemen",
        optionFilterProp="children",
        ...rest
    } = props;

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);

    const getData = async () => {
        if(DEBUG) console.log('SelectDepartment: get data');
        
        if(!success) {
            const [result, error] = await get_department(filters);
            if(error) {
                if(DEBUG) console.log('SelectDepartment: load error');
            } else {
                if(DEBUG) console.log('SelectDepartment: load success');
                setSuccess(true);
                setData(result.data);
            }
        }
    }
    useEffect(() => {
        if(!list) getData();
        else {
            if(DEBUG) console.log('SelectDepartment: list define');
            setData(list);
        }
    }, [list]);

    return(
        <Select
            {...rest}
            showSearch={showSearch}
            placeholder={placeholder}
            optionFilterProp={optionFilterProp}
            filterOption={(input, option) =>
                option.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {   Object.keys(data).map(index => {
                    let row = data[index];
                    return <Select.Option key={row[key]} value={row['key']}>{row['name']}</Select.Option>;
                })
            }
        </Select>
    );
}