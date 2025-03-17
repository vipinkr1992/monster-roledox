import {useEffect,useState} from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

const App = () => {
  const [searchField,setSearchField] = useState('');
  const [monsters,setMonsters] = useState([]);
  const [filteredMonsters,setFilteredMonsters] = useState(monsters);
  
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setMonsters(users));
  },[])

  useEffect(()=>{
    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchField);
    })
    setFilteredMonsters(filteredMonsters)
  },[monsters,searchField])

  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLowerCase();
    //this.setState({searchField:searchFieldString});
    setSearchField(searchFieldString);
  }

  return(
   <div className='App'>
      <h1>Monsters Roledox</h1>
      <SearchBox className='monsters-search-box' placeholder='Search Monsters' onChangeHandler={onSearchChange}/>
      <CardList monsters={filteredMonsters} />
       
    </div>
  )
}
/*
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
*/
export default App;
