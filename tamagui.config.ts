import { config as defaultConfig } from '@tamagui/config'
import { createTamagui } from 'tamagui'
import { themes } from '@tamagui/themes'

export const config = createTamagui({
  ...defaultConfig,
  themes,
})

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
