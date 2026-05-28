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

package usererror

import (
	"fmt"
	"maps"
	"net/http"
)

var (
	ErrInternal = NewCode(http.StatusInternalServerError, "internal_error", "Internal error occurred")

	ErrInvalidToken = NewCode(http.StatusUnauthorized, "invalid_token", "Invalid or missing token")

	ErrBadRequest = NewCode(http.StatusBadRequest, "bad_request", "Bad Request")

	ErrUnauthorized = NewCode(http.StatusUnauthorized, "unauthorized", "Unauthorized")

	ErrForbidden = NewCode(http.StatusForbidden, "forbidden", "Forbidden")

	ErrNotFound = NewCode(http.StatusNotFound, "not_found", "Not Found")

	ErrPreconditionFailed = NewCode(http.StatusPreconditionFailed, "precondition_failed", "Precondition failed")

	ErrNotMergeable = NewCode(http.StatusPreconditionFailed, "not_mergeable", "Branch can't be merged")

	ErrNoChange = NewCode(http.StatusBadRequest, "no_change", "No Change")

	ErrDuplicate = NewCode(http.StatusConflict, "duplicate", "Resource already exists")

	ErrPrimaryPathCantBeDeleted = NewCode(http.StatusBadRequest, "primary_path_cant_be_deleted", "The primary path of an object can't be deleted")

	ErrPathTooLong = NewCode(http.StatusBadRequest, "path_too_long", "The resource path is too long")

	ErrCyclicHierarchy = NewCode(http.StatusBadRequest, "cyclic_hierarchy",
		"Unable to perform the action as it would lead to a cyclic dependency")

	ErrSpaceWithChildsCantBeDeleted = NewCode(http.StatusBadRequest, "space_has_children",
		"Space can't be deleted as it still contains child resources")

	ErrDefaultBranchCantBeDeleted = NewCode(http.StatusBadRequest, "default_branch_cant_be_deleted", "The default branch of a repository can't be deleted")

	ErrPullReqRefsCantBeModified = NewCode(http.StatusBadRequest, "pullreq_refs_cant_be_modified", "The pull request git refs can't be modified")

	ErrRequestTooLarge = NewCode(http.StatusRequestEntityTooLarge, "request_too_large", "The request is too large")

	ErrWebhookNotRetriggerable = NewCode(http.StatusMethodNotAllowed, "webhook_not_retriggerable",
		"The webhook execution is incomplete and can't be retriggered")

	ErrCodeOwnersNotFound = NewCode(http.StatusNotFound, "codeowners_not_found", "CODEOWNERS file not found")

	ErrResponseNotFlushable = NewCode(http.StatusInternalServerError, "response_not_streamable", "Response not streamable")

	ErrResourceLocked = NewCode(
		http.StatusLocked, "resource_locked",
		"The requested resource is temporarily locked, please retry the operation.",
	)

	ErrEmptyRepoNeedsBranch = NewCode(http.StatusBadRequest, "empty_repo_needs_branch",
		"Pushing to an empty repository requires at least one branch with commits.")

	ErrGitLFSDisabled = NewCode(http.StatusBadRequest, "git_lfs_disabled", "Git LFS is disabled")

	ErrQuarantinedArtifact = NewCode(http.StatusForbidden, "artifact_quarantined", "Artifact is quarantined")

	ErrArtifactBlocked = NewCode(http.StatusForbidden, "artifact_blocked", "Artifact is blocked due to policy violations")
)

// Error represents a json-encoded API error.
type Error struct {
	Status          int            `json:"-"`
	Code            string         `json:"code,omitempty"`
	Message         string         `json:"message"`
	LocalizedMessage string        `json:"localized_message,omitempty"`
	Values          map[string]any `json:"values,omitempty"`
}

func (e *Error) Error() string {
	return e.Message
}

// New returns a new user facing error.
func New(status int, message string) *Error {
	return &Error{Status: status, Message: message}
}

// NewCode returns a new user facing error with a machine-readable code.
func NewCode(status int, code, message string) *Error {
	return &Error{Status: status, Code: code, Message: message}
}

// Newf returns a new user facing error.
func Newf(status int, format string, args ...any) *Error {
	return &Error{Status: status, Message: fmt.Sprintf(format, args...)}
}

// NewWithPayload returns a new user facing error with payload.
func NewWithPayload(status int, message string, valueMaps ...map[string]any) *Error {
	var values map[string]any
	for _, valueMap := range valueMaps {
		if values == nil {
			values = valueMap
			continue
		}
		maps.Copy(values, valueMap)
	}
	return &Error{Status: status, Message: message, Values: values}
}

// BadRequest returns a new user facing bad request error.
func BadRequest(message string) *Error {
	return New(http.StatusBadRequest, message)
}

// BadRequestf returns a new user facing bad request error.
func BadRequestf(format string, args ...any) *Error {
	return Newf(http.StatusBadRequest, format, args...)
}

// RequestTooLargef returns a new user facing request too large error.
func RequestTooLargef(format string, args ...any) *Error {
	return Newf(http.StatusRequestEntityTooLarge, format, args...)
}

// UnprocessableEntity returns a new user facing unprocessable entity error.
func UnprocessableEntity(message string) *Error {
	return New(http.StatusUnprocessableEntity, message)
}

// UnprocessableEntityf returns a new user facing unprocessable entity error.
func UnprocessableEntityf(format string, args ...any) *Error {
	return Newf(http.StatusUnprocessableEntity, format, args...)
}

// BadRequestWithPayload returns a new user facing bad request error with payload.
func BadRequestWithPayload(message string, values ...map[string]any) *Error {
	return NewWithPayload(http.StatusBadRequest, message, values...)
}

// Forbidden returns a new user facing forbidden error.
func Forbidden(message string) *Error {
	return New(http.StatusForbidden, message)
}

func MethodNotAllowed(message string) *Error {
	return New(http.StatusMethodNotAllowed, message)
}

// NotFound returns a new user facing not found error.
func NotFound(message string) *Error {
	return New(http.StatusNotFound, message)
}

// NotFoundf returns a new user facing not found error.
func NotFoundf(format string, args ...any) *Error {
	return Newf(http.StatusNotFound, format, args...)
}

// ConflictWithPayload returns a new user facing conflict error with payload.
func ConflictWithPayload(message string, values ...map[string]any) *Error {
	return NewWithPayload(http.StatusConflict, message, values...)
}

// Conflict returns a new user facing conflict error.
func Conflict(message string) *Error {
	return NewWithPayload(http.StatusConflict, message)
}
