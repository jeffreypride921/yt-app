import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Current from './components/Current/Current';

class App extends React.Component {
  YOUTUBE_SEARCH_API = 'https://youtube.googleapis.com/youtube/v3/search';
  SWITCH = -1;
  CATEGORY = '';
  LANGUAGE = '';
  SEARCH = '';
  TYPE='live';
  ORDER='viewCount';

  constructor(props) {
    super(props);

    this.state = {
        data: [],
        searchTerm: ''
    };

    this.changeCategory = this.changeCategory.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  changeCategory(categoryVal){
    this.CATEGORY=categoryVal;
    this.SWITCH=1;

    this.setState({data: []});
  }

  changeLanguage(languageVal){
    this.LANGUAGE=languageVal;
    this.SWITCH=1;

    this.setState({data: []});
  }

  changeSearch(searchVal){
    this.SEARCH=searchVal;
    this.SWITCH=1;

    this.setState({data: []});
  }

  changeType(typeVal){
    this.TYPE=typeVal;
    this.SWITCH=1;

    if(this.TYPE === 'upcoming'){
      this.ORDER='videoCount';
    }
    else{
      this.ORDER='viewCount';
    }

    this.setState({data: []});
  }

  componentDidMount(){
    fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: json
        });
      })
  }

  componentDidUpdate(){
    if(this.SWITCH === 1){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=${this.TYPE}&type=video&maxResults=50&order=${this.ORDER}&safeSearch=none&topicId=${this.CATEGORY}&relevanceLanguage=${this.LANGUAGE}&q=${this.SEARCH}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.SWITCH = -1;
    }
  }

  render(){
    return (
      <div className='App'>
        <Navbar changeSearchParent={this.changeSearch} changeTypeParent={this.changeType}/>
        <Switch>
          <Route exact path="/">
            <Current changeCategoryParent={this.changeCategory} changeLanguageParent={this.changeLanguage} data={this.state} viewSearch={this.SEARCH}></Current>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
