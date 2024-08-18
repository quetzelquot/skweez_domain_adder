#!/bin/bash

# Set target IP

IP='192.168.170.11'

# Make password wordlists for emails and keywords:

/home/kali/go/bin/skweez http://$IP/project/ http://$IP/ -d 3 | grep -v '@' > passwords_from_site.txt

# Make list of emails from site:

/home/kali/go/bin/skweez http://$IP/project/ http://$IP/ -d 3 | grep '@' > emails_from_site.txt

# Get a list of users, add users to password list

awk -F@ '{print $1}' emails_from_site.txt | tee users_from_site.txt >> passwords_from_site.txt

# Get domains and add them to the passwords list

awk -F@ '{print $2}' emails_from_site.txt >> passwords_from_site.txt

# Get site names without TLD and add them to passwords list

awk -F@ '{print $2}' emails_from_site.txt | awk -F. '{print $1}' >> passwords_from_site.txt

# Remove any duplicates

awk '!seen[$0]++' passwords_from_site.txt > temp && mv temp passwords_from_site.txt
