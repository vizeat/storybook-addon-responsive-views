import React from 'react'
import addons, { types } from '@storybook/addons'

import { Tool } from './Tool'

addons.register('responsive-addon', (api) => {
  addons.addPanel('responsive-addon/panel', {
    title: 'Responsive Views',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    // eslint-disable-next-line react/display-name
    render: () => <Tool channel={addons.getChannel()} api={api} />,
  })
})
