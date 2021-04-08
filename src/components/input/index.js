import React from 'react';
import { Select, Row, Col, Input } from 'antd';
import { maskingInputTime, maskingInputDate } from '../../utility/utility';

const SelectDate = (props) => {

    const [option, setOption] = React.useState([]);
    const [eProps, setEProps] = React.useState({});

    React.useEffect(() => {
        let tempOption = [];
        for (let index =1; index <= 31; index++) {
            tempOption.push(
                <Select.Option key={index} value={parseInt(index)}>{index}</Select.Option>
            );
        }

        setOption(tempOption);
        if(!props?.placeholder) setEProps({...eProps, placeholder: 'Tanggal'});
    }, []);

    return(<Select {...props} {...eProps}>{option}</Select>);
}

const GetMonth = function (month, short) {

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

const SelectMonth = (props) => {
    const [option, setOption] = React.useState([]);
    const [eProps, setEProps] = React.useState(props);

    React.useEffect(() => {
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

    return(<Select {...eProps} {...props}>{option}</Select>);
}

const yearNow = () => {
    return new Date().getFullYear();
}

const SelectYear = (props) => {
    const [option, setOption] = React.useState([]);
    const [eProps, setEProps] = React.useState(props);

    React.useEffect(() => {

        let start_year = props?.start ? props.start : 1900,
            end_year = props?.end ? props.end : yearNow();

        let tempYear = [];
        for(let i= end_year ; i >= start_year ; i--)  {
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

const SelectFullDate = (props) => {
    return(
        <Row gutter={[8, 8]}>
            <Col span={8}>
                <SelectDate/>
            </Col>
            <Col span={8}>
                <SelectMonth/>
            </Col>
            <Col span={8}>
                <SelectYear start={1850}/>
            </Col>
        </Row>
    );
}

const InputTime = (props) => {
    return(
        <Input placeholder="23:59" onKeyDown={maskingInputTime} onKeyUp={maskingInputTime} {...props}/>
    );
}

const InputDate = (props) => {
    return(
        <Input placeholder="23:59" onKeyDown={maskingInputDate} onKeyUp={maskingInputDate} {...props}/>
    );
}

export {
    SelectDate,
    GetMonth,
    SelectMonth,
    yearNow,
    SelectYear,
    SelectFullDate,
    InputTime,
    InputDate
};