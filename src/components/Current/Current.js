import React from "react";
import './Current.css';

class Current extends React.Component{

  YOUTUBE_SEARCH_API = 'https://youtube.googleapis.com/youtube/v3/search';
  SWITCH = -1;
  CATEGORY = '';
  LANGUAGE = '';

  constructor(props) {
    super(props);

    this.state = {
        data: []
    };
  }

  changeCategory = (category) => {
    if(category === 'all') this.CATEGORY = '';
    if(category === 'music') this.CATEGORY = '/m/04rlf';
    if(category === 'gaming') this.CATEGORY = '/m/0bzvm2';
    if(category === 'sports') this.CATEGORY = '/m/06ntj';
    if(category === 'entertainment') this.CATEGORY = '/m/02jjt';
    if(category === 'lifestyle') this.CATEGORY = '/m/019_rr';
    this.SWITCH = 1;
    this.setState({data: []})
  }

  changeLanguage = (lang) => {
    if(lang === 'all') this.LANGUAGE = '';
    if(lang === 'english') this.LANGUAGE='en';
    if(lang === 'spanish') this.LANGUAGE='es';
    if(lang === 'hindi') this.LANGUAGE='hi';
    if(lang === 'chinese') this.LANGUAGE='zh';
    if(lang === 'japanese') this.LANGUAGE='ja';
    if(lang === 'korean') this.LANGUAGE='ko';
    this.SWITCH = 1;
    this.setState({data: []})
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
    if(this.SWITCH === 0){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.CATEGORY = -1;
    }
    if(this.SWITCH === 1){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&topicId=${this.CATEGORY}&relevanceLanguage=${this.LANGUAGE}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
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
    const { data } = this.state;
    console.log('data', data);
    return(
      <div className="page">
        <li className="options">
          <input type="radio" id="all" name="categories" defaultChecked/><label for="all" onClick={() => this.changeCategory('all')}>All</label>
          <input type="radio" id="music" name="categories"/><label for="music" onClick={() => this.changeCategory('music')}>Music</label>
          <input type="radio" id="gaming" name="categories"/><label for="gaming" onClick={() => this.changeCategory('gaming')}>Gaming</label>
          <input type="radio" id="sports" name="categories"/><label for="sports" onClick={() => this.changeCategory('sports')}>Sports</label>
          <input type="radio" id="entertainment" name="categories"/><label for="entertainment" onClick={() => this.changeCategory('entertainment')}>Entertainment</label>
          <input type="radio" id="lifestyle" name="categories"/><label for="lifestyle" onClick={() => this.changeCategory('lifestyle')}>Lifestyle</label>
        </li>

        <li className='languages'>
          <input type="radio" id='all_lang' name='langs' defaultChecked/><label for='all_lang' onClick={() => this.changeLanguage('all')}>All</label>
          <input type="radio" id='english' name='langs'/><label for='english' onClick={() => this.changeLanguage('english')}>English</label>
          <input type="radio" id='spanish' name='langs'/><label for='spanish' onClick={() => this.changeLanguage('spanish')}>Spanish</label>
          <input type="radio" id='hindi' name='langs'/><label for='hindi' onClick={() => this.changeLanguage('hindi')}>Hindi</label>
          <input type="radio" id='chinese' name='langs'/><label for='chinese' onClick={() => this.changeLanguage('chinese')}>Chinese</label>
          <input type="radio" id='japanese' name='langs'/><label for='japanese' onClick={() => this.changeLanguage('japanese')}>Japanese</label>
          <input type="radio" id='korean' name='langs'/><label for='korean' onClick={() => this.changeLanguage('korean')}>Korean</label>
        </li> 

        <div className="ytItems">
          {data.items?.map((item) => {
            const snippet = item.snippet;
            const title = snippet.title;
            const thumbnail_medium = snippet.thumbnails.medium;
            return(
              <li key={item.id.videoId}>
                  <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>
                    <img width={thumbnail_medium.width} height={thumbnail_medium.height} src={thumbnail_medium.url} alt="" />
                    <p className="title">{title}</p>
                  </a>
                  <a href={`https://www.youtube.com/channel/${snippet.channelId}`}>
                    <p className="channel">{snippet.channelTitle}</p>
                  </a>
              </li>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Current