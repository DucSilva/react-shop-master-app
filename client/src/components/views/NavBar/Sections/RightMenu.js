/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge, Dropdown, Button } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

const styleIcon = {
  marginRight: 5,
}

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Icon type="user" style={styleIcon} />
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="user" style={styleIcon} />
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" onClick={logoutHandler}>
        <Icon type="logout" style={styleIcon} />
        Log Out
      </Menu.Item>
    </Menu>
  );

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22, color: '#667777' }}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>


        <Menu.Item key="logout">
          <Dropdown overlay={menu} placement="bottomRight">
            <Button style={{ minWidth: 150, background: 'transparent', margin: '0 0 15px 15px' }}>Hi! {user.userData !== undefined ? user.userData.name : ''}</Button>
          </Dropdown>
          {/* <a onClick={logoutHandler}>Logout</a> */}
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

