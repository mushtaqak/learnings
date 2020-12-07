# tmux

## What is tmux?

- tmux: a terminal multiplexer.
- Within one terminal window you can open multiple windows and split-views (called “panes” in tmux lingo).
- Each pane will contain its own, independently running terminal instance. 
- This allows you to have multiple terminal commands and applications running visually next to each other without the need to open multiple terminal emulator windows.
- tmux keeps these windows and panes in a session.

## Features

- **Session handling**: Detaching from and attaching to sessions helps me with context switching and remote working.
- **Platform independence**: I can use tmux on my Macbook, my Linux notebook, Cloud servers, Raspberry Pis, BeagleBones, etc.
- **Customizable**: There are many ways I can customize the look and behavior of my tmux environment.
- **Street credibility**: You don’t want others to call you a lamer, do you? :P


## Installation

Fortunately installing tmux is pretty straightforward on most distributions 
a simple `sudo apt-get install tmux` (Ubuntu and derivatives) or `brew install tmux` (Mac) should be sufficient.

## Commands and shortcut keys

- `tmux`: Creates a new tmux session.
- `tmux new -s <session-name>`: Creates a new tmux session with `session-name`.
- `tmux ls`: List all tmux sessions.
- `tmux rename-session -t 0 <session-name>`: Renames session 0 to `session-name`.
- `tmux attach -t <session-name>`: Attach an existing tmux session.
- `tmux detach`: Detach the current tmux window.

## Ctrl - b

- `Ctrl-b <keyboard-key>`: `Ctrl-b` is the prefix, followed by a special command.
- You need to press `Ctrl-b` together then release and then press any command, ex: `Ctrl-b %`

### Ctrl-b Commands 

- `Ctrl-b %`: Split the window vertically, creating a new vertical pane.
- `Ctrl-b "`: Split the window horizentally, creating a new horizental pane. 
- `Ctrl-b <arrow-key>`: Navigate to particular pane using arrow keys.
- `Ctrl-b c`: Creates a new window in the current tmux session.
- `Ctrl-b n`: Navigate to next window in current tmux session.
- `Ctrl-b p`: Navigate to previous window in current tmux session.
- `Ctrl-b <any-number>`: Navigate to the window numbered `any-number` in current tmux session.
- `Ctrl-b [`: To use scrollbar - move upward in the terminal.
- `Ctrl-b z`: Fullscreen a pane.
- `Ctrl-b C-<arrow-key>`: Resize pane in direction of `arrow-key`.
- `Ctrl-b ,`: Renames current session.
- `Ctrl-b d`: Detach the current tmux window.
  
## Other commands
- Type `exit` in any pane to close the pane.
- `[COMMAND + d]`: Split horizental [Mac].
- `[COMMAND + shift + d]`: Close split horizental [Mac].
  

## Customization

- `tmux source <path-to-config-file>`: Configure tmux with a config file. Eg. `tmux source ~/.tmux.com`.
- A [sample config](https://gist.github.com/saleem-latif/3d819db15ce929da05082c4ba1f199f2) file by [saleem-latif](http://www.github.com/saleem-latif).


## Reference and more help

- More on tmux: https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/
- More on customization: https://www.hamvocke.com/blog/a-guide-to-customizing-your-tmux-conf/
- **tmux cheetsheet**: https://gist.github.com/michaellihs/b6d46fa460fa5e429ea7ee5ff8794b96

