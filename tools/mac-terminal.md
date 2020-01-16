# Mac Terminal Commands & Tricks

## Port 8000 already in use
- Find: `lsof -i :3000`   
- Kill: `kill -9 <PID>`
- Or `pkill -If 'manage.py'`  


## Lock screen
- `command + Ctrl + Q`

## Mac show/hide hidden files/folders
- `Command + Shift + Dot`

## Open the current directory in a Finder Window from Terminal
- `open .`

## View All Available Terminal Commands using "ESC key"
- Open Terminal
- Hold down the “Escape” key for a second or two.
- You would see the prompt that says “Display all [1456] possibilities?” press the “Y” key.
- Scroll down to see your desired command.

## View All Available Terminal Commands using compgen
- Open terminal
- `compgen -ac`: To list all available commands.
- `compgen -b` to display only built-in commands.
- `compgen -ac | grep net` to search for "net" using `grep` utility.
- `compgen -k` to list all available “keywords.”. These keywords are commands that you can use when writing command line scripts for bash to execute.

## Java installed directory in Mac
- `brew install coreutils`
- `greadlink -f $(which java)`

### Terminal
### Jump to start of the line
- `Ctrl-a`

### Jump to next/previous word
- `Alt-<arrow-key>`

