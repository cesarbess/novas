import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ArticlesList from './components/articles_list';
import SearchBar from './components/search_bar';
import SearchFilter from './components/search_filter';

const API_KEY = 'cb44516c502f4379be46955eee0d3f8f';

let filtroPais = ['Brasil', 'Estados Unidos'];
let filtroPaisAbrv = ['br', 'us'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      term: '',
      selectedArticle: null,
      countryFilter: null,
    };

    this.displayTopHeadlines();
  }

  onCountryFilterSelect(value) {
    this.setState({
      countryFilter: filtroPaisAbrv[value],
    }, () =>
    this.newsSearch());
  }

  onTermUpdate(value) {
    this.setState({
      term: value,
    }, () =>
    console.log(this.state));
    this.newsSearch();
  }

  // API CALLS

  displayTopHeadlines() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=br&sortBy=publishedAt&apiKey=${API_KEY}`)
    .then((response) => {
      this.setState({
        articles: response.data.articles
      });
    });
  }

  newsSearch() {
    let term = this.state.term ? this.state.term : '';
    let countryFilter = this.state.countryFilter ? this.state.countryFilter : '';
    let queryType = this.state.countryFilter ? 'top-headlines' : 'everything';
    console.log(`https://newsapi.org/v2/${queryType}?q=${term}&country=${countryFilter}&sortBy=publishedAt&apiKey=${API_KEY}`);
    axios.get(`https://newsapi.org/v2/${queryType}?q=${term}&country=${countryFilter}&sortBy=publishedAt&apiKey=${API_KEY}`)
    .then((response) => {
      this.setState({
        articles: response.data.articles
      });
    });
  }

  render() {
    const onSearchTermChange = _.debounce((term) => {this.onTermUpdate(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={onSearchTermChange}/>
        <p className='filter-label'>Filtrar por: </p>
        <SearchFilter
          filterName={'País'}
          filterItens={['Brasil', 'Estados Unidos']}
          onFilterSelect={value => this.onCountryFilterSelect(value)}
        />
        <ArticlesList
          onArticleSelect={selectedArticle => this.setState({selectedArticle})}
          articles={this.state.articles} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
