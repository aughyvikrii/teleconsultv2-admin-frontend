import React from 'react';
import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import { UserCard } from '../style';
import Heading from '../heading/heading';
import { Cards } from '../cards/frame/cards-frame';
import { Button } from '../buttons/buttons';
import { Countdown } from '../countdown';
import { label_apstatus } from '../../utility/utility';

export const PatientCard = ({patient, from, loading, ...otherProps}) => {
  let url = from === 'history' ? 'history' : from === 'worklist' ? 'worklist' : 'appointment';

  const ref = React.createRef();
  const [width, setWidth] = React.useState(1000);

  React.useEffect(() => {
    setWidth(ref?.current?.offsetWidth);
  }, []);

  const printReport = (type) => {
    let link = '/report/print' + '?type=' + type + '&appointment_id=' + patient?.appointment_id;
    window.open(link, '__blank');
  }

  const ListReport = () => {
    return(
      <div>
        <Button type="primary" size="small" onClick={() => printReport('register')}>Laporan Pendaftaran</Button> &nbsp;&nbsp;
        <Button type="primary" size="small" onClick={() => printReport('soap')}>Laporan Soap</Button> &nbsp;&nbsp;
      </div>
    )
  }

  return (
    <UserCard>
      <div className="card user-card theme-list" ref={ref}>
        <Cards headless>
          <figure>
            <img src={patient?.patient_pic} alt={patient?.patient_name} />
            <figcaption
              style={{
                display: (width <= 650 ? 'unset' : 'flex')
              }}
            >
              <div className="card__content">
                <Heading className="card__name" as="h6">
                  <Link to="#">
                    #{patient?.appointment_id} {patient?.patient_name} | {label_apstatus(patient?.status)}
                  </Link>
                </Heading>
                <p className="card__designation color-error">
                  {patient?.id_consul_date} {patient?.consul_time}
                  { patient?.status === 'waiting_consul' && (<> <br/>
                    <Countdown date={patient.consul_date} time={patient.consul_time}/>
                    </>)
                  }
                </p>
                <b>Keluhan:</b> <br/>
                <p className="card-text">{patient?.main_complaint}</p>
              </div>

              <div className="card__actions">
              { patient?.status === 'waiting_consul' && from === 'worklist' && (
                <Button size="default" type="primary">
                  <Link to={'/doctor/worklist/' + patient.appointment_id + '/start'}>
                    Mulai Telekonsultasi
                  </Link>
                </Button>)
              }
                <Button size="default" type="white">
                  <Link to={'/admin/appointment/'+ patient.appointment_id}>
                    Lihat Detail
                  </Link>
                </Button>

                {from==='history' && (
                  <Popover content={ListReport} title="Tipe Laporan" placement="bottom" trigger="click">
                    <Button type="warning">
                      <i className="fa fa-print color-white" aria-hidden={true}></i>
                      Cetak Data
                    </Button>
                  </Popover>
                )}
              </div>
            </figcaption>
          </figure>
        </Cards>
      </div>
    </UserCard>
  );
};