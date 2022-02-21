# New Macbook Setup

## Setup

- [Quick Mac Setup Guide](https://sourabhbajaj.com/mac-setup/)
- [11 Best Mac Apps](https://www.inputmag.com/guides/best-usb-cables-mechanical-keyboard)
- Install Xcode command line tools
  - `$ xcode-select --install`
- Install Homebrew
  - `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## Applications

- Chrome
  - `$ brew install --cask google-chrome`
  - Chrome Extensions

    - [Session Buddy](https://chrome.google.com/webstore/detail/session-buddy/edacconmaakjimmfgnblocblbcdcpbko/related?hl=en)
    - [The Great Suspender Original](https://chrome.google.com/webstore/detail/the-great-suspender-origi/ahmkjjgdligadogjedmnogbpbcpofeeo/related?hl=en)
    - [Toggl Time Tracker](https://chrome.google.com/webstore/detail/toggl-track-productivity/oejgccbfbmkkpaidnkphaiaecficdnfn)
    - [ZenMate VPN](https://chrome.google.com/webstore/detail/zenmate-free-vpn%E2%80%93best-vpn/fdcgdnkidjaadafnichfpabhfomcebme?hl=en)
- Firefox
  - `$ brew install --cask firefox`
- Antivirus (Kasperski) / any other antivirus
- Microsoft 365
  - Individual application like MS Word, MS Excel can also be installed separately
  - Install via App Store
- Zoom
  - `$ brew install --cask zoom`
- Slack
  - Install via App Store  
  - `$ brew install --cask slack`
- [MS Teams](https://www.microsoft.com/en-ww/microsoft-teams/download-app#desktopAppDownloadregion)
  - `$ brew install --cask microsoft-teams`
- [Whatsapp](https://www.whatsapp.com)
  - Install via App Store
  - `$ brew install --cask whatsapp`
- AppCleaner
  - `$ brew install --cask appcleaner`
- VLC
  - `$ brew install --cask vlc`
- The Unarchiver
  - Install via App Store
- Rectangle
  - `$ brew install --cask rectangle`
- Hand Mirror
  - Install via App Store
- [FDM (Free Download Manager)](https://www.freedownloadmanager.org/)
  - `$ brew install --cask free-download-manager`
- 4K Vidoe Downloader
  - `$ brew install --cask 4k-video-downloader`
   Guidance (Azan timings)
  - Install via App Store
- Android File Transfer
  - `brew install --cask android-file-transfer`
- Zapya
  - Install via App Store
- New File Menu Free
  - Install via App Store
- 1Password
  - Install via App Store
- Bandwidth+
  - Install via App Store
- Caffeine
  - `$ brew install --cask caffeine`
- [Memory Clean 2](https://fiplab.com/apps/memory-clean-for-mac) (free version)

## Dev Applications

- [VS Code](https://code.visualstudio.com)
  - `$ brew install --cask visual-studio-code`
  - Also install `Settings Sync` extension and turn it on.
  - Also run `Install code` command from the VS Code command pallete to get `code` command in the shell terminal.
- ITerm2
  - `$ brew install --cask iterm2`
- [Postman](https://www.postman.com/downloads/)
  - `$ brew install --cask postman`
- [postgres](https://postgresapp.com)
- [PG Admin 4](https://www.pgadmin.org/download/)
  - `$ brew install --cask pgadmin4`
- [Docker](https://desktop.docker.com/mac/stable/amd64/Docker.dmg)
- Red - UI for Redis
  - Install via Mac Store
- Redis
  - `$ brew install redis`
  - `$ brew services start redis`
- openconnect
  - `$ brew install openconnect`

## Dev Packages

- git
  - `$ brew install git`
  - `$ git --version`
  - If for some reason git version does not return latest git version, follow [Use brew's git](https://katopz.medium.com/how-to-upgrade-git-ff00ea12be18) to get this straight.
  - If even after this it doesn't work, restart your machine and hopefully it will work, it always do :P
- [bash autocompletion](https://sourabhbajaj.com/mac-setup/BashCompletion/)
  - `$ brew install bash-completion`
  - `$ brew install tmux`
- [Python & pyenv](./pyenv-python.md)
- [nvm, npm & yarn](./nvm-npm-yarn.md)
- [tmux](../../tools/tmux.md)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [java](./mac-jdk.md)

## Other Applications

- See if an application / package officially exist in App Store
- Otherwise try to install if some package can be installed via brew
- if not then download via official websites
- In last, browse and find on web, for example: [macappstore](http://macappstore.org/) contains a a very good collection of Mac Applications.

## Configurations

- [Git multiple accounts && SSH keys](https://medium.com/the-andela-way/a-practical-guide-to-managing-multiple-github-accounts-8e7970c8fd46)
- Turn Off Auto-Correction from System Preferences -> Keyboard -> Text -> Uncheck "Correct Spelling Automatically"

## Clear data tips

- Clear any personal files & folder
  - Remove all documents, downloads, desktop items and other personal files & folders.
- Remove / Uninstall applications via AppCleaner application
- Clean Chrome / Firefox / Safari
  - Clean all-time browsing history (with cookies) and passwords saved in each browser.
  - Uninstall browser.
  - For chrome, you might have to clean Library files as well, follow some good tutorial to clean Chrome on Mac.
- Remove your ssh keys
- Sign out from iCloud account / any other account in the applications
- Remove applications & signed accounts
- Remove dot files
  - This inludes anything that starts with dot, for example:
    - Shell & environment files: `.bashrc`, `.bash_profile`, `.zshrc`, `.zsh_history`, etc
    - Config files: `.npm`, `.npmrc`, `.yarnrc`, `.nvm`, `.pip`, `.pyenv`, `.gitconfig`, `.ssh`, etc
    - Others like `.python_history`, `.cache`, `.kube`, `.krew`, `.ansible`, `.vscode`, `.docker` etc
