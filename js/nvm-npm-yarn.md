# Install nvm, npm & yarn

## Install NVM and NodeJS

Install nvm via Homebrew

`$ brew install nvm`

or `curl https://raw.githubusercontent.com/creationix/nvm/v0.38.2/install.sh | bash`

Create system directory for nvm

$ mkdir ~/.nvm

Add following line to your profile. (.profile or .zshrc or .zprofile)

```sh
# NVM
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Close and open your terminal again. Or Choose one from the following command once for reload your profile. (.profile or .zshrc or .zprofile)

Example

- `$ source ~/.profile`
- `$ source ~/.zshrc`
- `$ source ~/.zprofile`

Verify nvm is installed: `$ nvm --version`

## Install NodeJS

Check all avaliable version by this command

`$ nvm ls-remote`

Install NodeJS (Recommended to install LTS version. Current LTS is Dubnium)

`$ nvm install --lts='Dubnium'`

Check installed NodeJS in your machine.

`$ nvm ls`

Set global nodejs version to environment.

`$ nvm use default`

See more about nvm : https://github.com/creationix/nvm

## Install Yarn

Install yarn via Homebrew and remove node dependencies from Homebrew

`$ brew install yarn`

`$ brew uninstall node --ignore-dependencies`

Checkout node in environment $PATH

`$ which node`

It should be return => /User/<your's-user-name>/.nvm/versions/node/<latest-node-lts-version>/bin/node

Checkout brew doctor there should show message WARNING missing yarn dependencies

`$ brew doctor`

Create symbol link from nvm for Homebrew. Pick a choice which suitable for you.

a. This is for those who installed only one version via nvm

`$ ln -s ~/.nvm/versions/node/ /usr/local/Cellar/`

b. If you installed multiple node versions via nvm. You should create symbol link by current global version. Following this commands

`$ nvm current => v10.16.0 (Latest LTS: Dubnium)` (This should be Global node version)

`$ mkdir /usr/local/Cellar/node`

`$ ln -s ~/.nvm/versions/node/<latest-node-lts-version>/ /usr/local/Cellar/node`

Checkout brew doctor again. There shouldn't have WARNING message.

`$ brew doctor`

### Use a different version of npm

- `$ nvm ls`
- `$ nvm install lts/erbium`
  - Installs `lts/erbium (12.22.1)`
- `$ nvm use lts/erbium`
- or `$ nvm use 12.22.1`

### Make a version default

- `$ nvm alias default 12.22.1`
- `$ nvm alias default lts/erbium`

Referenced from [Install NVM, NodeJS, Yarn via Homebrew Gist](https://gist.github.com/nijicha/e5615548181676873118df79953cb709)
