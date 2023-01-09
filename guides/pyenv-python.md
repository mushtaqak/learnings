# Install Python & PyEnv

## Prequisite

- `$ brew install openssl readline sqlite3 xz zlib`

## Install pyenv

- `$ brew install pyenv`
- `$ brew install pyenv-virtualenv`

## Install python

- `$ brew install pyenv`
- `$ pyenv install 3.9.5`
- `$ pyenv global 3.9.5`
- `$ pyenv global system`
- Modify `~/.bashrc`:

    ```:bash
    # pyenv - use pyenv python
    export PYENV_ROOT="$HOME/.pyenv"
    export PATH="$PYENV_ROOT/bin:$PATH"
    if command -v pyenv 1>/dev/null 2>&1; then
      eval "$(pyenv init --path)"
      eval "$(pyenv init -)"
      eval "$(pyenv virtualenv-init -)"
    fi
    ```

- Modify `~/.zshrc`:

  ```:bash
  if [ -f ~/.bashrc ]; then
      source ~/.bashrc
  fi
  ```

- Reference: [Use python3 instead of python2](https://opensource.com/article/19/5/python-3-default-mac)

## pyenv cpommands

### python version related commands

- Install a version of python: `pyenv install 3.9.5`
- Make a version of python global: `pyenv install 3.9.5`
- Make a version of python system-wide: `pyenv global system`
- List all python versions: `pyenv versions`

### virtualenv related commands

- Create a virtual env: `pyenv virtualenv test-env`
- Activate virtual env: `pyenv shell test-env` or  `pyenv activate test-env`
- Deactivate virtual env: `pyenv deactviate test-env`
- List of virtual env: `pyenv virtualenvs`
