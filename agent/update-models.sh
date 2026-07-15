#!/usr/bin/env bash
# Runs the "update known models" task (agent/update-models.md) through a local
# coding-agent CLI (codex / claude / opencode), scoped to this repo.
#
# Usage:
#   agent/update-models.sh [--harness codex|claude|opencode]
#
# With no --harness, the first available CLI is picked in this priority order:
# claude, codex, opencode. Set AGENT_HARNESS instead of --harness if preferred.
#
# The invoked CLI is allowed to edit files, run npm scripts, and search the web,
# but nothing here ever commits or pushes — review the resulting diff yourself.
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
prompt_file="$script_dir/update-models.md"

harness="${AGENT_HARNESS:-}"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --harness)
      harness="$2"
      shift 2
      ;;
    --harness=*)
      harness="${1#--harness=}"
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$harness" ]]; then
  for candidate in claude codex opencode; do
    if command -v "$candidate" >/dev/null 2>&1; then
      harness="$candidate"
      break
    fi
  done
fi

if [[ -z "$harness" ]]; then
  echo "No supported harness found (looked for: claude, codex, opencode)." >&2
  echo "Install one of them, or pass --harness explicitly." >&2
  exit 1
fi

if ! command -v "$harness" >/dev/null 2>&1; then
  echo "Requested harness '$harness' is not on PATH." >&2
  exit 1
fi

prompt="$(cat "$prompt_file")"
echo "Running update-models task via '$harness' in $repo_root ..." >&2

case "$harness" in
  claude)
    claude -p "$prompt" \
      --add-dir "$repo_root" \
      --permission-mode acceptEdits \
      --allowedTools "Edit,Write,Read,Glob,Grep,WebSearch,WebFetch,Bash(npm run format),Bash(npm run build),Bash(npm test),Bash(npm run test)"
    ;;
  codex)
    codex exec \
      --skip-git-repo-check \
      -C "$repo_root" \
      -s workspace-write \
      -c sandbox_workspace_write.network_access=true \
      "$prompt"
    ;;
  opencode)
    (cd "$repo_root" && opencode run --auto "$prompt")
    ;;
  *)
    echo "Unsupported harness: $harness (expected codex, claude, or opencode)" >&2
    exit 1
    ;;
esac

echo "Done. Review the diff (git status / git diff), then run 'npm run format && npm run build && npm test' if the agent didn't already." >&2
