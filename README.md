# storybook-addon-responsive-views
View your Storybook stories in a range of responsive viewports

When developing responsive applications, it's often the edges of breakpoints which cause the most issues. This Storybook addon lets you preview your components/stories at a variety of breakpoints, so that you can be sure that your webapp will look great no matter what screen size ✨

## Installation
Install the following npm module

```
yarn add storybook-addon-responsive-views
```


## Basic usage

`withResponsiveViews` is added as a decorator to your stories.

First, register the add on in `addons.js`. This gives you access to toggle the views on/off in the panel.

```js
import 'storybook-addon-responsive-views/register'
```

Then you can either add it globally to all stories, or to a story individually

```js
// Globally in .storybook/config.js
import { addDecorator } from '@storybook/react'
import { withResponsiveViews } from 'storybook-addon-responsive-views'

addDecorator(withResponsiveViews)
```

or

```js
// In a .story file
import { withResponsiveViews } from 'storybook-addon-responsive-views'

storiesOf('Component', module)
  .addDecorator(withResponsiveViews)
  .add(...)
```

## Breakpoint config

By default, there are two breakpoints set: tablet at 768px, and desktop at 1024px. For each breakpoint, `withResponsiveViews` will create a view at 1px below the breakpoint and the breakpoint itself, as well as a 320px minimum view.

To set your own breakpoints, pass an object to the `withResponsiveViews` decorator. This can be done both on the global or local level by passing in a breakpoints object. You can add as many breakpoints as you like, with any key name you want. The key name is used in the view title. An example:

```js
addDecorator(
  withResponsiveViews({
    mobile: 425,
    tablet: 750,
    desktop: 1000,
    large: 1200,  
  })
)
```

## Responsive views

Your responsive views will appear beneath your story component, so that you can see how it looks at various sizes. To toggle the views on/off, use the checkbox in the 'Responsive Views' panel

## Accessing document and window

Each responsive view is rendered within an iFrame. To access the `document` and `window` properties for each iFrame, you'll need to import context into your story, for example:

```js
import { useContext } from 'react'
import { ResponsiveViewContext } from 'storybook-addon-responsive-views'

const { document, window } = useContext(ResponsiveViewContext)
```
