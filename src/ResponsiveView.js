import React from 'react'
import PropTypes from 'prop-types'
import Parser from 'html-react-parser'
import Frame, { FrameContextConsumer } from 'react-frame-component'

export function ResponsiveView(props) {
  if (!props.renderViews) return null

  const VIEWPORTS = Object.keys(props.breakpoints).reduce((acc, key) => {
    const value = props.breakpoints[key];

    const breakpoint = { name: `${key}: ${value}px`, width: `${value}px` };
    return [...acc, breakpoint];
  }, []);

  /**
   * All storybook stories are rendered inside an iFrame that contains the styles
   * We have to parse the document's head to extract all the styles that are applied
   * to the components being rendered.
   *
   * We also filter elements that are not object because the parser sometimes returns
   * empty elements which cause errors on the Frame component
   */
  const reactHtmlHead = Parser(document.head.innerHTML).filter((element) => typeof element === 'object')
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {VIEWPORTS.map(({ name, width }, i) => (
        <div key={i} style={{ margin: 15 }}>
          <p style={{ fontFamily: 'sans-serif' }}>{name}</p>
          <div style={{ height: 568, width }}>
            {/*
             * Every viewport content must be rendered inside an iFrame to ensure
             * that all the component's media queries are really activated when its
             * content is rendered inside each viewport
             */}
            <Frame
              head={reactHtmlHead}
              style={{
                height: '100%',
                width: '100%',
                border: 'none',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 10px 0px',
              }}
            >
              {props.children}
            </Frame>
          </div>
        </div>
      ))}
    </div>
  )
}

ResponsiveView.propTypes = {
  children: PropTypes.node.isRequired,
  breakpoints: PropTypes.objectOf(PropTypes.number).isRequired,
  renderViews: PropTypes.bool,
}

ResponsiveView.defaultProps = {
  renderViews: true,
}

export const ResponsiveContextConsumer = FrameContextConsumer
