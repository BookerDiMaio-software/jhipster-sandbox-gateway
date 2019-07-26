import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import world from '../../../static/images/world_spin.gif';
import { prependOnceListener } from 'cluster';
import { RouteComponentProps } from 'react-router-dom';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHomeState {
  people: [];
  idToken: number;
  searchF: string;
  searchL: string;
  firstName: string;
  lastName: string;
  salutation: string;
}

export class BrandonHome extends React.Component<IHomeProp> {
  state: IHomeState = {
    people: [],
    idToken: 0,
    searchF: '',
    searchL: '',
    firstName: '',
    lastName: '',
    salutation: ''
  };

  // this.randomIndex = Math.floor(Math.random()*10);

  handleInputChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  searchDB = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/authenticate', {
        password: 'admin',
        username: 'admin'
      })
      .then(response => {
        this.setState({ idToken: response.data.id_token });
        const headers = {
          headers: {
            Authorization: `Bearer ${this.state.idToken}`
          }
        };
        axios
          .get(`http://localhost:8080/services/microservice/api/_search/sayhelloworlds?query=${this.state.search}`, headers)
          .then(res => {
            console.log(res.data);
            if (res.data.length) {
              this.setState({ salutation: res.data[0].salutation, firstName: res.data[0].firstName, lastName: res.data[0].lastName });
            } else {
              this.randomIndex = Math.floor(Math.random() * this.props.people.length);
              this.setState({ salutation: '', firstName: '', lastName: '' });
            }
          });
      });
  };

  render() {
    console.log(this.randomIndex);
    return this.props.people.length ? (
      <div>
        {this.state.salutation.length ? (
          <h1>
            {this.state.salutation}, {this.state.firstName} {this.state.lastName}!
          </h1>
        ) : (
          <h1>
            {this.props.people[this.randomIndex].salutation}, {this.props.people[this.randomIndex].firstName}{' '}
            {this.props.people[this.randomIndex].lastName}!
          </h1>
        )}
        <img src={world} />

        <form onSubmit={this.searchDB}>
          <input name="searchF" value={this.state.searchF} placeholder="First Name" onChange={this.handleInputChange} />
          <input name="searchL" value={this.state.searchL} placeholder="Last Name" onChange={this.handleInputChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    ) : (
      <div>loading...</div>
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
)(BrandonHome);
