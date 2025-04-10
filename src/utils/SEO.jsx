import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, type, name, page }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={`${import.meta.env.VITE_CLIENT_URL}/${page}`} />
      <link rel="canonical" href={`${import.meta.env.VITE_CLIENT_URL}/${page}`} />
      <meta
        property="og:site_name"
        content={`${import.meta.env.VITE_CLIENT_URL}/${page}`}
      />
      <meta property="og:type" content="website" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default SEO;