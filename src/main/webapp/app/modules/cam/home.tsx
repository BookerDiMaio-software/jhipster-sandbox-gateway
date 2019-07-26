import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { getEntityAlphaLastName } from '../../entities/microservice1/greeter/greeter.reducer';

export interface IHomeProp extends StateProps, DispatchProps {}

export class CamHome extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getEntityAlphaLastName();
  }

  render() {
    const greeter = this.props.greeterEntity;
    return (
      <Row>
        <Col md="9">
          <h2>Welcome to Cam's homepage!</h2>
          <p>
            Sorting alphabetically by last name, {greeter.firstName} {greeter.lastName} is first.
          </p>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  greeterEntity: storeState.greeter.entity
});

const mapDispatchToProps = {
  getEntityAlphaLastName
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamHome);
