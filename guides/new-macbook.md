# New Macbook Setup

## Applications

- Install Homebrew
  - `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- Chrome / Firefox
  - `$ brew install --cask firefox`
  - `$ brew install --cask google-chrome`
- Chrome Extensions

  - [Session Buddy](https://chrome.google.com/webstore/detail/session-buddy/edacconmaakjimmfgnblocblbcdcpbko/related?hl=en)
  - [The Great Suspender Original](https://chrome.google.com/webstore/detail/the-great-suspender-origi/ahmkjjgdligadogjedmnogbpbcpofeeo/related?hl=en)
  - [Toggl Time Tracker](https://chrome.google.com/webstore/detail/toggl-track-productivity/oejgccbfbmkkpaidnkphaiaecficdnfn)
  - [ZenMate VPN](https://chrome.google.com/webstore/detail/zenmate-free-vpn%E2%80%93best-vpn/fdcgdnkidjaadafnichfpabhfomcebme?hl=en)

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
  - Install via Mac Store
- Android File Transfer
  - `brew install --cask android-file-transfer`
- New File Menu
  - Install via Mac Store (not free anymore)
- [Whatsapp](https://www.whatsapp.com)

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
- Turn Off Auto-Correction from System Preferences -> Keyboard -> Text -> Uncheck "Correct Spelling Automatically"


## Clear data tips

- Clear any personal files & folder
  - Remove all documents, downloads, desktop items and other personal files & folders.
- Clean Chrome / Firefox / Safari
  - Clean all-time browsing history (with cookies) and passwords saved in each browser.
  - Uninstall browser.
  - For chrome, you might have to clean Library files as well, follow some good tutorial to clean Chrome on Mac.
- Remove dot files
  - This inludes anything that starts with dot, for example:
    - Shell & environment files: `.bashrc`, `.bash_profile`, `.zshrc`, `.zsh_history`, etc
    - Config files: `.npm`, `.npmrc`, `.yarnrc`, `.nvm`, `.pip`, `.pyenv`, `.gitconfig`, `.ssh`, etc
    - Others like `.python_history`, `.cache`, `.kube`, `.krew`, `.ansible`, `.vscode`, `.docker` etc
