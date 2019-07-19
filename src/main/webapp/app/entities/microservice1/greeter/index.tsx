import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Greeter from './greeter';
import GreeterDetail from './greeter-detail';
import GreeterUpdate from './greeter-update';
import GreeterDeleteDialog from './greeter-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GreeterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GreeterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GreeterDetail} />
      <ErrorBoundaryRoute path={match.url} component={Greeter} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={GreeterDeleteDialog} />
  </>
);

export default Routes;
