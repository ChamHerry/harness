package i18n

import (
	"embed"
	"log"
	"sort"
	"strings"

	"gopkg.in/yaml.v3"
)

//go:embed locales/*.yaml
var localesFS embed.FS

var translations map[string]map[string]string

func init() {
	translations = make(map[string]map[string]string)
	entries, err := localesFS.ReadDir("locales")
	if err != nil {
		log.Printf("[i18n] failed to read locales directory: %v", err)
		return
	}
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".yaml") {
			continue
		}
		locale := strings.TrimSuffix(entry.Name(), ".yaml")
		data, err := localesFS.ReadFile("locales/" + entry.Name())
		if err != nil {
			log.Printf("[i18n] failed to read locale file %s: %v", entry.Name(), err)
			continue
		}
		messages := make(map[string]string)
		if err := yaml.Unmarshal(data, messages); err != nil {
			log.Printf("[i18n] failed to parse locale file %s: %v", entry.Name(), err)
			continue
		}
		translations[locale] = messages
	}
	if len(translations) == 0 {
		log.Printf("[i18n] warning: no translation files loaded")
	}
}

func T(locale, message string) string {
	if locale == "" || locale == "en" {
		return message
	}
	if msgs, ok := translations[locale]; ok {
		if translated, ok := msgs[message]; ok && translated != "" {
			return translated
		}
	}
	base := strings.SplitN(locale, "-", 2)[0]
	if base != locale {
		if msgs, ok := translations[base]; ok {
			if translated, ok := msgs[message]; ok && translated != "" {
				return translated
			}
		}
	}
	return message
}

func SupportedLocales() []string {
	locales := make([]string, 0, len(translations))
	for l := range translations {
		locales = append(locales, l)
	}
	sort.Strings(locales)
	return locales
}

func IsSupported(locale string) bool {
	if locale == "" || locale == "en" {
		return true
	}
	_, ok := translations[locale]
	if ok {
		return true
	}
	base := strings.SplitN(locale, "-", 2)[0]
	_, ok = translations[base]
	return ok
}
