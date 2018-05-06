import React from 'react';
import Media from 'react-bootstrap/lib/Media';

const ArticleListItem = ({article, onArticleSelect}) => {
  const defaultImageUrl = 'https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png';
  const imageUrl = article.urlToImage == null ? defaultImageUrl : article.urlToImage;
  
  return (
    <div>
      <Media className="article">
        <Media.Left>
          <img width={256} height={256} src={imageUrl} alt="thumbnail" />
        </Media.Left>
        <Media.Body className="article-body">
          <Media.Heading>{article.title}</Media.Heading>
          <p>
            {article.description}
          </p>
          <p> Publicado em: {article.publishedAt.substring(0,10)} </p>
          <a className= "external-link" target="_blank" href={article.url}>Ir para a página do artigo</a>
        </Media.Body>
      </Media>
    </div>
  );
};

export default ArticleListItem
