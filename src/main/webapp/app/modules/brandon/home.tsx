import { IGreeter } from 'app/shared/model/microservice1/greeter.model';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import world from '../../../static/images/world_spin.gif';

export interface IHomeProp extends RouteComponentProps<{ url: string }> {}

export interface IHomeState {
  idToken: number;
  searchF: string;
  searchL: string;
  person: IGreeter;
  isConnected: boolean;
}

export class BrandonHome extends React.Component<IHomeProp> {
  state: IHomeState = {
    idToken: 0,
    searchF: '',
    searchL: '',
    person: null,
    isConnected: false
  };

  // this.randomIndex = Math.floor(Math.random()*10);

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  searchDB = event => {
    const apiSearchUrl = 'http://localhost:8080/services/microservice1/api/greeters/find';
    event.preventDefault();
    axios
      .post('http://localhost:8080/api/authenticate', {
        password: 'admin',
        username: 'admin'
      })
      .then(response => {
        this.setState({ idToken: response.data.id_token, isConnected: true });
        const headers = {
          headers: {
            Authorization: `Bearer ${this.state.idToken}`
          }
        };
        axios.get(`${apiSearchUrl}?=${this.state.searchF}&${this.state.searchL}`, headers).then(res => {
          // console.log(res.data);
          if (res.data.length) {
            this.setState({ person: res.data[0] });
          }
        });
      })
      .catch(response => {
        this.setState({ isConnected: false });
      });
  };

  render() {
    // console.log(this.randomIndex);
    return this.state.isConnected ? (
      <div>
        {this.state.person !== null ? (
          <h1>
            {this.state.person.salutation}, {this.state.person.firstName} {this.state.person.lastName}!
          </h1>
        ) : (
          <h1>Nobody matching the search criteria found.</h1>
        )}
        <img src={world} />

        <form onSubmit={this.searchDB}>
          <input name="searchF" value={this.state.searchF} placeholder="First Name" onChange={this.handleInputChange} />
          <input name="searchL" value={this.state.searchL} placeholder="Last Name" onChange={this.handleInputChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    ) : (
      <h2>Loading...</h2>
    );
  }
}

const mapStateToProps = storeState => ({});

const mapDispatchToProps = {};

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandonHome);
