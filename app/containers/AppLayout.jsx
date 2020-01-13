// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';

import styles from './AppLayout.css';
import NavBar from '../components/NavBar';
import Home from '../components/Home';

const { Header, Footer, Sider, Content } = Layout;

type Props = {};

export default class AppLayout extends Component<Props> {
  props: Props;

  render() {
    return (
      <Layout className={styles['app-layout']}>
        <Sider theme="light" className={styles.sider}>
          <NavBar />
        </Sider>
        <Layout>
          <Header className={styles.header} />
          <Content className={styles.content}>
            <Home />
          </Content>
          <Footer className={styles.footer} />
        </Layout>
      </Layout>
    );
  }
}
