import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = ({ title, description, image, url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="VortLy" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
    </Helmet>
  );
};

export default MetaTags;