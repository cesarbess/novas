import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ArticlesList from './components/articles_list';
import SearchBar from './components/search_bar';

const API_KEY = 'cb44516c502f4379be46955eee0d3f8f';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      selectedArticle: null
    };
    this.displayTopHeadlines();
  }
  
  displayTopHeadlines() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=br&sortBy=publishedAt&apiKey=${API_KEY}`)
    .then((response) => {
      this.setState({
        articles: response.data.articles
      });
    });
  }
  
  newsSearch(term, isTopHeadlines) {
    axios.get(`https://newsapi.org/v2/everything?q=${term}&sortBy=publishedAt&apiKey=${API_KEY}`)
    .then((response) => {
      this.setState({
        articles: response.data.articles
      });
    });
  }

  render() {
    const newsSearch = _.debounce((term) => {this.newsSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={newsSearch}/>
        <ArticlesList
          onArticleSelect={selectedArticle => this.setState({selectedArticle})}
          articles={this.state.articles} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
