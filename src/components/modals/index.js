import React from 'react';
import { Form } from 'antd';
import { Modal } from '../modals/antd-modals';
import { FormAddScheduleNew } from '../form/form';

export const ModalCreateUpdateSchedule = (props) => {

    let {
        visible = false,
        title = 'Modal Add Schedule',
        onCancel = null,
        onConfirm = null,
        doctor_id = null,
        callback = null,
        form = null,
        mState = [],
        doctors = null,
        departments = null,
        branches = null,
        schedule_id = null,
        scheduleData = null,
        ...otherProps
    } = props;

    const [_visible, setVisible] = React.useState(visible);
    const _form = !form ? Form.useForm()[0] : form;
    const [modal, setModal] = mState.length === 0 ?  React.useState() : mState ;

    const _onCancel = () => {
        // _form.resetFields();
        setModal({...modal, visible: false});
    }

    const _onConfirm = (e) => {
        _form.submit();
    }

    React.useEffect(() => {
        if(typeof onCancel === "function") _onCancel = onCancel;
        if(typeof onConfirm === "function") _onConfirm = onConfirm;
    }, []);

    React.useEffect(() => {
        setVisible(props.visible);
    }, [props]);

    return(<>
        <Modal
            visible={_visible}
            title={title}
            onCancel={_onCancel}
            onConfirm={_onConfirm}
            forceRender={true}
            {...otherProps}
            zIndex={999}
            maskClosable={false}
            key="ModalAddSchedule"
        >
            <FormAddScheduleNew
                doctor_id={doctor_id}
                fromModal={true}
                defaultForm={_form}
                callback={callback}
                closeModal={_onCancel}
                doctors={doctors}
                departments={departments}
                branches={branches}
                scheduleData={scheduleData}
            />
        </Modal>
    </>);
}