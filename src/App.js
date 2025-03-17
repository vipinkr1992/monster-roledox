import {Component} from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

class App extends Component {
 constructor(){
  super();

  this.state = {
    monsters:[],
    searchField:''
  };
 }

 componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => this.setState({ monsters: users }));
 }

 onSearchChange = event => {
  const searchFieldString = event.target.value.toLowerCase();
  //this.setState({searchField:searchFieldString});
  this.setState(()=>{
    return {searchField:searchFieldString};
  },() =>{
    console.log(this.state.searchField);
  })
}
 render(){
  const {monsters,searchField} = this.state;
  const filteredMonsters = monsters.filter((monster)=>{
    return monster.name.toLowerCase().includes(searchField);
  })
  return (
    <div className='App'>
      <h1>Monsters Roledox</h1>
      <SearchBox className='monsters-search-box' placeholder='Search Monsters' onChangeHandler={this.onSearchChange}/>
      <CardList monsters={filteredMonsters} />
       
    </div>
  )
 }
}

export default App;
