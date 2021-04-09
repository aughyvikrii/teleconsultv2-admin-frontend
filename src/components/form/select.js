import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import {
    get_branch,
    get_department,
    get_specialist,
    get_doctor,
    get_patient
} from '../../api';

const DEBUG = 0;
const defaultFilters = {
    paginate: true
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

export const SelectSpecialistOld = (props) => {

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
            const {result, error} = await get_specialist(filters);
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

export const SelectDoctorOld = (props) => {

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
            const {result, error} = await get_doctor(filters);
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

export class SelectSpecialist extends React.Component {
    state = {
        data: [],
        list: this.props?.list ? this.props.list : null
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props?.list) {
            if(this.props.list.length > 0) {
                if(this.props?.list != prevProps?.list) {
                    this.setState({
                        ...this.state,
                        data: this.props?.list
                    });
                }
            }
        }
    }
    
    componentDidMount() {
        if(!this.state.list) this.getData();
        else {
            this.setState({
                ...this.state, data: this.state.list
            });
        }
    }

    getData = async() => {
        const {
            result, error, message
        } = await get_specialist({paginate: false})

        if(error) {
            console.log('error get_specialist:', message);
        } else {
            this.setState({
                ...this.state, data: result.data
            });
        }
    }

    render() {

        let {
            data
        } = this.state;

        return(
            <Select
                showSearch
                // style={{ width: 200 }}
                placeholder="Cari Spesialis"
                optionFilterProp="children"
                filterOption={ (input, option) => funcFilter(input, option)}
                className="sDash_fullwidth-select"
                {...this.props}
            >
                {   (data?.length > 0 ? data : []).map(row => {
                        return <Select.Option key={row.specialist_id} value={row.specialist_id}>{row.title}</Select.Option>
                    })
                }
            </Select>
        );
    }
}

export class SelectDoctor extends React.Component {

    state = {
        data: [],
        list: this.props?.list ? this.props.list : null
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props?.list) {
            if(this.props.list.length > 0) {
                if(this.props?.list != prevProps?.list) {
                    this.setState({
                        ...this.state,
                        data: this.props?.list
                    });
                }
            }
        }
    }
    
    componentDidMount() {
        if(!this.state.list) this.getData();
        else {
            this.setState({
                ...this.state, data: this.state.list
            });
        }
    }

    getData = async() => {
        const {
            result, error, message
        } = await get_doctor({paginate: false})

        if(error) {
            console.log('error select doctor:', message);
        } else {
            this.setState({
                ...this.state, data: result.data
            });
        }
    }

    render() {

        let {
            data
        } = this.state;

        return(
            <Select
                showSearch
                // style={{ width: 200 }}
                placeholder="Cari Dokter"
                optionFilterProp="children"
                filterOption={ (input, option) => funcFilter(input, option)}
                className="sDash_fullwidth-select"
                {...this.props}
            >
                {   (data?.length > 0 ? data : []).map(row => {
                        return <Select.Option key={row.doctor_id} value={row.doctor_id}>{row.display_name}</Select.Option>
                    })
                }
            </Select>
        );
    }
}

export class SelectBranch extends React.Component {

    state = {
        data: [],
        list: this.props?.list ? this.props.list : null
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props?.list) {
            if(this.props.list.length > 0) {
                if(this.props?.list != prevProps?.list) {
                    this.setState({
                        ...this.state,
                        data: this.props?.list
                    });
                }
            }
        }
    }
    
    componentDidMount() {
        if(!this.state.list) this.getData();
        else {
            this.setState({
                ...this.state, data: this.state.list
            });
        }
    }

    getData = async() => {
        const {
            result, error, message
        } = await get_branch({paginate: false})

        if(error) {
            console.log('error select branch:', message);
        } else {
            this.setState({
                ...this.state, data: result.data
            });
        }
    }

    render() {

        let {
            data
        } = this.state;

        return(
            <Select
                showSearch
                placeholder="Cari Cabang"
                optionFilterProp="children"
                filterOption={ (input, option) => funcFilter(input, option)}
                className="sDash_fullwidth-select"
                {...this.props}
            >
                {   (data?.length > 0 ? data : []).map(row => {
                        return <Select.Option key={row.branch_id} value={row.branch_id}>{row.name}</Select.Option>
                    })
                }
            </Select>
        );
    }
}

export class SelectDepartment extends React.Component {

    state = {
        data: [],
        list: this.props?.list ? this.props.list : null
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props?.list) {
            if(this.props.list.length > 0) {
                if(this.props?.list != prevProps?.list) {
                    this.setState({
                        ...this.state,
                        data: this.props?.list
                    });
                }
            }
        }
    }
    
    componentDidMount() {
        if(!this.state.list) this.getData();
        else {
            this.setState({
                ...this.state, data: this.state.list
            });
        }
    }

    getData = async() => {
        const {
            result, error, message
        } = await get_department({paginate: false})

        if(error) {
            console.log('error select department:', message);
        } else {
            this.setState({
                ...this.state, data: result.data
            });
        }
    }

    render() {

        let {
            data
        } = this.state;

        return(
            <Select
                showSearch
                // style={{ width: 200 }}
                placeholder="Cari Poli"
                optionFilterProp="children"
                filterOption={ (input, option) => funcFilter(input, option)}
                className="sDash_fullwidth-select"
                {...this.props}
            >
                {   (data?.length > 0 ? data : []).map(row => {
                        return <Select.Option key={row.department_id} value={row.department_id}>{row.name}</Select.Option>
                    })
                }
            </Select>
        );
    }
}

export class SelectPatient extends React.Component {

    state = {
        data: [],
        list: this.props?.list ? this.props.list : null
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props?.list) {
            if(this.props.list.length > 0) {
                if(this.props?.list != prevProps?.list) {
                    this.setState({
                        ...this.state,
                        data: this.props?.list
                    });
                }
            }
        }
    }
    
    componentDidMount() {
        if(!this.state.list) this.getData();
        else {
            this.setState({
                ...this.state, data: this.state.list
            });
        }
    }

    getData = async() => {
        const {
            result, error, message
        } = await get_patient({paginate: false})

        if(error) {
            console.log('error select doctor:', message);
        } else {
            this.setState({
                ...this.state, data: result.data
            });
        }
    }

    render() {

        let {
            data
        } = this.state;

        return(
            <Select
                showSearch
                placeholder="Cari Pasien"
                optionFilterProp="children"
                filterOption={ (input, option) => funcFilter(input, option)}
                className="sDash_fullwidth-select"
                {...this.props}
            >
                {   (data?.length > 0 ? data : []).map(row => {
                        return <Select.Option key={row.pid} value={row.pid}>{row.full_name}</Select.Option>
                    })
                }
            </Select>
        );
    }
}

export const SelectDate = (props) => {

    const [option, setOption] = useState([]);

    useEffect(() => {
        let tempOption = [];
        for (let index =1; index <= 31; index++) {
            tempOption.push(
                <Select.Option key={index} value={parseInt(index)}>{index}</Select.Option>
            );
        }

        setOption(tempOption);
    }, []);

    return(
        <Select {...props} placeholder="Tanggal">
            {option}
        </Select>
    );
}

export const GetMonth = function (month, short) {

	// Create month names
	var format = short ? 'short' : 'long';
	var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (mon) {
		return new Date(2000, mon).toLocaleString({}, {month: format});
	});

	// Return month name (or all of them)
	if (month) {
		return monthNames[(month - 1)];
	}
	return monthNames;

};

export const SelectMonth = (props) => {

    const [option, setOption] = useState([]);
    const [eProps, setEProps] = useState(props);

    useEffect(() => {
        let monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (mon) {
            return (
                <Select.Option key={mon} value={mon+1}>
                    {new Date(2000, mon).toLocaleString({}, {month: 'long'})}
                </Select.Option>
            );
        });
        
        setOption(monthNames);

        if(!props.placeholder) setEProps({...eProps, placeholder: 'Bulan'});
    }, []);

    return(
        <Select {...eProps} {...props}>
            {option}
        </Select>
    );
}

export const yearNow = () => {
    return new Date().getFullYear();
}

export const SelectYear = (props) => {

    const [option, setOption] = useState([]);
    const [eProps, setEProps] = useState(props);

    useEffect(() => {
        let tempYear = [];
        for(let i= yearNow() ; i >= 1900 ; i--)  {
            tempYear.push(<Select.Option key={i} value={i}>{i}</Select.Option>);
        }
        
        setOption(tempYear);

        if(!props.placeholder) setEProps({...eProps, placeholder: 'Tahun'});
    }, []);

    return(
        <Select {...eProps} {...props} showSearch={true}>
            {option}
        </Select>
    );
}