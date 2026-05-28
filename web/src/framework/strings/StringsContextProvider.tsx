import React from 'react'
import type { LangLocale } from './languageLoader'
import type { StringsMap } from './StringsContext'

import { StringsContext, StringsContextValue } from './StringsContext'

export interface StringsContextProviderProps extends Pick<StringsContextValue, 'getString'> {
  children: React.ReactNode
  initialStrings?: StringsMap
  locale?: LangLocale
  setLocale?: (locale: LangLocale) => void
}

export function StringsContextProvider(props: StringsContextProviderProps): React.ReactElement {
  return (
    <StringsContext.Provider
      value={{
        data: props.initialStrings ?? ({} as StringsMap),
        getString: props.getString,
        locale: props.locale,
        setLocale: props.setLocale
      }}>
      {props.children}
    </StringsContext.Provider>
  )
}
