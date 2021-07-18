import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import "./layout.css"

const SidebarWrapper = styled.div`
  padding: 0 32px;
  background: rgba(238, 238, 238, 0.8);
  z-index: 1;
`

const SelfPortrait = styled(Img)`
  border-radius: 100%;
  width: 100%;
  height: auto;
  margin: 0 auto;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
`

const PostList = styled.ul`
  padding: 0;
`

const PostListItem = styled.li`
  margin-bottom: 16px;
  color: var(--linkHoverColor);

  a:hover {
    color: var(--linkHoverColor);

    h5 {
      color: var(--linkHoverColor);
    }
  }
`

const PostLink = styled(Link)`
  display: flex;
`

const PostImageWrapper = styled.div`
  width: 200px;

  .gatsby-image-wrapper {
    width: 200px;
  }
`

const PostListItemContent = styled.div`
  padding-left: 16px;
`

const PostTitle = styled.h5`
  margin: 0;
`

const SidebarContent = styled.div``

const ProjectsBlock = styled(Link)`
  display: block;
  border-radius: 4px;
  border: 2px solid var(--linkHoverColor);
  padding: 8px;
  margin-top: 16px;

  h4 {
    margin-top: 0;
  }

  p {
    color: var(--textColor);
  }

  &:hover {
    border: 3px solid var(--linkHoverColor);
    background: rgba(0, 0, 0, 0.025);

    h4 {
      color: var(--linkHoverColor);
    }
  }
`

const ProjectsBlockLink = styled(Link)`
  display: block;
  margin-top: 16px;

  h4 {
    display: inline;
    padding-right: 16px;
  }
`

const StreamingLink = styled(Link)`
  display: block;
  margin-top: 16px;

  h4 {
    display: inline;
    padding-right: 16px;
  }
`

const Sidebar = ({
  children,
  otherPosts,
  data,
  showProjectsBlock,
  showStreamingBlock,
}) => {
  if (showProjectsBlock !== false) {
    showProjectsBlock = true
  }

  // Temporarily disable projects while finishing content for them
  showProjectsBlock = false

  if (showStreamingBlock !== false) {
    showStreamingBlock = true
  }

  return (
    <SidebarWrapper className="sidebar">
      <SelfPortrait
        fluid={{
          ...data?.file?.childImageSharp?.fluid,
          base64: data?.file?.childImageSharp?.sqip?.dataURI,
        }}
      />
      <SidebarContent>
        {showStreamingBlock && (
          <div>
            <StreamingLink to="/streaming">
              <h4>Streaming</h4> see more
            </StreamingLink>
            <p>
              I live-code on Twitch. We are always looking for sponsors and
              partnered content. Check it out.
            </p>
          </div>
        )}
        {showProjectsBlock && (
          <div>
            <ProjectsBlockLink to="/projects">
              <h4>Projects</h4>
              see more
            </ProjectsBlockLink>
            <PostList>
              {data.projects.edges.map(post => {
                const { slug, title } = post.node.frontmatter
                return (
                  <PostListItem>
                    <PostLink to={`/projects/${slug}`}>
                      <PostTitle>{title}</PostTitle>
                    </PostLink>
                  </PostListItem>
                )
              })}
            </PostList>
          </div>
        )}

        <h4>Other Blog Posts</h4>
        <PostList>
          {otherPosts.map(post => {
            const { slug, title } = post.node.frontmatter
            return (
              <PostListItem>
                <PostLink to={`/blog/${slug}`}>
                  <PostTitle>{title}</PostTitle>
                </PostLink>
              </PostListItem>
            )
          })}
        </PostList>
      </SidebarContent>
    </SidebarWrapper>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  otherPosts: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  showProjectsBlock: PropTypes.bool,
}

export default Sidebar
