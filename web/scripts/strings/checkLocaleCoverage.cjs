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

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const LOCALES = ['zh-CN', 'es', 'ja']
const ROOT = path.resolve(__dirname, '..', '..')

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(filePath, files)
    } else if (entry.name === 'strings.en.yaml') {
      files.push(filePath)
    }
  }
  return files
}

function readYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8')) || {}
}

function flatten(node, prefix = '', output = {}) {
  if (node && typeof node === 'object' && !Array.isArray(node)) {
    for (const [key, value] of Object.entries(node)) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key
      flatten(value, nextPrefix, output)
    }
  } else {
    output[prefix] = node
  }
  return output
}

function placeholders(value) {
  return Array.from(String(value || '').matchAll(/{{\s*([^}\s]+)\s*}}/g))
    .map(match => match[1])
    .sort()
}

function samePlaceholders(source, target) {
  return JSON.stringify(placeholders(source)) === JSON.stringify(placeholders(target))
}

function checkFamily(enFile) {
  const source = flatten(readYaml(enFile))
  const failures = []

  for (const locale of LOCALES) {
    const localeFile = enFile.replace(/strings\.en\.yaml$/, `strings.${locale}.yaml`)
    if (!fs.existsSync(localeFile)) {
      failures.push(`${path.relative(ROOT, localeFile)} is missing`)
      continue
    }

    const localized = flatten(readYaml(localeFile))
    const missing = Object.keys(source).filter(key => !(key in localized))
    if (missing.length) {
      failures.push(
        `${path.relative(ROOT, localeFile)} missing ${missing.length} keys: ${missing.slice(0, 10).join(', ')}`
      )
    }

    const placeholderMismatch = Object.keys(source).filter(
      key => key in localized && !samePlaceholders(source[key], localized[key])
    )
    if (placeholderMismatch.length) {
      failures.push(
        `${path.relative(ROOT, localeFile)} has placeholder mismatches: ${placeholderMismatch.slice(0, 10).join(', ')}`
      )
    }
  }

  return failures
}

const sourceFiles = [path.join(ROOT, 'src/cde-gitness/strings/strings.en.yaml'), ...walk(path.join(ROOT, 'src/ar'))]
const failures = sourceFiles.flatMap(checkFamily)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Locale coverage OK (${sourceFiles.length} string families, ${LOCALES.join(', ')})`)
}
