import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router ,Switch ,Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
class App extends Component {
  state = {
    users : [],
    user : {},
    repos : [],
    loading : false,
    alert : null
  }
  async componentDidMount() {
    this.setState({ loading : true});

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
    this.setState({users : res.data ,loading : false})
     
  }
  //Search Github users
  searchUsers = async text =>{
    this.setState({loading :true});
    const res = await axios
    .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   console.log( res.data.items);
    this.setState({users : res.data.items ,loading : false})
  }
  //Get a single github users 
  getUser = async (username) =>{
    this.setState({loading :true});
    const res = await axios
    .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user : res.data ,loading : false})
  }
  //Get User Repos
  getUserRepo = async (username) =>{
    this.setState({loading :true});
    const res = await axios
    .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos : res.data ,loading : false})
  }

  //Clear Users from state
  clearUsers = () => this.setState({users :[] ,loading : false});
  //Alert 
  setAlert = (msg ,type) =>{
    this.setState({alert : {msg ,type}});

    setTimeout( () => this.setState({alert : null}) , 5000)
  };
  render(){
    const { users ,user, loading,repos} = this.state;
    return(
     <Router>
        <div className='App'>
        <Navbar  title ="Github Finder"
        icon ='fab fa-github'/>
        <div className='container'>
          <Alert alert={this.state.alert}></Alert>
          <Switch>
            <Route 
            exact 
            path='/' 
            render={props => (
            <Fragment>
              <Search 
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers} 
              showClear ={users.length > 0 ? true : false} 
              setAlert = {this.setAlert}
              />
            <Users loading={loading} users={users}/>
            </Fragment>
            )
          }/>
          <Route exact path ='/about' component={About} ></Route>
          <Route exact path ='/user/:login' render ={props =>
           ( 
             <User 
             {...props}
             getUser={this.getUser} 
             getUserRepo={this.getUserRepo} 
             user ={user}
             repos= {repos}
             loading = {loading}/>
             )
          }/>
          </Switch>
          
        </div>
      </div>
     </Router>
    );
  }
}

export default App;
