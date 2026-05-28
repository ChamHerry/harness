/*
 * Copyright 2023 Harness, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { String, useStrings } from '../String'
import { StringsContext, useStringsContext } from '../StringsContext'

const value = {
  data: {
    a: { b: 'Test Value 1' },
    harness: 'Harness',
    test: '{{ $.a.b }} in template',
    test2: '{{ $.test }} again'
  }
}
describe('String tests', () => {
  test('renders strings with simple id', () => {
    const { container } = render(
      <StringsContext.Provider value={value as any}>
        <String stringID={'harness' as any} />
      </StringsContext.Provider>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          Harness
        </span>
      </div>
    `)
  })

  test('renders error when key not found', () => {
    const { container } = render(
      <StringsContext.Provider value={value as any}>
        <String stringID={'harnes' as any} />
      </StringsContext.Provider>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          No valid template with id "harnes" found in any namespace
        </span>
      </div>
    `)
  })

  test('renders strings with nested value', () => {
    const { container } = render(
      <StringsContext.Provider value={value as any}>
        <String stringID={'a.b' as any} />
      </StringsContext.Provider>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          Test Value 1
        </span>
      </div>
    `)
  })

  test('renders strings with self reference values', () => {
    const { container } = render(
      <StringsContext.Provider value={value as any}>
        <String stringID={'test' as any} />
      </StringsContext.Provider>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          Test Value 1 in template
        </span>
      </div>
    `)
  })

  test('self reference only works for one level', () => {
    const { container } = render(
      <StringsContext.Provider value={value as any}>
        <String stringID={'test2' as any} />
      </StringsContext.Provider>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          {{ $.a.b }} in template again
        </span>
      </div>
    `)
  })
})

describe('useString tests', () => {
  describe('getString', () => {
    test('works with simple id', () => {
      const wrapper = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => (
        <StringsContext.Provider value={value as any}>{children}</StringsContext.Provider>
      )
      const { result } = renderHook(() => useStrings(), { wrapper })

      expect(result.current.getString('harness' as any)).toMatchInlineSnapshot(`"Harness"`)
    })

    test('works with nested values', () => {
      const wrapper = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => (
        <StringsContext.Provider value={value as any}>{children}</StringsContext.Provider>
      )
      const { result } = renderHook(() => useStrings(), { wrapper })

      expect(result.current.getString('a.b' as any)).toMatchInlineSnapshot(`"Test Value 1"`)
    })

    test('works with self reference values', () => {
      const wrapper = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => (
        <StringsContext.Provider value={value as any}>{children}</StringsContext.Provider>
      )
      const { result } = renderHook(() => useStrings(), { wrapper })

      expect(result.current.getString('test' as any)).toMatchInlineSnapshot(`"Test Value 1 in template"`)
    })

    test('self reference works foor only one level', () => {
      const wrapper = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => (
        <StringsContext.Provider value={value as any}>{children}</StringsContext.Provider>
      )
      const { result } = renderHook(() => useStrings(), { wrapper })

      expect(result.current.getString('test2' as any)).toMatchInlineSnapshot(`"{{ $.a.b }} in template again"`)
    })

    test('throws when key not found', () => {
      const wrapper = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => (
        <StringsContext.Provider value={value as any}>{children}</StringsContext.Provider>
      )
      const { result } = renderHook(() => useStrings(), { wrapper })

      expect(() => result.current.getString('harnes' as any)).toThrowError(
        'No valid template with id "harnes" found in any namespace'
      )
    })
  })

  test('Works with custom getString', () => {
    const { container } = render(
      <StringsContext.Provider value={{ ...value, getString: (key: string) => key } as any}>
        <String stringID={'harness.foo.bar.baz' as any} />
      </StringsContext.Provider>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          harness.foo.bar.baz
        </span>
      </div>
    `)
  })
})

describe('StringsContext locale tests', () => {
  test('locale and setLocale are provided via context', () => {
    const setLocale = jest.fn()
    const wrapper = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => (
      <StringsContext.Provider value={{ ...value, locale: 'zh-CN', setLocale } as any}>
        {children}
      </StringsContext.Provider>
    )
    const { result } = renderHook(() => useStringsContext(), { wrapper })

    expect(result.current.locale).toBe('zh-CN')
    expect(result.current.setLocale).toBe(setLocale)
  })

  test('setLocale changes locale in context', () => {
    const TestComponent = () => {
      const { locale, setLocale } = useStringsContext()
      return (
        <>
          <span data-testid="locale">{locale}</span>
          <button onClick={() => setLocale?.('ja')} />
        </>
      )
    }

    let currentLocale = 'en'
    const setLocale = jest.fn((newLocale: string) => {
      currentLocale = newLocale
    })

    render(
      <StringsContext.Provider value={{ ...value, locale: currentLocale, setLocale } as any}>
        <TestComponent />
      </StringsContext.Provider>
    )

    expect(screen.getByTestId('locale').textContent).toBe('en')

    fireEvent.click(screen.getByRole('button'))
    expect(setLocale).toHaveBeenCalledWith('ja')
  })

  test('fallback to English when key is missing in non-English locale', () => {
    const enValue = {
      data: {
        hello: 'Hello',
        world: 'World'
      }
    }

    const wrapper = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => (
      <StringsContext.Provider value={enValue as any}>{children}</StringsContext.Provider>
    )
    const { result } = renderHook(() => useStrings(), { wrapper })

    expect(result.current.getString('hello' as any)).toBe('Hello')
  })
})
