# Install jdk8 on mac

- `$ brew tap homebrew/cask-versions`
- `$ brew update`
- `$ brew tap homebrew/cask`
- `$ brew tap adoptopenjdk/openjdk`
- `$ brew instal --cask adoptopenjdk8`
- Modify bash_profile:

```:bash
# Java env
export JAVA_8_HOME=$(/usr/libexec/java_home -v1.8)
alias java8='export JAVA_HOME=$JAVA_8_HOME'
# default to Java 8
java8
```

- References
  - [Installation tutorial guide](https://devqa.io/brew-install-java/)
  - "Cask adoptopenjdk8 exists in multiple taps" fix
    - rm /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask-versions/Casks/adoptopenjdk8.rb
