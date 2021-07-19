/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"

const Wrapper = styled.div`
  overflow-x: hidden;
`

const Footer = styled.footer`
  padding: 16px;
  margin-top: 42px;
  text-align: center;
`

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  const data = {}

  return (
    <Wrapper>
      <Header siteTitle={data?.site?.siteMetadata?.title} />
      <div className="container">
        <main>{children}</main>
      </div>
      <Footer>© {new Date().getFullYear()} Chris Griffing</Footer>
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
