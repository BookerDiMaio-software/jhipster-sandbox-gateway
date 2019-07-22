import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntityByName, getEntities } from './greeter.reducer';
import { IGreeter } from 'app/shared/model/microservice1/greeter.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGreeterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IGreeterState {
  searchF: string;
  searchL: string;
}

export class Greeter extends React.Component<IGreeterProps> {
  state: IGreeterState = {
    searchF: '',
    searchL: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.searchF && this.state.searchL) {
      this.props.getEntityByName(this.state.searchF, this.state.searchL);
    }
  };

  clear = () => {
    this.setState({ searchF: '', searchL: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearchF = event => this.setState({ searchF: event.target.value });
  handleSearchL = event => this.setState({ searchL: event.target.value });

  render() {
    const { greeterList, match } = this.props;
    return (
      <div>
        <h2 id="greeter-heading">
          Greeters
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Greeter
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="searchF"
                    value={this.state.searchF}
                    onChange={this.handleSearchF}
                    placeholdecdr={translate('gatewayApp.helloWorldGreeter.firstName')}
                  />
                  <AvInput
                    type="text"
                    name="searchL"
                    value={this.state.searchL}
                    onChange={this.handleSearchL}
                    placeholder={translate('gatewayApp.helloWorldGreeter.lastName')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="sync" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {greeterList && greeterList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Salutation</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {greeterList.map((greeter, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${greeter.id}`} color="link" size="sm">
                        {greeter.id}
                      </Button>
                    </td>
                    <td>{greeter.firstName}</td>
                    <td>{greeter.lastName}</td>
                    <td>{greeter.salutation}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${greeter.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${greeter.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${greeter.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Greeters found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ greeter }: IRootState) => ({
  greeterList: greeter.entities,
  greeter: greeter.entity
});

const mapDispatchToProps = {
  getEntityByName,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeter);
