import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

export interface IHomeProp extends StateProps, DispatchProps {}

export class GrantHome extends React.Component<IHomeProp> {
  render() {
    return (
      <Row>
        <Col md="9">
          <h2>Welcome to Grant's homepage!</h2>
          <p>Add your React code to src/main/webapp/app/modules/grant</p>
        </Col>
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
)(GrantHome);
