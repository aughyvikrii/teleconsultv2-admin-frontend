import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';


import Specialists from '../../container/specialist';
import Departments from '../../container/department';
import Branch from './Branch';
import Patient from './Patient';
import Doctor from './Doctor';
import Schedule from './Schedule';
import Appointment from './Appointment';
import Report from './Report';

const Admin = () => {
  const { path } = useRouteMatch();

  return (<>
    <Switch>
        <Route exact key="SpecialistRoute" path={`${path}/specialist`} component={Specialists} />
        <Route key="DepartmentRoute" path={`${path}/department`} component={Departments} />
        <Route key="BranchRoute" path={`${path}/branch`} component={Branch} />
        <Route key="PatientRoute" path={`${path}/patient`} component={Patient} />
        <Route key="DoctorRoute" path={`${path}/doctor`} component={Doctor} />
        <Route key="ScheduleRoute" path={`${path}/schedule`} component={Schedule} />
        <Route key="AppointmentRoute" path={`${path}/appointment`} component={Appointment} />
        <Route key="ReportRoute" path={`${path}/report`} component={Report} />
    </Switch>
  </>);
};

export default withAdminLayout(Admin);
