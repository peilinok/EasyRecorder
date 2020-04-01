/* eslint-disable react/state-in-constructor */
// @flow
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ContentComponent } from '../../utils/types';

type Props = {
  contents: Array<ContentComponent>,
  defaultContent: ContentComponent
};

export default class ContentLayout extends React.Component<Props> {
  props: Props;

  render() {
    const { contents, defaultContent } = this.props;
    return (
      <Switch>
        {contents.map(content => {
          let route = null;
          if (content.subItems !== undefined && content.subItems.length > 0)
            route = <></>;
          else
            route = (
              <Route
                key={content.path}
                path={content.path}
                component={content.component}
              />
            );

          return route;
        })}
        <Redirect to={defaultContent.path} />
      </Switch>
    );
  }
}
