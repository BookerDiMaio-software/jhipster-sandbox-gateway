import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Hello from './hello';
import HelloDetail from './hello-detail';
import HelloUpdate from './hello-update';
import HelloDeleteDialog from './hello-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HelloUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HelloUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HelloDetail} />
      <ErrorBoundaryRoute path={match.url} component={Hello} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HelloDeleteDialog} />
  </>
);

export default Routes;
