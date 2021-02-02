import React from 'react';
import { Radio } from 'antd';

export const RadioWeekDay = (props) => {
    return (
        <Radio.Group {...props}>
            <Radio.Button value="1">Senin</Radio.Button>
            <Radio.Button value="2">Selasa</Radio.Button>
            <Radio.Button value="3">Rabu</Radio.Button>
            <Radio.Button value="4">Kamis</Radio.Button>
            <Radio.Button value="5">Jumat</Radio.Button>
            <Radio.Button value="6">Sabtu</Radio.Button>
            <Radio.Button value="7">Minggu</Radio.Button>
        </Radio.Group>
    );
}

export const RadioGender = (props) => {
    return(
        <Radio.Group {...props}>
            <Radio.Button value="1">Laki-laki</Radio.Button>
            <Radio.Button value="2">Perempuan</Radio.Button>
            <Radio.Button value="3">Lainnya</Radio.Button>
        </Radio.Group>
    );
}