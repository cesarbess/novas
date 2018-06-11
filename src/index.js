import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ArticlesList from './components/articles_list';
import SearchBar from './components/search_bar';
import SearchFilter from './components/search_filter';

const API_KEY = 'cb44516c502f4379be46955eee0d3f8f';

let filtroPais = ['Brasil', 'Canada', 'Estados Unidos', 'França', 'Portugal', 'Russia'];
let filtroPaisAbrv = ['br', 'ca', 'us', 'fr', 'pt', 'ru'];

let filtroCategoria = ['Negócios', 'Entretenimento', 'Geral', 'Saúde', 'Ciência', 'Esportes', 'Tecnologia'];
let filtroCategoriaParams = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

let sources = ['ABC News', 'BBC news', 'BBC Sport', 'Bleacher Report', 'Bloomberg', 'Buzzfeed', 'CBC News', 'CBS News', 'CNN', 'Daily Mail', 'ESPN', 'Fox News', 'Fox Sports', 'Globo', 'Hacker News', 'MTV News', 'NFL News', 'NHL News', 'Tech Crunch',
               'The New York Times', 'The Verge', 'The Wall Street Journal', 'The Washington Post', 'Time', 'Vice News', 'Wired']

let sourcesParams = ['abc-news', 'bbc-news', 'bbc-sport', 'bleacher-report', 'bloomberg', 'buzzfeed', 'cbc-news', 'cbs-news', 'cnn', 'daily-mail', 'espn', 'fox-news', 'fox-sports', 'globo', 'hacker-news', 'mtv-news', 'nfl-news', 'nhl-news', 'tech-crunch',
                     'the-new-york-times', 'the-verge', 'the-wall-street-journal', 'the-washington-post', 'time', 'vice-news', 'wired'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      term: '',
      selectedArticle: null,
      countryFilter: null,
      countryFilterName: null,
      categoryFilter: null,
      categoryFilterName: null,
      sourcesFilter: null,
      sourcesFilterName: null
    };

    this.displayTopHeadlines();
  }

  onCountryFilterSelect(value) {
    this.setState({
      countryFilter: filtroPaisAbrv[value],
      countryFilterName: filtroPais[value]
    }, () =>
    this.newsSearch());
  }

  onCategoryFilterSelect(value) {
    this.setState({
      categoryFilter: filtroCategoriaParams[value],
      categoryFilterName: filtroCategoria[value]
    }, () =>
    this.newsSearch());
  }

  onSourcesFilterSelect(value) {
    this.setState({
      sourcesFilter: sourcesParams[value],
      sourcesFilterName: sources[value]
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
    let categoryFilter = this.state.categoryFilter ? this.state.categoryFilter : '';

    console.log(`https://newsapi.org/v2/${queryType}?q=${term}&country=${countryFilter}&sortBy=publishedAt&apiKey=${API_KEY}`);
    axios.get(`https://newsapi.org/v2/${queryType}?q=${term}&country=${countryFilter}&category=${categoryFilter}&sortBy=publishedAt&apiKey=${API_KEY}`)
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
        <div className="filters">
        <SearchFilter
          filterName={ this.state.countryFilterName || 'País'}
          filterItens={ filtroPais }
          onFilterSelect={value => this.onCountryFilterSelect(value)}
        />
        <SearchFilter
          filterName={ this.state.categoryFilterName || 'Categoria'}
          filterItens={ filtroCategoria }
          onFilterSelect={value => this.onCategoryFilterSelect(value)}
        />
        <SearchFilter
          filterName={ this.state.sourcesFilterName || 'Fonte'}
          filterItens={ sources }
          onFilterSelect={value => this.onSourcesFilterSelect(value)}
        />
        </div>
        <ArticlesList
          onArticleSelect={selectedArticle => this.setState({selectedArticle})}
          articles={this.state.articles} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
