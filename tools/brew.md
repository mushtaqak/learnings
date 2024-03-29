# HomeBrew

## Introduction

[HomeBrew](https://brew.sh/) is the missing package manager for Mac. 

## Installation

- Run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Commands

- `brew install [package]`: Installs a brew package, e.g: `brew install redis`
- `brew install --cask [package]`: Install a cask application, e.g: `brew install --cask google-chrome`
- `brew upgrade`: To update/upgrade brew installed backages.
- `brew update`: To update brew itself.
- `brew list`: Lists all installed packages.
- `brew bundle`: Restore all packages from a file. (see [more](https://gist.github.com/ChristopherA/a579274536aab36ea9966f301ff14f3f))
  - `install`
    - `brew bundle install`: Install from `~/Brewfile`
    - `brew bundle install --file=~/.private/Brewfile`: Install from `~/.private/Brewfile`
    - `brew bundle install --file=rs-brew-dump`: Install from `./rs-brew-dump`
  - `dump`
    - `brew bundle dump`: Dumps to `~/Brewfile`
    - `brew bundle dump --file=~/.private/Brewfile`: Dumps to `~/.private/Brewfile`
    - `brew bundle dump --force`: Update existing brewfile
    - `brew bundle --force cleanup`: current system configuration to match your brewfile
- `brew services list`: Lists brew services.
- `brew services start [service]`: Starts a brew service, e.g: `brew services start redis`
- `brew services stop [service]`: Stops a brew service, e.g: `brew services stop redis`

## Backup & Restore

### Backup

- `brew tap Homebrew/bundle`
- `brew bundle dump`
- By default, the Brewfile will be located at `~/Brewfile`
- For more info, please see https://sa.ndeep.me/post/how-to-backup-and-restore-your-homebrew-packages

### Restore

- `brew bundle --file=~/Brewfile`
- By default, the Brewfile will be located at `~/Brewfile`
