import React from 'react';
import ArticleListItem from './article_list_item'
import ListGroup from 'react-bootstrap/lib/ListGroup';
import CustomComponent from 'react-bootstrap/lib';

const ArticleList = (props) => {
  const articleItems = props.articles.map((article) => {
    return <ArticleListItem
      onArticleSelect={props.onArticleSelect}
      key={article.url}
      article={article} />
  });

  //React detects that it's an array of components and renders them separately
  return (
    <ListGroup componentClass="ul">
    <li className="list-group-item" onClick={() => {}}>
      {articleItems}
    </li>
    </ListGroup>
  );
};

export default ArticleList;
