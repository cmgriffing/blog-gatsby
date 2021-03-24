import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"
import breakpoints from "../config/breakpoints"

const PostImage = styled(Img)`
  max-width: calc(100vw - 32px);
  height: auto;

  @media (max-width: ${breakpoints.breakpointMd}) {
    width: 100% !important;
    min-height: 100px;
    height: auto !important;
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark, otherPosts } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <SEO></SEO>
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
