import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import breakpoints from "../config/breakpoints"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import SEO from "../components/seo"

const PostList = styled.ol`
  list-style: none;
  padding-left: 0;
`

const PostLink = styled(Link)`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.breakpointSm}) {
    flex-direction: row;
  }
`

const PostDate = styled.div`
  color: #aaa;
`

const PostImageWrapper = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${breakpoints.breakpointMd}) {
    width: 200px;
  }

  .gatsby-image-wrapper {
    width: 184px;
    border-radius: 4px;

    img {
      border-radius: 4px;
    }
  }
`

const PostTitle = styled.h3`
  color: var(--text-color);
  margin-bottom: 4px;
`

const PostExcerpt = styled.p`
  max-width: 450px;
`

const PostListItemContent = styled.div`
  width: 100%;
  overflow-x: hidden;

  @media (min-width: ${breakpoints.breakpointSm}) {
    padding-left: 16px;
  }

  @media (min-width: ${breakpoints.breakpointMd}) {
    width: auto;
  }
`

const PostListItem = styled.li`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border-bottom: 1px solid #e5e5e5;
  padding: 16px;

  ${PostTitle} {
    color: var(--headingColor);
  }

  ${PostExcerpt} {
    color: var(--textColor);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.025);

    ${PostTitle} {
      color: var(--linkHoverColor);
    }
  }
`

const IndexPage = ({ data }) => {
  const recentPosts = data.blog.edges.slice(0, 5)
  const otherPosts = data.blog.edges.slice(5, 15)

  return (
    <Layout>
      <SEO title="Home" />
      <div className="page-content with-sidebar">
        <PostList>
          {recentPosts.map(post => {
            const { frontmatter, html, excerpt } = post.node
            const { slug, title, coverImage, date } = frontmatter

            const path = `blog/${slug}`

            return (
              <PostListItem>
                <PostLink to={path}>
                  <PostImageWrapper>
                    <Img
                      fluid={{
                        ...coverImage.childImageSharp.fluid,
                        base64: coverImage.childImageSharp.sqip.dataURI,
                      }}
                    />
                  </PostImageWrapper>
                  <PostListItemContent>
                    <PostTitle>{title}</PostTitle>
                    <PostDate>published on {date}</PostDate>
                    <PostExcerpt>{excerpt}</PostExcerpt>
                  </PostListItemContent>
                </PostLink>
              </PostListItem>
            )
          })}
        </PostList>
      </div>
      <Sidebar className="sidebar" data={data} otherPosts={otherPosts} />
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "selfportrait.jpg" }) {
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
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    blog: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 15
      filter: { fileAbsolutePath: { regex: "/blog/" } }
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
    projects: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
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
  }
`

export default IndexPage
