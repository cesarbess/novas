import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ArticlesList from './components/articles_list';
import SearchBar from './components/search_bar';
import SearchFilter from './components/search_filter';
import FilterTags from './components/filter_tags';
import NewsAPI from 'newsapi';


const API_KEY = 'cb44516c502f4379be46955eee0d3f8f';
const newsapi = new NewsAPI(API_KEY);

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

  // Listeners

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
      sourcesFilterName: sources[value],
      categoryFilter: null,
      categoryFilterName: null,
      countryFilter: null,
      countryFilterName: null
    }, () =>
    this.newsSearch());
  }

  onTermUpdate(value) {
    this.setState({
      term: value,
    }, () =>
    this.newsSearch());
  }

  onFilterClosed(value) {
    if (value == 'countryFilter') {
      this.setState({
        countryFilter: null,
        countryFilterName: null
      }, () =>
      this.newsSearch());
    }
    else if (value == 'categoryFilter') {
      this.setState({
        categoryFilter: null,
        categoryFilterName: null
      }, () =>
      this.newsSearch());
    }
    else if (value == 'sourcesFilter') {
      this.setState({
        sourcesFilter: null,
        sourcesFilterName: null
      }, () =>
      this.newsSearch());
    }
  }

  noFiltersSelected() {
    return this.state.term == '' &&
    this.state.countryFilter == null &&
    this.state.categoryFilter == null &&
    this.state.sourcesFilter == null
  }

  // Getters

  getCurrentFilters() {
    var currentFilters = []
    if (this.state.countryFilter) {
      currentFilters.push('countryFilter');
    }
    if (this.state.categoryFilter) {
      currentFilters.push('categoryFilter');
    }
    if (this.state.sourcesFilter) {
      currentFilters.push('sourcesFilter');
    }
    return currentFilters
  }

  getCurrentFiltersNames() {
    var currentFiltersNames = []
    if (this.state.countryFilter) {
      currentFiltersNames.push(this.state.countryFilterName);
    }
    if (this.state.categoryFilter) {
      currentFiltersNames.push(this.state.categoryFilterName);
    }
    if (this.state.sourcesFilter) {
      currentFiltersNames.push(this.state.sourcesFilterName);
    }
    return currentFiltersNames
  }

  // API CALLS

  displayTopHeadlines() {
    newsapi.v2.topHeadlines({
      country: 'us'
    }).then(response => {
      this.setState({
        articles: response.articles
      });
    });
  }

  newsSearch() {

    if (this.noFiltersSelected()) {
      this.displayTopHeadlines();
      return;
    }

    let term = this.state.term ? this.state.term : '';
    let countryFilter = this.state.countryFilter ? this.state.countryFilter : '';
    let queryType = this.state.countryFilter ? 'top-headlines' : 'everything';
    let categoryFilter = this.state.categoryFilter ? this.state.categoryFilter : '';
    let sourcesFilter = this.state.sourcesFilter ? this.state.sourcesFilter : '';

    newsapi.v2.topHeadlines({
      sources: sourcesFilter,
      q: term,
      category: categoryFilter,
      country: countryFilter
    }).then(response => {
      this.setState({
        articles: response.articles
      });
    });
  }

  render() {
    const onSearchTermChange = _.debounce((term) => {this.onTermUpdate(term)}, 300);
    const currentFilters = this.getCurrentFilters();
    const currentFiltersNames = this.getCurrentFiltersNames();
    return (
      <div>
        <SearchBar onSearchTermChange={onSearchTermChange}/>
        <FilterTags
          currentFiltersNames={currentFiltersNames}
          currentFilters={currentFilters}
          onFilterClosed={value => this.onFilterClosed(value)}
        />
        <p className='filter-label'>Filtrar por: </p>
        <div className="filters">
        <SearchFilter
          filterName={ this.state.countryFilterName || 'País'}
          filterItens={ filtroPais }
          onFilterSelect={ value => this.onCountryFilterSelect(value) }
        />
        <SearchFilter
          filterName={ this.state.categoryFilterName || 'Categoria'}
          filterItens={ filtroCategoria }
          onFilterSelect={ value => this.onCategoryFilterSelect(value)}
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
