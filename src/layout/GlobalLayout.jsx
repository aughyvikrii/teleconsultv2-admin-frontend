// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Modal } from '../components/modals/antd-modals';
// import LoginForm from '../container/auth/LoginForm';

// const GlobalLayout = ({children}) => {

//     const { loginModal } = useSelector(state => {
//         return {
//             loginModal: state.auth.loginModal,
//         };
//     });

//     return(
//     <>
//             <Modal key="ModalLogin" visible={loginModal} maskClosable={false} noFooter={true} closeIcon={<i></i>}>
//                 <LoginForm/>
//             </Modal>
//             {children}
//         {/* { loginModal ? (
//         )
//         : (children) } */}
//     </>);
// }

// export default GlobalLayout;