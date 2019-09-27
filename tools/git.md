# GIT commands / Issues

### Rebasing  
git rebase with master branch  
> git checkout <yourbranch>  
> git rebase -i master  

rebase abort  
> git rebase —abort  

rebase continue  
> git rebase —continue  

git rebase with itself  
> git rebase HEAD~2 -i (last 2 commits on head; `-i` means interactive)   

### New Remote branch  
> git checkout --track -b origin/mushtaq/abc-branch  
> git checkout -b LocalName origin/mushtaq/abc-branch  

### Revert a commit  
> git revert <commit-id>  

### Delete tag  
> git tag -d release  

### Onstage all changes from commits  
> git reset --soft HEAD^  

### Stash  
NEW: Save with name  
> git stash save "<stash name>"  
> git stash apply stash@{0}  

### Stash current changes  
> git stash  

### Apply latest stash ( this pops stash)  
> git stash apply  

### Show all stashes  
> git stash show  

### Rename/capitalizee a file  
> git mv -f MAKEFILE Makefile  

### Clean fd  
> git clean -fd  

### Reset version history   
- Remove all the version history from the local Git repository  
- http://stackoverflow.com/questions/9683279/make-the-current-commit-the-only-initial-commit-in-a-git-repository  

1. Save your .gitignore file, so that you can add ignore list later for ease.  
2. Remove all history  
> rm -rf .git  
3. Reconstruct the Git repo with only the current content 
> git init  
> git add .    
> git commit -m "Initial commit"  
4. Push to GitHub.  
> git remote add origin <github-uri>  
> git push -u --force origin master  

### Git Reflog  
- The easiest way would be to find the head commit of the branch as it was immediately before the rebase started in the reflog... and to reset the current branch to it (with the usual caveats about being absolutely sure before reseting with the --hard option).  
- Suppose the old commit was `HEAD@{5}` in the ref log  
- > git reset --hard HEAD@{5}  

### Update file permissions (esp. script files)   
> `git update-index --chmod=+x release.sh`

### Patch from a remote repo
1. Create a patch file. On remote repo: `git diff > my-latest-diff.patch`

2. Download the patched file. On local machine root project directory: `scp mushtaqak@example.com:path-to-patch-file/my-latest-diff.patch my-latest-diff.patch`
3. Apply the patch now. On local machine root project directory: `git apply my-latest-diff.patch`

### Add 2 git accounts on local machine
https://medium.com/the-andela-way/a-practical-guide-to-managing-multiple-github-accounts-8e7970c8fd46

