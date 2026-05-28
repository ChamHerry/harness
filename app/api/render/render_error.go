// Copyright 2023 Harness, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package render

import (
	"context"
	"net/http"

	"github.com/harness/gitness/app/api/request"
	"github.com/harness/gitness/app/api/usererror"
	"github.com/harness/gitness/i18n"

	"github.com/rs/zerolog/log"
)

func TranslatedUserError(ctx context.Context, w http.ResponseWriter, err error) {
	UserError(ctx, w, usererror.Translate(ctx, err))
}

func NotFound(ctx context.Context, w http.ResponseWriter) {
	UserError(ctx, w, usererror.ErrNotFound)
}

func Unauthorized(ctx context.Context, w http.ResponseWriter) {
	UserError(ctx, w, usererror.ErrUnauthorized)
}

func Forbidden(ctx context.Context, w http.ResponseWriter) {
	UserError(ctx, w, usererror.ErrForbidden)
}

func Forbiddenf(ctx context.Context, w http.ResponseWriter, format string, args ...any) {
	UserError(ctx, w, usererror.Newf(http.StatusForbidden, format, args...))
}

func BadRequest(ctx context.Context, w http.ResponseWriter) {
	UserError(ctx, w, usererror.ErrBadRequest)
}

func BadRequestf(ctx context.Context, w http.ResponseWriter, format string, args ...any) {
	UserError(ctx, w, usererror.Newf(http.StatusBadRequest, format, args...))
}

func InternalError(ctx context.Context, w http.ResponseWriter) {
	UserError(ctx, w, usererror.ErrInternal)
}

func InternalErrorf(ctx context.Context, w http.ResponseWriter, format string, args ...any) {
	UserError(ctx, w, usererror.Newf(http.StatusInternalServerError, format, args...))
}

func UserError(ctx context.Context, w http.ResponseWriter, err *usererror.Error) {
	log.Ctx(ctx).Debug().Err(err).Msgf("operation resulted in user facing error")

	locale := request.LocaleFrom(ctx)
	translatedMsg := i18n.T(locale, err.Message)

	response := &usererror.Error{
		Status:           err.Status,
		Code:             err.Code,
		Message:          err.Message,
		LocalizedMessage: translatedMsg,
		Values:           err.Values,
	}
	if translatedMsg == err.Message {
		response.LocalizedMessage = ""
	}

	JSON(w, err.Status, response)
}
