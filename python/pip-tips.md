# pip tips

## Remove `pyc` files

$ `find . -name \*.pyc -delete`

## pip install from local package

$ `pip install .`
$ `pip install -e ".[extras-key-name-separated-by-camma-if-any]"`

## pip install from a branch

$ `pip install git+https://github.com/[package-path].git@[branch-name]#egg=[package-name]`
