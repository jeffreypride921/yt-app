import React from "react";
import './Current.css';

class Current extends React.Component{

  YOUTUBE_SEARCH_API = 'https://youtube.googleapis.com/youtube/v3/search';
  CATEGORY = -1;

  constructor(props) {
    super(props);

    this.state = {
        data: []
    };
  }

  changeCategory = (category) => {
    if(category === 'all') this.CATEGORY = 0;
    if(category === 'music') this.CATEGORY = 1;
    if(category === 'gaming') this.CATEGORY = 2;
    if(category === 'sports') this.CATEGORY = 3;
    if(category === 'entertainment') this.CATEGORY = 4;
    if(category === 'lifestyle') this.CATEGORY = 5;
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
    if(this.CATEGORY === 0){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.CATEGORY = 6;
    }
    if(this.CATEGORY === 1){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&topicId=/m/04rlf&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.CATEGORY = 6;
    }
    if(this.CATEGORY === 2){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&topicId=/m/0bzvm2&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.CATEGORY = 6;
    }
    if(this.CATEGORY === 3){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&topicId=/m/06ntj&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.CATEGORY = 6;
    }
    if(this.CATEGORY === 4){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&topicId=/m/02jjt&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.CATEGORY = 6;
    }
    if(this.CATEGORY === 5){
      fetch(`${this.YOUTUBE_SEARCH_API}?part=snippet&eventType=live&type=video&maxResults=50&order=viewCount&safeSearch=none&topicId=/m/019_rr&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            data: json
          });
        })
      this.CATEGORY = 6;
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