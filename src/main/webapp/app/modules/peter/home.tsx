import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { Game } from './tic-tac-toe';
import './sass/tic-tac-toe.scss';

export interface IHomeProp extends StateProps, DispatchProps {}

export class PeterHome extends React.Component<IHomeProp> {
  render() {
    return (
      <Row>
        <Col md="9">
          <h2>Welcome to Peter’s homepage!</h2>
          <p>Add your React code to src/main/webapp/app/modules/peter</p>
        </Col>
        <Game />
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeterHome);
