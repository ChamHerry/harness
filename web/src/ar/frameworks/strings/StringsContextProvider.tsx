/*
 * Copyright 2024 Harness, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import languageLoader, { buildStrings } from './languageLoader'

import { StringsContext, StringsContextValue } from './StringsContext'
import type { StringsMap } from './StringsContext'

export interface StringsContextProviderProps extends Pick<StringsContextValue, 'getString'> {
  children: React.ReactNode
  initialStrings?: Record<string, any> // temp prop for backward compatibility
  locale?: string
}

export function StringsContextProvider(props: StringsContextProviderProps): React.ReactElement {
  const [strings, setStrings] = React.useState<Record<string, any>>({
    ...props.initialStrings,
    ...(languageLoader() as any)
  })

  React.useEffect(() => {
    let cancelled = false
    buildStrings(props.locale).then(loadedStrings => {
      if (!cancelled) {
        setStrings({
          ...props.initialStrings,
          ...loadedStrings
        })
      }
    })
    return () => {
      cancelled = true
    }
  }, [props.initialStrings, props.locale])

  return (
    <StringsContext.Provider
      value={{
        data: strings as StringsMap,
        getString: props.getString
      }}>
      {props.children}
    </StringsContext.Provider>
  )
}
