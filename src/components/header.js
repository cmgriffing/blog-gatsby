import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

import breakpoints from "../config/breakpoints"

const HeaderText = styled.h1`
  margin-top: 0;
  margin-bottom: -23px;
  font-weight: 100;
  font-size: 2.5em;
  white-space: nowrap;

  @media (min-width: ${breakpoints.breakpointMd}) {
    font-size: 4em;
    margin-bottom: -30px;
  }
`

const BlurbSection = styled.div`
  font-size: 1.846153em;
  line-height: 1.5em;
  margin: 0;
  color: #333;
  text-align: center;
  border-top: 5px solid #444;
  padding: 18px 24px 20px 24px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 30px;
`

const Header = () => (
  <div className="container">
    <header>
      <HeaderText>
        <Link to="/">Chris Griffing</Link>
      </HeaderText>
    </header>
    <BlurbSection>
      A Collection of Random Ramblings and Eclectic Interests
    </BlurbSection>
  </div>
)

export default Header
