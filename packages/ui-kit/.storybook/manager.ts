import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'
import brandImage from './logo.png'

const theme = create({
  base: 'dark',
  brandTitle: 'StoryStore.SDK',
  brandImage,
})

addons.setConfig({
  theme,
})
