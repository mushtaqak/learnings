# New Macbook Setup

## Applications

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
- Caffeine
  - `$ brew install --cask caffeine`
- Guidance (Azan timings)
  
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

- Homebrew
  - `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- git
  - `$ brew install git`
  - `$ git --version`
  - If for some reason git version does not return latest git version, follow [Use brew's git](https://katopz.medium.com/how-to-upgrade-git-ff00ea12be18) to get this straight.
- [postgres](https://postgresapp.com)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
  - Minicube
    - `$ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64`
  - `$ brew install kubectl`
- [java](./mac-jdk.md)
- tmux
  - `$ brew install tmux`
- pyenv
- nvm

## Other Applications

- Try to install if some package can be installed via brew
- If not try if it officially exist in MacStore
- Otherwise download via official websites
- In last, browse and find on web, for example: [macappstore](http://macappstore.org/) contains a a very good collection of Mac Applications.

## Configurations

- [Git multiple accounts && SSH keys](https://medium.com/the-andela-way/a-practical-guide-to-managing-multiple-github-accounts-8e7970c8fd46)
