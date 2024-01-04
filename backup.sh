#!/bin/bash

# Define variables
DATE=$(date +"%Y%m%d%H%M%S")
BACKUP_DIR="/root/code/backup"
MYSQL_CONTAINER="mysql"
MYSQL_USER="drupal"
MYSQL_PASSWORD="Maxx@1511##"
RETENTION_COUNT=7

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup MySQL database with username and password specified
docker exec $MYSQL_CONTAINER mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD --single-transaction --quick --lock-tables=false drupal > $BACKUP_DIR/mysql_backup_$DATE.sql

# Compress the MySQL dump
gzip $BACKUP_DIR/mysql_backup_$DATE.sql

echo "MySQL database backup completed successfully!"

# Remove older backups, keeping only the latest $RETENTION_COUNT backups
ls -t $BACKUP_DIR/mysql_backup_*.sql.gz | tail -n +$((RETENTION_COUNT+1)) | xargs -I {} rm {}

echo "Older backups deleted, retaining the latest $RETENTION_COUNT backups."
