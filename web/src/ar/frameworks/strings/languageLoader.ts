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

/* eslint-disable */
/**
 * This file is auto-generated. Please do not modify this file manually.
 * Use the command `yarn strings` to regenerate this file.
 */
import strings from '@ar/strings/strings.en.yaml'
import artifactDetails from '@ar/pages/artifact-details/strings/strings.en.yaml'
import artifactList from '@ar/pages/artifact-list/strings/strings.en.yaml'
import digestList from '@ar/pages/digest-list/strings/strings.en.yaml'
import repositoryDetails from '@ar/pages/repository-details/strings/strings.en.yaml'
import repositoryList from '@ar/pages/repository-list/strings/strings.en.yaml'
import upstreamProxyDetails from '@ar/pages/upstream-proxy-details/strings/strings.en.yaml'
import versionDetails from '@ar/pages/version-details/strings/strings.en.yaml'
import versionList from '@ar/pages/version-list/strings/strings.en.yaml'
import webhookList from '@ar/pages/webhook-list/strings/strings.en.yaml'
import webhookDetails from '@ar/pages/webhook-details/strings/strings.en.yaml'
import webhookExecutionList from '@ar/pages/webhook-execution-list/strings/strings.en.yaml'
import manageRegistries from '@ar/pages/manage-registries/strings/strings.en.yaml'
import labelsList from '@ar/pages/labels-list/strings/strings.en.yaml'
import dependencyFirewall from '@ar/pages/dependency-firewall/strings/strings.en.yaml'
import violationsList from '@ar/pages/violations-list/strings/strings.en.yaml'
import exemptionList from '@ar/pages/exemption-list/strings/strings.en.yaml'
import exemptionDetails from '@ar/pages/exemption-details/strings/strings.en.yaml'

export type ARLocale = 'en' | 'zh-CN' | 'es' | 'ja'

type StringResource = Record<string, any>
type StringModule = { default: StringResource }

const SUPPORTED_LOCALES: ARLocale[] = ['en', 'zh-CN', 'es', 'ja']

const namespaces = {
  artifactDetails,
  artifactList,
  manageRegistries,
  labelsList,
  digestList,
  repositoryDetails,
  repositoryList,
  upstreamProxyDetails,
  versionDetails,
  versionList,
  webhookList,
  webhookDetails,
  webhookExecutionList,
  dependencyFirewall,
  violationsList,
  exemptionList,
  exemptionDetails
}

const localizedLoaders: Partial<
  Record<keyof typeof namespaces | 'strings', Partial<Record<ARLocale, () => Promise<StringModule>>>>
> = {
  strings: {
    'zh-CN': () => import(/* webpackChunkName: "ar-i18n-zh-CN" */ '@ar/strings/strings.zh-CN.yaml'),
    es: () => import(/* webpackChunkName: "ar-i18n-es" */ '@ar/strings/strings.es.yaml'),
    ja: () => import(/* webpackChunkName: "ar-i18n-ja" */ '@ar/strings/strings.ja.yaml')
  },
  repositoryList: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-repository-list-zh-CN" */ '@ar/pages/repository-list/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-repository-list-es" */ '@ar/pages/repository-list/strings/strings.es.yaml'),
    ja: () =>
      import(/* webpackChunkName: "ar-i18n-repository-list-ja" */ '@ar/pages/repository-list/strings/strings.ja.yaml')
  },
  artifactList: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-artifact-list-zh-CN" */ '@ar/pages/artifact-list/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-artifact-list-es" */ '@ar/pages/artifact-list/strings/strings.es.yaml'),
    ja: () =>
      import(/* webpackChunkName: "ar-i18n-artifact-list-ja" */ '@ar/pages/artifact-list/strings/strings.ja.yaml')
  },
  digestList: {
    'zh-CN': () =>
      import(/* webpackChunkName: "ar-i18n-digest-list-zh-CN" */ '@ar/pages/digest-list/strings/strings.zh-CN.yaml'),
    es: () => import(/* webpackChunkName: "ar-i18n-digest-list-es" */ '@ar/pages/digest-list/strings/strings.es.yaml'),
    ja: () => import(/* webpackChunkName: "ar-i18n-digest-list-ja" */ '@ar/pages/digest-list/strings/strings.ja.yaml')
  },
  repositoryDetails: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-repository-details-zh-CN" */ '@ar/pages/repository-details/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(
        /* webpackChunkName: "ar-i18n-repository-details-es" */ '@ar/pages/repository-details/strings/strings.es.yaml'
      ),
    ja: () =>
      import(
        /* webpackChunkName: "ar-i18n-repository-details-ja" */ '@ar/pages/repository-details/strings/strings.ja.yaml'
      )
  },
  artifactDetails: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-artifact-details-zh-CN" */ '@ar/pages/artifact-details/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(
        /* webpackChunkName: "ar-i18n-artifact-details-es" */ '@ar/pages/artifact-details/strings/strings.es.yaml'
      ),
    ja: () =>
      import(/* webpackChunkName: "ar-i18n-artifact-details-ja" */ '@ar/pages/artifact-details/strings/strings.ja.yaml')
  },
  upstreamProxyDetails: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-upstream-proxy-details-zh-CN" */ '@ar/pages/upstream-proxy-details/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(
        /* webpackChunkName: "ar-i18n-upstream-proxy-details-es" */ '@ar/pages/upstream-proxy-details/strings/strings.es.yaml'
      ),
    ja: () =>
      import(
        /* webpackChunkName: "ar-i18n-upstream-proxy-details-ja" */ '@ar/pages/upstream-proxy-details/strings/strings.ja.yaml'
      )
  },
  versionDetails: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-version-details-zh-CN" */ '@ar/pages/version-details/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-version-details-es" */ '@ar/pages/version-details/strings/strings.es.yaml'),
    ja: () =>
      import(/* webpackChunkName: "ar-i18n-version-details-ja" */ '@ar/pages/version-details/strings/strings.ja.yaml')
  },
  versionList: {
    'zh-CN': () =>
      import(/* webpackChunkName: "ar-i18n-version-list-zh-CN" */ '@ar/pages/version-list/strings/strings.zh-CN.yaml'),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-version-list-es" */ '@ar/pages/version-list/strings/strings.es.yaml'),
    ja: () => import(/* webpackChunkName: "ar-i18n-version-list-ja" */ '@ar/pages/version-list/strings/strings.ja.yaml')
  },
  webhookList: {
    'zh-CN': () =>
      import(/* webpackChunkName: "ar-i18n-webhook-list-zh-CN" */ '@ar/pages/webhook-list/strings/strings.zh-CN.yaml'),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-webhook-list-es" */ '@ar/pages/webhook-list/strings/strings.es.yaml'),
    ja: () => import(/* webpackChunkName: "ar-i18n-webhook-list-ja" */ '@ar/pages/webhook-list/strings/strings.ja.yaml')
  },
  webhookDetails: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-webhook-details-zh-CN" */ '@ar/pages/webhook-details/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-webhook-details-es" */ '@ar/pages/webhook-details/strings/strings.es.yaml'),
    ja: () =>
      import(/* webpackChunkName: "ar-i18n-webhook-details-ja" */ '@ar/pages/webhook-details/strings/strings.ja.yaml')
  },
  webhookExecutionList: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-webhook-execution-list-zh-CN" */ '@ar/pages/webhook-execution-list/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(
        /* webpackChunkName: "ar-i18n-webhook-execution-list-es" */ '@ar/pages/webhook-execution-list/strings/strings.es.yaml'
      ),
    ja: () =>
      import(
        /* webpackChunkName: "ar-i18n-webhook-execution-list-ja" */ '@ar/pages/webhook-execution-list/strings/strings.ja.yaml'
      )
  },
  manageRegistries: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-manage-registries-zh-CN" */ '@ar/pages/manage-registries/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(
        /* webpackChunkName: "ar-i18n-manage-registries-es" */ '@ar/pages/manage-registries/strings/strings.es.yaml'
      ),
    ja: () =>
      import(
        /* webpackChunkName: "ar-i18n-manage-registries-ja" */ '@ar/pages/manage-registries/strings/strings.ja.yaml'
      )
  },
  labelsList: {
    'zh-CN': () =>
      import(/* webpackChunkName: "ar-i18n-labels-list-zh-CN" */ '@ar/pages/labels-list/strings/strings.zh-CN.yaml'),
    es: () => import(/* webpackChunkName: "ar-i18n-labels-list-es" */ '@ar/pages/labels-list/strings/strings.es.yaml'),
    ja: () => import(/* webpackChunkName: "ar-i18n-labels-list-ja" */ '@ar/pages/labels-list/strings/strings.ja.yaml')
  },
  dependencyFirewall: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-dependency-firewall-zh-CN" */ '@ar/pages/dependency-firewall/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(
        /* webpackChunkName: "ar-i18n-dependency-firewall-es" */ '@ar/pages/dependency-firewall/strings/strings.es.yaml'
      ),
    ja: () =>
      import(
        /* webpackChunkName: "ar-i18n-dependency-firewall-ja" */ '@ar/pages/dependency-firewall/strings/strings.ja.yaml'
      )
  },
  violationsList: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-violations-list-zh-CN" */ '@ar/pages/violations-list/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-violations-list-es" */ '@ar/pages/violations-list/strings/strings.es.yaml'),
    ja: () =>
      import(/* webpackChunkName: "ar-i18n-violations-list-ja" */ '@ar/pages/violations-list/strings/strings.ja.yaml')
  },
  exemptionList: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-exemption-list-zh-CN" */ '@ar/pages/exemption-list/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(/* webpackChunkName: "ar-i18n-exemption-list-es" */ '@ar/pages/exemption-list/strings/strings.es.yaml'),
    ja: () =>
      import(/* webpackChunkName: "ar-i18n-exemption-list-ja" */ '@ar/pages/exemption-list/strings/strings.ja.yaml')
  },
  exemptionDetails: {
    'zh-CN': () =>
      import(
        /* webpackChunkName: "ar-i18n-exemption-details-zh-CN" */ '@ar/pages/exemption-details/strings/strings.zh-CN.yaml'
      ),
    es: () =>
      import(
        /* webpackChunkName: "ar-i18n-exemption-details-es" */ '@ar/pages/exemption-details/strings/strings.es.yaml'
      ),
    ja: () =>
      import(
        /* webpackChunkName: "ar-i18n-exemption-details-ja" */ '@ar/pages/exemption-details/strings/strings.ja.yaml'
      )
  }
}

const cache = new Map<ARLocale, StringResource>()

function normalizeLocale(locale?: string): ARLocale {
  return SUPPORTED_LOCALES.includes(locale as ARLocale) ? (locale as ARLocale) : 'en'
}

function deepMerge(base: StringResource, override?: StringResource): StringResource {
  if (!override) return base
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

async function loadLocalized(
  key: keyof typeof namespaces | 'strings',
  locale: ARLocale,
  fallback: StringResource
): Promise<StringResource> {
  const loader = localizedLoaders[key]?.[locale]
  if (!loader || locale === 'en') return fallback
  try {
    const module = await loader()
    return deepMerge(fallback, module.default)
  } catch {
    return fallback
  }
}

export default function languageLoader() {
  return namespaces
}

export async function buildStrings(locale?: string): Promise<StringResource> {
  const resourceLocale = normalizeLocale(locale)
  const cached = cache.get(resourceLocale)
  if (cached) return cached

  const localizedStrings = await loadLocalized('strings', resourceLocale, strings)
  const namespaceEntries = await Promise.all(
    Object.entries(namespaces).map(async ([key, value]) => [
      key,
      await loadLocalized(key as keyof typeof namespaces, resourceLocale, value)
    ])
  )
  const result = {
    ...localizedStrings,
    ...Object.fromEntries(namespaceEntries)
  }
  cache.set(resourceLocale, result)
  return result
}
