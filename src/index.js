import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveView, ResponsiveContextConsumer } from './ResponsiveView'

import addons, { makeDecorator } from '@storybook/addons'

export class Decorator extends Component {
  static propTypes = {
    channel: PropTypes.shape({
      emit: PropTypes.func,
      on: PropTypes.func,
      removeListener: PropTypes.func,
    }),
    story: PropTypes.func.isRequired,
    breakpoints: PropTypes.objectOf(PropTypes.number),
  }

  static defaultProps = {
    channel: undefined,
    breakpoints: {
      tablet: 768,
      desktop: 1024,
    },
  }

  constructor (props) {
    super(props)

    const { channel, story } = props

    if (channel) {
      this.channel = channel
    } else {
      this.channel = addons.getChannel()
    }

    this.story = story
  }

  state = {
    enableViews: true,
  }

  componentDidMount () {
    this.channel.emit('responsive-addons/check_status')

    this.channel.on('responsive-addons/enable_views', (isEnabled) => {
      this.setState({ enableViews: isEnabled })
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.story !== prevProps.story) {
      this.story = this.props.story
    }
  }

  renderStory = () => {
    return (
      <div style={{ margin: 15 }}>
        {this.story}
      </div>
    )
  }

  renderViews = () => {
    return (
      <Fragment>
        {this.renderStory()}
        <ResponsiveView breakpoints={this.props.breakpoints}>
          {this.story.props.children}
        </ResponsiveView>
      </Fragment>
    )
  }

  render () {
    const { enableViews } = this.state
    return enableViews ? this.renderViews() : this.renderStory()
  }
}

export const withResponsiveViews = makeDecorator({
  name: 'withResponsiveViews',
  parameterName: 'responsiveViews',
  wrapper: (getStory, context, { options }) => { // eslint-disable-line react/display-name
    return <Decorator story={getStory(context)} breakpoints={options} />
  },
})

export const ResponsiveViewContextConsumer = ResponsiveContextConsumer
