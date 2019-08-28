import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icons, IconButton } from '@storybook/components';

export class Tool extends Component {
  static propTypes = {
    api: PropTypes.shape({
      getQueryParam: PropTypes.func,
      setQueryParams: PropTypes.func,
    }).isRequired,
    channel: PropTypes.shape({
      emit: PropTypes.func,
      on: PropTypes.func,
      removeListener: PropTypes.func,
    }),
  }

  static defaultProps = {
    channel: undefined,
  }

  constructor (props) {
    super(props)
    this.state = {
      enableViews: false,
    }
    this.toggleViews = this.toggleViews.bind(this)
  }

  componentDidMount () {
    const { channel } = this.props

    channel.on('responsive-addons/check_status', () => {
      channel.emit('responsive-addons/enable_views', this.state.enableViews)
    })
  }

  toggleViews () {
    this.setState(
      { enableViews: !this.state.enableViews },
      () => this.props.channel.emit('responsive-addons/enable_views', this.state.enableViews)
    )
  }

  render () {
    return (
      <IconButton key="viewport-rotate" title="Enable responsive views" onClick={this.toggleViews} active={this.state.enableViews}>
        <Icons icon="switchalt" />
      </IconButton>
    )
  }
}
