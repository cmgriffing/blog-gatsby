import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import CountUp from "react-countup"

import breakpoints from "../config/breakpoints"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import SEO from "../components/seo"

import BackgroundImage from "gatsby-background-image"

const Metrics = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.breakpointSm}) {
    flex-direction: row;
  }
`

const Metric = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border: thin solid #aaa;
  margin: 8px;
  padding: 8px;
`

const MetricCounter = styled(CountUp)`
  font-size: 42px;
  font-weight: bold;
  color: var(--linkHoverColor);
`

const ContactLink = styled.a`
  margin-left: 8px;
`

const InquirySection = styled.div`
  margin-top: 32px;
`

const ProjectsPage = ({ data }) => {
  const otherPosts = data.blogPosts.edges
  const monthlyMetrics = data.monthlyMetrics.edges
  const yearlyMetrics = data.yearlyMetrics.edges

  const [monthlyViewTotal, setMonthlyViewTotal] = useState(0)
  const [monthlyUniqueViewTotal, setMonthlyUniqueViewTotal] = useState(0)
  const [yearlyViewTotal, setYearlyViewTotal] = useState(0)
  const [averageViewers, setAverageViewers] = useState(0)

  console.log({ monthlyMetrics })

  useEffect(() => {
    setMonthlyViewTotal(
      monthlyMetrics.reduce((acc, metric) => {
        return acc + +metric.node.Live_Views
      }, 0)
    )

    setMonthlyUniqueViewTotal(
      monthlyMetrics.reduce((acc, metric) => {
        return acc + +metric.node.Unique_Viewers
      }, 0)
    )

    setAverageViewers(
      (
        monthlyMetrics.reduce((acc, metric) => {
          return acc + +metric.node.Average_Viewers
        }, 0) / monthlyMetrics.length
      ).toFixed(2)
    )
  }, [monthlyMetrics])

  return (
    <Layout>
      <SEO title="Streaming" />
      <div className="page-content with-sidebar">
        <h1>Streaming & Media</h1>

        {/* info about the stream */}
        <p>
          We have a blast working on various side projects. Frontend, backend,
          and everything in between. The stream is focused on taking ideas and
          launching them. The whole process is on display and we all learn
          something from it. We are always looking for something new and cool to
          check out and demonstrate.
        </p>

        {/* metrics */}
        <Metrics>
          <Metric>
            <h3>Monthly View Total</h3>
            <MetricCounter start={0} end={monthlyViewTotal} duration={2} />
          </Metric>
          <Metric>
            <h3>Average Viewers</h3>
            <MetricCounter
              decimals={2}
              start={0}
              end={averageViewers}
              duration={3}
            />
          </Metric>
          <Metric>
            <h3>Monthly Unique Viewers</h3>
            <MetricCounter
              start={0}
              end={monthlyUniqueViewTotal}
              duration={4}
            />
          </Metric>
        </Metrics>

        {/* Demographic data, might require more fine grained youtube stats since twitch only shows so much  */}

        {/* screenshots, maybe */}

        <div>
          <h3>Previous Partnerships</h3>
          <ul>
            <li>
              <h4>Microsoft</h4>
              <h5>Using Azure Computer Vision to detect emotions in a video</h5>
              <div>
                This was a fun collaboration. We used Azure Cognitive Services
                and their Face API to determine emotions. We didn't quite get as
                far as using a live video feed, but the implementation using
                mock photos and updating them on an interval was a great
                success. Kudos to the video editor. It encapsulates the fun we
                had in just the right way.
              </div>
              <h5>Relevant Link(s)</h5>
              <ul>
                <li>
                  Youtube recap:{" "}
                  <ContactLink
                    href="https://www.youtube.com/watch?v=BrIGjodrkvw"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    https://www.youtube.com/watch?v=BrIGjodrkvw
                  </ContactLink>
                </li>
              </ul>
            </li>

            <li>
              <h4>Server.pro</h4>
              <h5>Hosting Polliday</h5>
              <div>
                We wanted a tool like strawpoll.me but with enough of the
                features I needed on top. Editing questions, Multi-selection,
                etc. We used Meteor and tried Galaxy, the hosted meteor
                solution. That didn't live up to the task so Server.pro
                graciously sponsored the hosting. Performance is great. and
                spinning up docker inside the environment proved easy enough.
              </div>
              <h5>Relevant Link(s)</h5>
              <ul>
                <li>
                  Server.pro
                  <ContactLink
                    href="https://server.pro"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    https://server.pro
                  </ContactLink>
                </li>
                <li>
                  Polliday
                  <ContactLink
                    href="https://polliday.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    https://polliday.com
                  </ContactLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* inquiry */}
        <InquirySection>
          <h3>Interested?</h3>
          Would you like to partner up and let me promote your product or
          service? Get in touch with me at
          <ContactLink href="mailto:contact@chrisgriffing.com">
            contact@chrisgriffing.com
          </ContactLink>
        </InquirySection>
      </div>
      <Sidebar
        className="sidebar"
        data={data}
        otherPosts={otherPosts}
        showProjectsBlock={false}
      />
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

    blogPosts: allMarkdownRemark(
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

    monthlyMetrics: allMonthlyCsv {
      edges {
        node {
          id
          Chatters
          Follows
          Average_Viewers
          Unique_Viewers
          Live_Views
        }
      }
    }

    yearlyMetrics: allYearlyCsv {
      edges {
        node {
          id
          Unique_Viewers
          Live_Views
          Chatters
          Average_Viewers
        }
      }
    }
  }
`

export default ProjectsPage
