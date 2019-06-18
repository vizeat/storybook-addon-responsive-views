import React from 'react'
import addons from '@storybook/addons'

import { Panel } from './Panel'

addons.register('responsive-addon', (api) => {
  addons.addPanel('responsive-addon/panel', {
    title: 'Responsive Views',
    // eslint-disable-next-line react/prop-types
    render: ({ active }) => <Panel channel={addons.getChannel()} api={api} active={active} />, // eslint-disable-line react/display-name
  })
})
