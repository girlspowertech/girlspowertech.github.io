import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article, TableOfContent } from '@/components/articles';
import Layout from '@/components/layout';
import data from '@/components/articles/data.json';
import useArticle from '@/hooks/useArticle';
import { parseMarkdownHeadings } from '@/components/articles/utils';
import Nav from '@/components/nav';
import Switch from '@/components/switch';
import { ArticleSkeleton } from '@/components/skeleton';


const getAnchor = (hash: string) => {
  const lastHash = hash.split('#').pop()!;
  return lastHash;
}


const ArticleWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const content = useArticle(`./docs/${ id }.md`!);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (content) {
      setFetching(false);
    }
  }, [content]);


  useEffect(() => {
    if (window.location.hash) {
      const id = getAnchor(window.location.hash);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }
  }, [window.location.hash, content]);


  useEffect(() => {
    document.title = data.find((article) => article.id === id)?.title || 'Article Not Found';
  }, [id]);

  const [activeId, setActiveId] = useState('');
  const toc = useMemo(() => parseMarkdownHeadings(content), [content]);

  return <Layout content={ fetching ? <ArticleSkeleton /> : <Article content={ content } /> }
    aside={
      <>
        <Switch />
        <Nav />
        <TableOfContent toc={ toc } activeId={ activeId } />
      </>
    }
  />;
};


export default ArticleWrapper;
