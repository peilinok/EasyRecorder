// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';

import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Recording from './Recording';
import Setting from './Setting';

import './style.scss';

const { Header, Footer, Sider, Content } = Layout;

type Props = {};

function getContents() {
  return [
    {
      path: '/recording',
      title: 'Recording',
      icon: 'camera',
      component: Recording,
      subItems: []
    },
    {
      path: '/setting',
      title: 'Setting',
      icon: 'setting',
      component: Setting,
      subItems: []
    }
  ];
}

export default class AppLayout extends Component<Props> {
  props: Props;

  render() {
    const contents = getContents();

    return (
      <Layout className="app-layout">
        <Sider theme="light" className="app-sider">
          <NavBar
            contents={contents}
            defaultOpen={contents[0]}
            defaultSelect={contents[0]}
          />
        </Sider>
        <Layout>
          <Header className="app-header" />
          <Content className="app-content">
            <Switch>
              {contents.map(content => {
                let route = null;
                if (
                  content.subItems !== undefined &&
                  content.subItems.length > 0
                )
                  route = <></>;
                else
                  route = (
                    <Route path={content.path} component={content.component} />
                  );

                return route;
              })}
              <Redirect to="/recording" />
            </Switch>
          </Content>
          <Footer className="app-footer" />
        </Layout>
      </Layout>
    );
  }
}
