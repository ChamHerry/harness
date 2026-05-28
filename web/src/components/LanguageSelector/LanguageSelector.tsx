import React, { useMemo } from 'react'
import { useStringsContext } from 'framework/strings/StringsContext'
import type { LangLocale } from 'framework/strings/languageLoader'
import { LOCALE_LABELS, storeLocale } from 'framework/strings/languageLoader'

export interface LanguageSelectorProps {
  className?: string
}

const DISPLAY_LOCALES: LangLocale[] = ['en', 'zh-CN', 'es', 'ja']

export function LanguageSelector(props: LanguageSelectorProps): React.ReactElement {
  const { locale, setLocale } = useStringsContext()

  const items = useMemo(() => DISPLAY_LOCALES.map(l => ({ value: l, label: LOCALE_LABELS[l] })), [])

  const handleChange = (newLocale: LangLocale) => {
    storeLocale(newLocale)
    setLocale?.(newLocale)
  }

  return (
    <select
      className={props.className}
      value={locale || 'en'}
      onChange={event => handleChange(event.currentTarget.value as LangLocale)}
      style={{
        width: '100%',
        border: '1px solid var(--grey-200)',
        borderRadius: 4,
        color: 'var(--grey-700)',
        cursor: 'pointer',
        fontSize: 12,
        padding: '4px 6px'
      }}>
      {items.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
