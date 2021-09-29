# New Centos Setup

## Packages

*Note*: Use `yum` instead of `brew` or `apt-get`

- git
  - `$ yum install git`
  - `$ git --version`
  - If for some reason git version does not return latest git version, follow [Use brew's git](https://katopz.medium.com/how-to-upgrade-git-ff00ea12be18) to get this straight.
  - If even after this it doesn't work, restart your machine and hopefully it will work, it always do :P
- [bash autocompletion](https://sourabhbajaj.com/mac-setup/BashCompletion/)
- [postgres](https://postgresapp.com)
- [tmux](../../tools/tmux.md)
  - `$ brew install tmux`
- [Python & pyenv](./pyenv-python.md)
- [nvm, npm & yarn](./nvm-npm-yarn.md)
- [docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-centos-7)
- [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-centos-7)

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
