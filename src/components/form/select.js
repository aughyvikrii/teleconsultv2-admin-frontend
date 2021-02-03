import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { get_branch, get_department, get_specialist, get_doctor } from '../../api';

const DEBUG = 1;
const defaultFilters = {
    all_data: true
}
const funcFilter = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    // console.log('input:', input);
    // console.log('option:', option);
    // return option.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const selectChange = (e, dispatch) => {
    if(e.length===0) dispatch('small');
    else dispatch('medium');
}

export const SelectSpecialist = (props) => {

    if(DEBUG) console.log('SelectSpecialist: load');

    const {
        list = null,
        filters = defaultFilters,
        placeholder = 'Pilih spesialis',
        searchable = true,
        searchableCustom = false,
        className = 'sDash_fullwidth',
        showSearch = true,
        optionFilterProp = 'children',
        filterOption =  funcFilter,
        optionLabelProp = 'label',
        ...rest
    } = props;

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [size, setSize] = useState('small');
    const [defaultProps, setDefaultProps] = useState({});

    useEffect( () => {
        let tempData = {};

        if(props.placeholder === undefined) tempData.placeholder = 'Pilih spesialis';
        if(props.searchable || props.searchableCustom) {
            if(props.className === undefined) tempData.className = 'sDash_fullwidth-select';
            if(props.showSearch === undefined) tempData.showSearch = true;
            if(props.optionFilterProp === undefined) tempData.optionFilterProp = 'children';
            if(props.filterOption === undefined) tempData.filterOption = (input, option) => funcFilter(input, option)
            if(props.optionLabelProp === undefined) tempData.optionLabelProp="label";
            if(props.mode === 'multiple') {
                if(props.searchableCustom === undefined) {
                    tempData.onChange = e => {
                        props.onChange(e);
                        selectChange(e, setSize);
                    };
                }
            }
        }

        setDefaultProps(tempData);
    }, []);

    const getData = async () => {
        if(!success) {
            if(DEBUG) console.log('SelectSpecialist: get data');
            const [result, error] = await get_specialist(filters);
            if(error) {
                if(DEBUG) console.log('SelectSpecialist: load error');
            } else {
                if(DEBUG) console.log('SelectSpecialist: load success');
                setSuccess(true);
                setData(result.data);
            }
        }
    }

    useEffect(() => {
        if(!list) {
            if(data.length===0) getData();
            else {
                if(DEBUG) console.log('SelectSpecialist: list define from state');
            }
        }
        else {
            if(DEBUG) console.log('SelectSpecialist: list define');
            setData(list);
        }
    }, [list]);

    return(
        <Select {...rest} {...defaultProps} size={size}>
            {   Object.keys(data).map(index => {
                    let row = data[index];
                    return <Select.Option key={row['specialist_id']} value={row['specialist_id']} label={row['title']}>{row['title']} ( {row['alt_name']} )</Select.Option>;
                })
            }
        </Select>
    );
}

export const SelectBranch = (props) => {
    if(DEBUG) console.log('SelectBranch: load');

    const {
        list = null,
        filters = defaultFilters,
        placeholder = 'Pilih cabang',
        searchable = true,
        searchableCustom = false,
        className = 'sDash_fullwidth',
        showSearch = true,
        optionFilterProp = 'children',
        filterOption =  funcFilter,
        optionLabelProp = 'label',
        ...rest
    } = props;
    
    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [size, setSize] = useState('small');
    const [defaultProps, setDefaultProps] = useState({});

    useEffect( () => {
        let tempData = {};

        if(props.placeholder === undefined) tempData.placeholder = 'Pilih cabang';
        if(props.searchable || props.searchableCustom) {
            if(props.className === undefined) tempData.className = 'sDash_fullwidth-select';
            if(props.showSearch === undefined) tempData.showSearch = true;
            if(props.optionFilterProp === undefined) tempData.optionFilterProp = 'children';
            if(props.filterOption === undefined) tempData.filterOption = (input, option) => funcFilter(input, option)
            if(props.optionLabelProp === undefined) tempData.optionLabelProp="label";
            if(props.mode === 'multiple') {
                if(props.searchableCustom === undefined) {
                    tempData.onChange = e => {
                        props.onChange(e);
                        selectChange(e, setSize);
                    };
                }
            }
        }

        setDefaultProps(tempData);
    }, []);

    const getData = async () => {
        if(!success) {
            if(DEBUG) console.log('SelectBranch: get data');
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
        if(!list) {
            if(data.length===0) getData();
            else {
                if(DEBUG) console.log('SelectBranch: list define from state');
            }
        }
        else {
            if(DEBUG) console.log('SelectBranch: list define');
            setData(list);
        }
    }, [list]);

    return(
        <Select {...rest} {...defaultProps} size={size}>
            {   Object.keys(data).map(index => {
                    let row = data[index];
                    return <Select.Option key={row['branch_id']} value={row['branch_id']} label={row['name']}>{row['name']}</Select.Option>;
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
        placeholder = 'Pilih departemen',
        searchable = true,
        searchableCustom = false,
        className = 'sDash_fullwidth',
        showSearch = true,
        optionFilterProp = 'children',
        filterOption =  funcFilter,
        optionLabelProp = 'label',
        ...rest
    } = props;

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [size, setSize] = useState('small');
    const [defaultProps, setDefaultProps] = useState({});

    useEffect( () => {
        let tempData = {};

        if(props.placeholder === undefined) tempData.placeholder = 'Pilih departemen';
        if(props.searchable || props.searchableCustom) {
            if(props.className === undefined) tempData.className = 'sDash_fullwidth-select';
            if(props.showSearch === undefined) tempData.showSearch = true;
            if(props.optionFilterProp === undefined) tempData.optionFilterProp = 'children';
            if(props.filterOption === undefined) tempData.filterOption = (input, option) => funcFilter(input, option)
            if(props.optionLabelProp === undefined) tempData.optionLabelProp="label";
            if(props.mode === 'multiple') {
                if(props.searchableCustom === undefined) {
                    tempData.onChange = e => {
                        props.onChange(e);
                        selectChange(e, setSize);
                    };
                }
            }
        }

        setDefaultProps(tempData);
    }, []);

    const getData = async () => {
        if(!success) {
            if(DEBUG) console.log('SelectDepartment: get data');
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
        if(!list){
            if(data.length===0) getData();
            else {
                if(DEBUG) console.log('SelectDepartment: list define from state');
            }
        }
        else {
            if(DEBUG) console.log('SelectDepartment: list define');
            setData(list);
        }
    }, [list]);

    return(
        <Select {...rest} {...defaultProps} size={size}>
            {   Object.keys(data).map(index => {
                    let row = data[index];
                    return <Select.Option key={row['department_id']} value={row['department_id']} label={row['name']}>{row['name']}</Select.Option>;
                })
            }
        </Select>
    );
}

export const SelectWeekday = (props) => {

    const list = {
        '1': 'Senin', '2': 'Selasa', '3': 'Rabu', '4': 'Kamis', '5': 'Jumat', '6': 'Sabtu', '7': 'Minggu'
    };

    const {
        placeholder = 'Pilih hari',
        searchable = true,
        searchableCustom = false,
        className = 'sDash_fullwidth',
        showSearch = true,
        optionFilterProp = 'children',
        filterOption =  funcFilter,
        optionLabelProp = 'label',
        ...rest
    } = props;

    const [defaultProps, setDefaultProps] = useState({});
    const [size, setSize] = useState('small');

    useEffect(() => {
        let tempData = {};

        if(props.placeholder === undefined) tempData.placeholder = 'Pilih Hari';
        if(props.searchable || props.searchableCustom) {
            if(props.className === undefined) tempData.className = 'sDash_fullwidth-select';
            if(props.showSearch === undefined) tempData.showSearch = true;
            if(props.optionFilterProp === undefined) tempData.optionFilterProp = 'children';
            if(props.filterOption === undefined) tempData.filterOption = (input, option) => funcFilter(input, option)
            if(props.optionLabelProp === undefined) tempData.optionLabelProp="label";
            if(props.mode === 'multiple') {
                if(props.searchableCustom === undefined) {
                    tempData.onChange = e => {
                        props.onChange(e);
                        selectChange(e, setSize);
                    };
                }
            }
        }

        setDefaultProps(tempData);
    }, []);

    return(
        <Select {...rest} {...defaultProps} size={size}>
            { Object.keys(list).map(key => <Select.Option key={key} value={key} label={list[key]}>{list[key]}</Select.Option> ) }
        </Select>
    );
}

export const SelectDoctor = (props) => {

    const {
        list = null,
        filters = defaultFilters,
        placeholder = 'Pilih dokter',
        searchable = true,
        searchableCustom = false,
        className = 'sDash_fullwidth',
        showSearch = true,
        optionFilterProp = 'children',
        filterOption =  funcFilter,
        optionLabelProp = 'label',
        ...rest
    } = props;

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [size, setSize] = useState('small');
    const [defaultProps, setDefaultProps] = useState({});

    useEffect(() => {
        let tempData = {};

        if(props.placeholder === undefined) tempData.placeholder = 'Pilih dokter';
        if(props.searchable || props.searchableCustom) {
            if(props.className === undefined) tempData.className = 'sDash_fullwidth-select';
            if(props.showSearch === undefined) tempData.showSearch = true;
            if(props.optionFilterProp === undefined) tempData.optionFilterProp = 'label';
            if(props.filterOption === undefined) tempData.filterOption = (input, option) => funcFilter(input, option)
            // if(props.optionLabelProp === undefined) tempData.optionLabelProp="label";

            if(props.mode === 'multiple') {
                if(props.searchableCustom === undefined) {
                    tempData.onChange = e => {
                        props.onChange(e);
                        selectChange(e, setSize);
                    };
                }
            }
        }

        setDefaultProps(tempData);
    }, []);

    const getData = async () => {
        if(!success) {
            if(DEBUG) console.log('SelectDoctor: get data');
            const [result, error] = await get_doctor(filters);
            if(error) {
                if(DEBUG) console.log('SelectDoctor: load error');
            } else {
                if(DEBUG) console.log('SelectDoctor: load success');
                setSuccess(true);
                setData(result.data);
            }
        }
    }

    useEffect(() => {
        if(!list) {
            if(data.length===0) getData();
            else {
                if(DEBUG) console.log('SelectDoctor: list define from state');
            }
        }
        else {
            if(DEBUG) console.log('SelectDoctor: list define');
            setData(list);
        }
    }, [list]);

    return(
        <Select {...rest} {...defaultProps} size={size}>
            {   Object.keys(data).map(index => {
                    let row = data[index];
                    return <Select.Option key={row['doctor_id']} value={row['doctor_id']} label={row['doctor_id']}>{row['display_name']}</Select.Option>;
                })
            }
        </Select>
    );
}