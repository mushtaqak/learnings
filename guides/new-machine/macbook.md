# New Macbook Setup

## Applications

- Install Homebrew
  - `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- Chrome / Firefox
  - `$ brew install --cask firefox`
  - `$ brew install --cask google-chrome`
- Antivirus (Kasperski)
- MS Office
- Zoom
  - `$ brew install --cask zoom`
- VLC
  - `$ brew install --cask vlc`
- [FDM (Free Download Manager)](https://www.freedownloadmanager.org/)
- [Memory Clean 2](https://fiplab.com/apps/memory-clean-for-mac) (free version)
- Caffeine
  - `$ brew install --cask caffeine`
- Guidance (Azan timings)
- Android File Transfer
  - `brew install --cask android-file-transfer`
  
## Dev Applications

- [VS Code](https://code.visualstudio.com)
  - Also install `Settings Sync` extension and turn it on.
  - Also run `Install code` command from the VS Code command pallete to get `code` command in the shell terminal.
- [Postman](https://www.postman.com/downloads/)
- [PG Admin 4](https://www.pgadmin.org/download/)
- [Docker](https://desktop.docker.com/mac/stable/amd64/Docker.dmg)

## Office applications

- [MS Teams](https://www.microsoft.com/en-ww/microsoft-teams/download-app#desktopAppDownloadregion)
- openconnect
  - `$ brew install openconnect`

## Packages

- git
  - `$ brew install git`
  - `$ git --version`
  - If for some reason git version does not return latest git version, follow [Use brew's git](https://katopz.medium.com/how-to-upgrade-git-ff00ea12be18) to get this straight.
  - If even after this it doesn't work, restart your machine and hopefully it will work, it always do :P
- [bash autocompletion](https://sourabhbajaj.com/mac-setup/BashCompletion/)
- [postgres](https://postgresapp.com)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [java](./mac-jdk.md)
- [tmux](../../tools/tmux.md)
  - `$ brew install tmux`
- [Python & pyenv](./pyenv-python.md)
- [nvm, npm & yarn](./nvm-npm-yarn.md)

## Other Applications

- Try to install if some package can be installed via brew
- If not try if it officially exist in MacStore
- Otherwise download via official websites
- In last, browse and find on web, for example: [macappstore](http://macappstore.org/) contains a a very good collection of Mac Applications.

## Configurations

- [Git multiple accounts && SSH keys](https://medium.com/the-andela-way/a-practical-guide-to-managing-multiple-github-accounts-8e7970c8fd46)
