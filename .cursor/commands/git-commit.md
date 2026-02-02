# git-commit

Commit all staged and unstaged changes with the provided commit message.

## Usage
`/git-commit <message>`

## Instructions
When this command is invoked, extract the commit message from the user's input (everything after `/git-commit`). Then:

1. Stage all changes (both tracked and untracked files) using `git add -A`
2. Create a commit with the extracted message using `git commit -m "message"`
3. Display a confirmation message showing the commit was successful

If no message is provided after the command, ask the user to provide a commit message.

**Important**: Use the exact message provided by the user - do not modify or add to it unless the message is empty.