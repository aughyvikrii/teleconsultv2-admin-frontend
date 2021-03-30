import React from 'react';
const CountdownComp = require('react-countdown').default;

const Completionist = ({message}) => <small className="color-error">{message}</small>;
const renderer = ({ month, days, hours, minutes, seconds, completed, ...other }) => {
    if (completed) {
        // Render a complete state
        let message = null,
            _date = new Date(other.props.date),
            _today = new Date();

        _date = _date.getFullYear() + '-' + _date.getMonth() + '-' + _date.getDate();
        _today = _today.getFullYear() + '-' + _today.getMonth() + '-' + _today.getDate();

        if(_date === _today) message = 'Jam sudah lewat';
        return <Completionist message={message}/>;
    } else {
        // Render a countdown
        return (
        <small className="color-error">
            {   month > 0 ? <>{month} Bulan {days} Hari</> :
                days > 0 ?  <>{days} Hari {hours} Jam</> :
                hours > 0 ?  <>{hours} Jam {minutes} Menit</> :
                minutes > 0 ?  <>{minutes} Menit {seconds} Detik</> : <>{seconds} Detik</>
            }
        </small>
        );
    }
};

const Countdown = (props) => {

    let {
        date = null,
        time = null,
        render = null,
        ...otherProps
    } = props;

    const full_date = time ? date + ' ' + time : date;
    render = render ? render : renderer;
    return(
        <CountdownComp date={full_date} renderer={render}/>
    );
}

export { Countdown };