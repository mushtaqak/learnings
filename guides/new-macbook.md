# New Macbook Setup

## Setup

- First update your mac machine
- [Quick Mac Setup Guide](https://sourabhbajaj.com/mac-setup/)
- [11 Best Mac Apps](https://www.inputmag.com/guides/best-free-mac-apps-not-google-chrome-slack)
- Install Xcode command line tools
  - `$ xcode-select --install`
- Install Homebrew
  - `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- [bash autocompletion](https://sourabhbajaj.com/mac-setup/BashCompletion/)
  - `$ brew install bash-completion`

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
- [Bitdefender Virus Scanner](https://apps.apple.com/pk/app/bitdefender-virus-scanner/id500154009?mt=12)
  - Install via App Store
  - Only scans on user action
- Microsoft 365
  - Install via App Store
  - Individual application like `MS Word`, `MS Excel` can also be installed separately.
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
  - Removes all related files for an application
- VLC
  - `$ brew install --cask vlc`
  - Play multiple video / audio formats
- The Unarchiver
  - Install via App Store
  - Un-compress zip / archived files
- Rectangle
  - `$ brew install --cask rectangle`
  - Manage screen space in an organized way
- Hand Mirror
  - Install via App Store
  - Preview face just before a meeting
- [FDM (Free Download Manager)](https://www.freedownloadmanager.org/)
  - `$ brew install --cask free-download-manager`
  - Dowload files from anywhere
  - Chrome / Safari extention available
- 4K Vidoe Downloader
  - `$ brew install --cask 4k-video-downloader`
  - Download youtube videos
- Guidance
  - Install via App Store
  - Azan timings and notification
- Android File Transfer
  - `$ brew install --cask android-file-transfer`
  - Transfer files to android phones via cable
- Zapya
  - Install via App Store
  - Transfer large files from devices (Android/iPhone to Mac)
- New File Menu Free
  - Install via App Store
  - Add a "Create new file menue"
- Bandwidth+
  - Install via App Store
  - Network usage monitor
- Caffeine
  - `$ brew install --cask caffeine`
  - Manages Mac sleep process
  - Amphetamine is a good alternate
- [Memory Clean 2](https://fiplab.com/apps/memory-clean-for-mac) (free version)
  - Cleans memory and informs about memory hogs
- Jumpcut
  - `$ brew install --cask jumpcut`
  - Clipboard manager for Mac
- HandBrake
  - `$ brew install --cask handbrake`
  - Used for video transcoding
- [Screen Recording Lite](https://apps.apple.com/pk/app/screen-record-hd-screen-lite/id983477043?mt=12)
- NordVPN
  - Install via App Store
  - Paid VPN
- Typinst
  - Install via App Store

## Dev Applications

- [VS Code](https://code.visualstudio.com)
  - `$ brew install --cask visual-studio-code`
  - Also install `Settings Sync` extension and turn it on.
  - Also run `Install code` command from the VS Code command pallete to get `code` command in the shell terminal.
- [postgres](https://postgresapp.com)
- [PG Admin 4](https://www.pgadmin.org/download/)
  - `$ brew install --cask pgadmin4`
  - Postgres client
- Redis
  - `$ brew install redis`
  - `$ brew services start redis`
- Red - UI for Redis
  - Install via Mac Store
  - UI client for redis
- [Postman](https://www.postman.com/downloads/)
  - `$ brew install --cask postman`
  - Send different type of requests
- [Docker](https://desktop.docker.com/mac/stable/amd64/Docker.dmg)
- openconnect
  - `$ brew install openconnect`
  - Connect to a vpn channel
- ITerm2
  - `$ brew install --cask iterm2`
  - Super terminal for Mac
- tmux
  - `$ brew install tmux`
  - Terminal multiplexer

## Dev Packages

- git
  - `$ brew install git`
  - `$ git --version`
  - If for some reason git version does not return latest git version, follow [Use brew's git](https://katopz.medium.com/how-to-upgrade-git-ff00ea12be18) to get this straight.
  - If even after this it doesn't work, restart your machine and hopefully it will work, it always do :P
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
