### User settings vs workspace settings
1. User settings are vscode-wide settings applied to each project (`/Users/mushtaqali/Library/Application Support/Code/User/settings.json`).
2. Each project can override some settings using workspace settings (`.vscode/settings.json`)   

### Open terminal
1. ctrl + ` or ^ + `

### Create a new terminal
1. ctrl + shift + ` or ctrl + ~

### Actiate virtualenv and open shell
1. Select an interpreter using command + P then `>`
2. Then open terminal.

### Put all virtualenv in `~/.envs` directory so that they can be picked by vscode.
1. Set `venvPath` in user settings.
`"python.venvPath": "~/.envs"`

### Python path for each project under `.vscode/settings.json` file.
1. Once you have selected an interpretor it means the following:
```javascript
{
    "python.pythonPath": "/Users/mushtaqali/.envs/edx_enterprise_env/bin/python"
}
```

### For any virtalenv not picked in `Select Interpretor` Command, we can add through `pythonPath` in workspace settings.   
1. For example pipenv's dynamic virtualenv.
```javascript
{
    "python.pythonPath": "/Users/mushtaqali/.local/share/virtualenvs/app-nfj3kebl/bin/python3"
}
```
