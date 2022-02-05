# PipEnv Introduction

Pipenv is a tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world.

It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your `Pipfile` as you install/uninstall packages. It also generates the ever-important `Pipfile.lock`, which is used to produce deterministic builds.

## Problems pipenv solves

1. You no longer need to use pip and virtualenv separately.
2. Managing a [requirements.txt file can be problematic](https://www.kennethreitz.org/essays/a-better-pip-workflow), so pipenv uses `Pipfile` and `Pipfile.lock`.

## Installation

- `$ brew install pipenv`

## Pipenv Features

1. Enables truly deterministic builds, while easily specifying only what you want.
2. Generates and checks file hashes for locked dependencies.
3. Automatically install required Pythons, if pyenv is available.
4. Automatically finds your project home, recursively, by looking for a Pipfile.
5. Automatically generates a Pipfile, if one doesn’t exist.
6. Automatically creates a virtualenv in a standard location.
7. Automatically adds/removes packages to a Pipfile when they are un/installed.
8. Automatically loads .env files, if they exist.
9. The main commands are install, uninstall, and lock, which generates a Pipfile.lock. These are intended to replace `$ pip install` usage, as well as manual virtualenv management (to activate a virtualenv, run `$ pipenv shell`).

## Basic Concepts

1. A virtualenv will automatically be created, when one doesn’t exist.
When no parameters are passed to install, all packages [packages] specified will be installed.
2. To initialize a Python 3 virtual environment, run `$ pipenv --three`.
3. To initialize a Python 2 virtual environment, run `$ pipenv --two`.
Otherwise, whatever virtualenv defaults to will be the default.

## Other Commands

1. `pipenv install` will install all packages mentioned in `Pipfile`.
2. `pipenv install numpy` will install numpy package.
3. `pipenv install --ignore-pipfile` will ignore `Pipfile` file but will install packages from `Pipfile.lock` file.
4. `pipenv install --dev` installs dev dependencies
5. `pipenv lock` creates `Pipfile.lock` file.
6. `shell` will spawn a shell with the virtualenv activated. This shell can be deactivated by using exit.
7. `graph` will show you a dependency graph of your installed dependencies. 
8. `run` will run a given command from the virtualenv, with any arguments forwarded (e.g. `$ pipenv run python` or `$ pipenv run pip freeze`).
9. `check` checks for security vulnerabilities and asserts that PEP 508 requirements are being met by the current environment.

[More info on pipenv](https://docs.pipenv.org/en/latest/)
