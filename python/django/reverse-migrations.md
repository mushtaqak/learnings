# Reverse Django migrations

### Reverse to previous migration 
1. You can revert by migrating to the previous migration.
2. For example, if your last two migrations are `0010_previous_migration` and `0011_migration_to_revert` then you would do:     
> `./manage.py migrate my_app 0010_previous_migration`
3. You can then manualy delete migration 0011_migration_to_revert file.

### Show migrations
1. If you're using Django 1.8+, you can show the names of all the migrations with     
> `./manage.py showmigrations my_app`

### Reverse all migrations
1. To reverse all migrations for an app, you can run:  
> `./manage.py migrate my_app zero`  
> `./manage.py lms migrate edxval 0005 --settings=devstack`  
