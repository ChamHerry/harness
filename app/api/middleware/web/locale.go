package web

import (
	"net/http"

	"github.com/harness/gitness/app/api/request"
	"github.com/harness/gitness/i18n"

	"golang.org/x/text/language"
)

var (
	matcher language.Matcher
	tagStrs []string
)

func init() {
	supported := i18n.SupportedLocales()
	tags := make([]language.Tag, 0, len(supported)+1)
	tagStrs = make([]string, 0, len(supported)+1)
	tags = append(tags, language.English)
	tagStrs = append(tagStrs, "")
	for _, loc := range supported {
		if loc == "en" {
			continue
		}
		tag, err := language.Parse(loc)
		if err == nil {
			tags = append(tags, tag)
			tagStrs = append(tagStrs, loc)
		}
	}
	matcher = language.NewMatcher(tags)
}

func AcceptLanguage(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		locale := ""
		header := r.Header.Get("Accept-Language")
		if header != "" {
			tags, _, err := language.ParseAcceptLanguage(header)
			if err == nil && len(tags) > 0 {
				_, idx, _ := matcher.Match(tags...)
				locale = tagStrs[idx]
			}
		}
		ctx := request.WithLocale(r.Context(), locale)
		h.ServeHTTP(w, r.WithContext(ctx))
	})
}
