// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';

import NavBar from '../components/NavBar';
import Home from '../components/Home';

const { Header, Footer, Sider, Content } = Layout;

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <NavBar />
        </Sider>
        <Layout>
          <Header />
          <Content>
            <Home />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
