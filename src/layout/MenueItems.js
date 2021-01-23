import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';


const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}`}>
              <i aria-hidden="true" className="fa fa-home"></i>
            </NavLink>
          )
        }
        key="dashboard"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/appointment`}>
              <i aria-hidden="true" className="fa fa-calendar-check-o"></i>
            </NavLink>
          )
        }
        key="appointment"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/appointment`}>
          Perjanjian
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/doctor`}>
              <i aria-hidden="true" className="fa fa-user-md"></i>
            </NavLink>
          )
        }
        key="doctor"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/doctor`}>
          Dokter
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/schedule`}>
              <i aria-hidden="true" className="fa fa-calendar"></i>
            </NavLink>
          )
        }
        key="schedule"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/schedule`}>
          Jadwal Dokter
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/patient`}>
              <i aria-hidden="true" className="fa fa-wheelchair"></i>
            </NavLink>
          )
        }
        key="patient"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/patient`}>
          Pasien
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/branch`}>
              <i aria-hidden="true" className="fa fa-hospital-o"></i>
            </NavLink>
          )
        }
        key="branch"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/branch`}>
          Cabang
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/departement`}>
              <i aria-hidden="true" className="fa fa-medkit"></i>
            </NavLink>
          )
        }
        key="departement"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/departement`}>
          Departemen
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/specialist`}>
              <i aria-hidden="true" className="fa fa-stethoscope"></i>
            </NavLink>
          )
        }
        key="specialist"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/specialist`}>
          Spesialis
        </NavLink>
      </Menu.Item>

      <SubMenu key="report" icon={!topMenu && <i aria-hidden="true" className="fa fa-folder-open-o"></i>} title="Laporan">
        <Menu.Item key="inbox">
          <NavLink onClick={toggleCollapsed} to={`${path}/report/income`}>
            Pendapatan
          </NavLink>
        </Menu.Item>
        <Menu.Item key="single">
          <NavLink onClick={toggleCollapsed} to={`${path}/report/appointment`}>
            Perjanjian
          </NavLink>
        </Menu.Item>
      </SubMenu>

    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
