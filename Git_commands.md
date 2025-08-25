# 🧾 Git Commands Reference

A categorized list of Git commands with explanations.

---

## 1. Setup & Configuration

Configure Git on your machine.

```bash
git --version
```

```bash
git config --global user.name "Your Name"  # Set your name
```

```bash
git config --global user.email "you@example.com" # Set your email
```

```bash
git config --list                 # Show all Git configs
```

```bash
git config --global user.name ""  # Set your name
```

```bash
git config --global user.email "" # Set your email
```

```bash
git config --list                 # Show all Git configs
```

```bash
git help <command>                # Help for a specific command
```

## 2. Starting a Repository

```bash
git init # Initialize a new repository
```

```bash
git clone <url> # Clone a repository
```

```bash
git clone <url> <folder> # Clone into a specific folder
```

## 3. Basic Snapshotting

- Track changes to your project.

```bash
git status # Show file status
```

```bash
git add <file> # Stage a file
```

```bash
git add . # Stage all changes
```

```bash
git reset <file> # Unstage a file
```

```bash
git diff # Show unstaged changes
```

```bash
git diff --staged # Show staged changes
```

```bash
git commit -m "message" # Commit staged changes
```

```bash
git commit -am "message" # Add & commit in one step
```

## 4. Branching & Merging

```bash
git branch # List branches
```

```bash
git branch <name> # Create a branch
```

```bash
git checkout <branch> # Switch branch
```

```bash
git checkout -b <branch> # Create & switch branch
```

```bash
git merge <branch> # Merge branch into current
```

```bash
git branch -d <branch> # Delete a branch
```

```bash
git switch <branch> # Modern branch switch
```

```bash
git switch -c <branch> # Create & switch branch (modern)
```

## 5. Remote Repositories

- Work with GitHub, GitLab, etc.

```bash
git remote -v # Show remotes
```

```bash
git remote add origin <url> # Add a remote
```

```bash
git push -u origin <branch> # Push branch & set upstream
```

```bash
git push --delete <remote> <branch> # Delete a remote branch
```

```bash
git push # Push changes
```

```bash
git pull # Fetch & merge changes
```

```bash
git fetch # Download changes only
```

## 6. Undoing Changes

- Fix mistakes.

```bash
git restore <file> # Undo changes
```

```bash
git restore --staged <file> # Unstage file
```

```bash
git reset --hard HEAD # Reset to last commit (⚠️ destructive)
```

```bash
git revert <commit> # Undo commit with new commit
```

```bash
git checkout <commit> -- <file> # Restore file from commit
```

## 7. Inspection & History

- See what’s happening in your repo.

```bash
git log # Show commit history
```

```bash
git log --oneline # Compact history
```

```bash
git log --graph --oneline --all # Visualize history
```

```bash
git show <commit> # Show commit details
```

```bash
git blame <file> # Show who changed each line
```

## 8. Stashing

- Temporarily save changes.

```bash
git stash # Save changes
```

```bash
git stash list # List stashes
```

```bash
git stash apply # Apply last stash
```

```bash
git stash pop # Apply & drop stash
```

```bash
git stash drop # Delete a stash
```
