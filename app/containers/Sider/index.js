// @flow
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

import { ContentComponent } from '../../utils/types';

type Props = {
  contents: Array<ContentComponent>,
  defaultOpen: ContentComponent,
  defaultSelect: ContentComponent
};

export default class SiderLayout extends Component<Props> {
  props: Props;

  render() {
    const { contents, defaultOpen, defaultSelect } = this.props;
    return (
      <Menu
        className="sider-layout"
        defaultOpenKeys={[defaultOpen.path]}
        defaultSelectedKeys={[defaultSelect.path]}
        theme="dark"
        mode="inline"
        default
      >
        {contents.map(content => {
          if (content.subItems.length > 0) {
            return (
              <Menu.SubMenu
                key={content.path}
                title={
                  <span>
                    <Icon type={content.icon} />
                    <span>{content.title}</span>
                  </span>
                }
              >
                {content.subItems.map(subItem => (
                  <Menu.Item key={subItem.path}>
                    <NavLink to={subItem.path}>
                      <Icon type={subItem.icon} />
                      <span>{subItem.title}</span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }
          return (
            <Menu.Item key={content.path}>
              <NavLink to={content.path}>
                <Icon type={content.icon} />
                <span>{content.title}</span>
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
