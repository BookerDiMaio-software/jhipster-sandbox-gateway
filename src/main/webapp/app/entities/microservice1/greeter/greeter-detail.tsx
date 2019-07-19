import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './greeter.reducer';
import { IGreeter } from 'app/shared/model/microservice1/greeter.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGreeterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class GreeterDetail extends React.Component<IGreeterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { greeterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Greeter [<b>{greeterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">First Name</span>
            </dt>
            <dd>{greeterEntity.firstName}</dd>
            <dt>
              <span id="lastName">Last Name</span>
            </dt>
            <dd>{greeterEntity.lastName}</dd>
            <dt>
              <span id="salutation">Salutation</span>
            </dt>
            <dd>{greeterEntity.salutation}</dd>
          </dl>
          <Button tag={Link} to="/entity/greeter" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/greeter/${greeterEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ greeter }: IRootState) => ({
  greeterEntity: greeter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GreeterDetail);
