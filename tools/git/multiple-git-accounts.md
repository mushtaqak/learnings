# Multiple Git Accounts

## Steps

### Generate ssh keys

```:bash
$ cd ~/.ssh
$ ssh-keygen -t rsa -b 4096 -C "your_personal_email@domain.com"
  # save as id_rsa_personal
$ ssh-keygen -t rsa -b 4096 -C "your_work1_email@domain.com"
  # save as id_rsa_work1
$ ssh-keygen -t rsa -b 4096 -C "your_work2_email@domain.com"
  # save as id_rsa_work12
```

This will create:

```:bash
id_rsa_personal
id_rsa_personal.pub
id_rsa_work1
id_rsa_work1.pub
id_rsa_work2
id_rsa_work2.pub
```

### Add SSH keys to GitHub/ BitBukcet account

- copy: `pbcopy < ~/.ssh/id_rsa_personal.pub` (copy work1/work2 keys in the same way)
- Add to your account(s)

### Create configuration files to manage keys

- Navigate to `.ssh` folder: `$ cd ~/.ssh`
- Create a new .config `$ touch config` and add following content:

```:bash
Host *
UseKeychain yes

# Personal account - default config
Host github.com-personal
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_personal
# Work1 account
Host github.com-work1
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_work1
# Work2 account
Host github.com-work2
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_work2
```

### Update global .gitconfig

- Navigate to global .gitconfig file `$ nano ~/.gitconfig` and update following content:

```:bash
[user]
    name = John Doe
    email = johndoe@domain.com
[includeIf "gitdir:~/work/"]
    path = ~/work/.gitconfig
[includeIf "gitdir:~/work2/"]
    path = ~/work2/.gitconfig
```

### Create multiple gitconfig files

- Create the work1 specific git config `$ nano ~/work1/.gitconfig` and add following content:

```:bash
[user]
    email = john.doe@company.com
```

- Do the same for `work2` directory.

### Save key identities in local machine

- `cd ~`
- Remove any previously-stored key identities: `ssh-add -D`
- Add personal key: `$ ssh-add id_rsa_personal`
- Add work1 key: `$ ssh-add id_rsa_work1`
- Add work2 key: `$ ssh-add id_rsa_work2`
- Check if the keys were saved correctly `$ ssh-add -l`
- Authenticate:

```:bash
$ ssh -T github.com-personal
  # Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
$ ssh -T github.com-work1
  # Hi USERNAME! You've successfully authenticated, but GitHub does   not provide shell access.
$ ssh -T github.com-work2
  # Hi USERNAME! You've successfully authenticated, but GitHub does   not provide shell access.
```

### Persist ssh keys

By default, ssh keys will not be persisted. You might be asked to add ssh key after every reboot.   
To persist ssh key, add this to `~/.ssh/config`:

```:bash
# Use keychain
# this is needed for ssh keys to be persistent: https://superuser.com/questions/88470/how-to-use-mac-os-x-keychain-with-ssh-keys
Host *
UseKeychain yes
```

## Reference

- [Git multiple accounts && SSH keys](https://medium.com/the-andela-way/a-practical-guide-to-managing-multiple-github-accounts-8e7970c8fd46)
