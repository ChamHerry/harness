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

import cdeStringRecordsEN from 'cde-gitness/strings/strings.en.yaml'
import stringsRecordsEN from '../../i18n/strings.en.yaml'
import type { StringsMap } from './stringTypes'

export type LangLocale = 'en' | 'zh-CN' | 'es' | 'ja'

export const SUPPORTED_LOCALES: LangLocale[] = ['en', 'zh-CN', 'es', 'ja']

export const LOCALE_LABELS: Record<LangLocale, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  es: 'Español',
  ja: '日本語'
}

const RESOURCE_LOCALES: Record<string, string> = {
  en: 'en',
  'en-US': 'en',
  'en-IN': 'en',
  'en-GB': 'en',
  'en-UK': 'en',
  'zh-CN': 'zh-CN',
  'zh-Hans': 'zh-CN',
  'zh-Hans-CN': 'zh-CN',
  es: 'es',
  'es-ES': 'es',
  'es-MX': 'es',
  'es-AR': 'es',
  ja: 'ja',
  'ja-JP': 'ja'
}

function normalizeTag(tag: string): string {
  return tag.replace(/_/g, '-').toLowerCase()
}

function matchLocale(browserLang: string): string | null {
  const normalized = normalizeTag(browserLang)
  if (RESOURCE_LOCALES[normalized]) return RESOURCE_LOCALES[normalized]
  for (const [tag, resource] of Object.entries(RESOURCE_LOCALES)) {
    if (normalizeTag(tag) === normalized) return resource
  }
  const base = normalized.split('-')[0]
  if (base !== normalized) {
    for (const [tag, resource] of Object.entries(RESOURCE_LOCALES)) {
      if (normalizeTag(tag).split('-')[0] === base) return resource
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LanguageRecord = Record<string, Record<string, any>>

const STORAGE_KEY = 'gitness-locale'

export function getDefaultStrings(): LanguageRecord {
  return { stringsRecordsEN, cdeStringRecords: cdeStringRecordsEN }
}

export function detectBrowserLanguage(): LangLocale {
  try {
    const browserLang = navigator?.language || 'en'
    const matched = matchLocale(browserLang)
    if (matched && SUPPORTED_LOCALES.includes(matched as LangLocale)) {
      return matched as LangLocale
    }
  } catch {
    // SSR or non-browser environment
  }
  return 'en'
}

export function getStoredLocale(): LangLocale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED_LOCALES.includes(stored as LangLocale)) {
      return stored as LangLocale
    }
  } catch {
    // localStorage not available
  }
  return null
}

export function storeLocale(locale: LangLocale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // localStorage not available
  }
}

export function resolveLocale(langId?: LangLocale): LangLocale {
  if (langId && SUPPORTED_LOCALES.includes(langId)) {
    return langId
  }
  const stored = getStoredLocale()
  if (stored) {
    return stored
  }
  return detectBrowserLanguage()
}

function mapToResourceLocale(langId: LangLocale): string {
  return langId
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(base: any, override: any): any {
  if (typeof base !== 'object' || base === null) return override
  if (typeof override !== 'object' || override === null) return override
  const result = { ...base }
  for (const key of Object.keys(override)) {
    if (
      typeof result[key] === 'object' &&
      result[key] !== null &&
      typeof override[key] === 'object' &&
      override[key] !== null &&
      !Array.isArray(result[key]) &&
      !Array.isArray(override[key])
    ) {
      result[key] = deepMerge(result[key], override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}

const stringsCache: Map<string, StringsMap> = new Map()

function buildEnglishStrings(): StringsMap {
  return {
    ...stringsRecordsEN,
    cde: cdeStringRecordsEN
  } as unknown as StringsMap
}

export async function buildStrings(langId: LangLocale = 'en'): Promise<StringsMap> {
  const resourceLocale = mapToResourceLocale(langId)

  if (stringsCache.has(resourceLocale)) {
    return stringsCache.get(resourceLocale) as StringsMap
  }

  if (resourceLocale === 'en') {
    const enStrings = buildEnglishStrings()
    stringsCache.set('en', enStrings)
    return enStrings
  }

  try {
    const [mainModule, cdeModule] = await Promise.all([
      import(/* webpackChunkName: "i18n-[request]" */ `../../i18n/strings.${resourceLocale}.yaml`),
      import(
        /* webpackChunkName: "i18n-cde-[request]" */ `../../cde-gitness/strings/strings.${resourceLocale}.yaml`
      ).catch(() => ({ default: cdeStringRecordsEN }))
    ])

    const merged = {
      ...deepMerge(stringsRecordsEN, mainModule.default),
      cde: deepMerge(cdeStringRecordsEN, cdeModule.default)
    } as unknown as StringsMap

    stringsCache.set(resourceLocale, merged)
    return merged
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`Failed to load language resource for "${resourceLocale}", falling back to English.`)
    const enStrings = buildEnglishStrings()
    stringsCache.set(resourceLocale, enStrings)
    return enStrings
  }
}
