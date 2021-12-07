import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"
import breakpoints from "../config/breakpoints"
import { Helmet } from "react-helmet"

const PostImage = styled(Img)`
  width: 100% !important;
  min-height: 100px;
  height: auto !important;

  ${Object.keys(breakpoints).map(
    breakpoint => `
    @media (min-width: ${breakpoints[breakpoint]}) {
      width: 100vw !important;
      height: 250px !important;
      margin-left: calc((100vw - ${breakpoints[breakpoint]}) * -0.5 - 16px);
    }
  `
  )}
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark, otherPosts } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title}></SEO>
      <Helmet>
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={frontmatter.description} />
        <meta
          property="og:image"
          content={`https://chrisgriffing.com${frontmatter.coverImage.childImageSharp.og.src}`}
        />
        <meta
          name="twitter:image"
          content={`https://chrisgriffing.com${frontmatter.coverImage.childImageSharp.og.src}`}
        />
        <meta
          property="og:url"
          content={`https://chrisgriffing.com/blog/${frontmatter.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="page-content with-sidebar">
        <h2>{frontmatter.title}</h2>
        <h3>{frontmatter.date}</h3>
        <PostImage
          fixed={{
            ...frontmatter.coverImage.childImageSharp.fixed,
            base64: frontmatter.coverImage.childImageSharp.sqip.dataURI,
          }}
        />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <Sidebar data={data} otherPosts={otherPosts.edges} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    file(relativePath: { eq: "selfportrait.jpg" }) {
      childImageSharp {
        sqip(
          numberOfPrimitives: 42
          blur: 0
          width: 256
          height: 256
          mode: 6
        ) {
          dataURI
        }
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        coverImage {
          childImageSharp {
            sqip(
              numberOfPrimitives: 42
              blur: 0
              width: 256
              height: 256
              mode: 6
            ) {
              dataURI
            }
            fixed(width: 1200, height: 250, fit: COVER, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
            }
            og: fixed(width: 1200, height: 600, fit: COVER, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    otherPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  }
`
