import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Panel extends Component {
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
    active: PropTypes.bool,
  }

  static defaultProps = {
    channel: undefined,
    active: false,
  }

  constructor (props) {
    super(props)
    this.state = {
      enableViews: true,
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
    if (!this.props.active) return null

    return (
      <div style={{ padding: 10 }}>
        <input type='checkbox' checked={this.state.enableViews} onClick={this.toggleViews} />
        <label style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>
          {this.state.enableViews ? 'Disable responsive views 😥' : 'Enable responsive views 🙌'}
        </label>
      </div>
    )
  }
}
