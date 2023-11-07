# Shell Alias

## Git Aliases

alias gfpull='git fetch && git pull origin' # eg. gfpull master
alias gfpullm='git fetch && git pull origin master' # eg. gfpullm
alias gpush='git push origin' # eg. gpush master
alias grebase='git rebase -i' # eg. grebase
alias grebasem='git rebase -i master' # eg. grebasem
alias glog='git log' # eg. glog
alias gdiff='git diff' # eg. glog
alias gdiffm='git diff master' # eg. gdiffm
alias gcheckout='git checkout'  # eg. gcheckout foo
alias gcheckoutm='git checkout master'  # eg. gcheckoutm
alias gbranch='git branch' # eg. gbranch
alias gbranchc='git checkout -b'    # gbranchc new-branch

## Brew

alias brewup='brew update && brew outdated && brew upgrade && brew bundle dump --file=~/Library/Mobile\ Documents/com~apple~CloudDocs/Brewfile'

## dev tools

alias django-server='python manage.py runserver'
alias docker=podman
alias dockerd='docker-compose down'
