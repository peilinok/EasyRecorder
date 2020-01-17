/* eslint-disable react/state-in-constructor */
// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';

import SiderLayout from './Sider';
import HeaderLayout from './Header';
import ContentLayout from './Content';
import FooterLayout from './Footer';

import contents from './contents';
import './style.scss';

const { Header, Footer, Sider, Content } = Layout;

type Props = {
  location: {
    pathname: string
  },
  match: {
    path: string
  }
};

type State = {
  collapsed: boolean
};

export default class AppLayout extends Component<Props, State> {
  props: Props;

  state: State;

  state = {
    collapsed: true
  };

  toggleCollapsed = () => {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed
    });
  };

  render() {
    const { collapsed } = this.state;
    const { match, location } = this.props;
    return (
      <Layout className="app-layout">
        <Sider
          theme="dark"
          className="app-sider"
          collapsible
          collapsed={collapsed}
          onCollapse={this.toggleCollapsed}
        >
          <SiderLayout
            contents={contents}
            defaultOpen={contents[0]}
            defaultSelect={contents[0]}
          />
        </Sider>
        <Layout>
          <Header className="app-header">
            <HeaderLayout
              pathname={location.pathname.replace(match.path, '')}
            />
          </Header>
          <Content className="app-content">
            <ContentLayout contents={contents} defaultContent={contents[0]} />
          </Content>
          <Footer className="app-footer">
            <FooterLayout />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
