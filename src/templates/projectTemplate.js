import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"
import breakpoints from "../config/breakpoints"

const PostImage = styled(Img)`
  width: 100% !important;
  min-height: 100px;
  height: auto !important;

  ${Object.keys(breakpoints).map(
    breakpoint => `
    @media (min-width: ${breakpoints[breakpoint]}) {
      width: 100vw !important;
      height: 250px !important;
      // transform: translateX(
      //   calc((100vw - ${breakpoints[breakpoint]}) * -0.5 - 16px);
      // );

      margin-left: calc((100vw - ${breakpoints[breakpoint]}) * -0.5 - 16px);
    }
  `
  )}
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { project, otherPosts } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = project

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
    project: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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

    projects: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 100
      filter: { fileAbsolutePath: { regex: "/projects/" } }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            date
            slug
            coverImage {
              childImageSharp {
                sqip(
                  numberOfPrimitives: 120
                  blur: 0
                  width: 256
                  height: 256
                  mode: 4
                ) {
                  dataURI
                }
                fluid(
                  maxWidth: 400
                  maxHeight: 400
                  fit: COVER
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    otherPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
      filter: { fileAbsolutePath: { regex: "/blog/" } }
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
