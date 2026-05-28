import React from 'react'

import type { StringsMap } from './stringTypes'
import type { LangLocale } from './languageLoader'

export type StringKeys = keyof StringsMap

export type { StringsMap }

export interface StringsContextValue {
  data: StringsMap
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getString?(key: StringKeys, vars?: Record<string, any>): string
  locale?: LangLocale
  setLocale?(locale: LangLocale): void
}

export const StringsContext = React.createContext<StringsContextValue>({} as StringsContextValue)

export function useStringsContext(): StringsContextValue {
  return React.useContext(StringsContext)
}
