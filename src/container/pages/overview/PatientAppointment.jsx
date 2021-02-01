import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const PatientAppointment = () => {
    console.log(useRouteMatch());
    return(
        <div>
            PatientAppointment
        </div>
    );
}

export default PatientAppointment;