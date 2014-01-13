#!/bin/bash

# install help http://www.cyberciti.biz/tips/linux-use-gmail-as-a-smarthost.html
# rpm help http://www.how2centos.com/installing-ssmtp-on-centos-5-6/

# script to send simple email update if external ip address changes

CURRENTIP=`wget -qO- http://icanhazip.com`
FILELOC="/home/.ipaddress.txt"

if [ -f "$FILELOC" ]
then
        IPADDRESS=`cat $FILELOC`


        if [  $IPADDRESS != $CURRENTIP ]
        then

                # email subject
                SUBJECT="[CHEESEMS] IP ADDRESS UPDATED"

                # email to
                EMAIL="luke.jones@doane.edu"

                # email msg
                EMAILMESSAGE="/tmp/emailmessage.txt"

                echo "NEW IP ADDRESS $IPADDRESS"  > $EMAILMESSAGE

                # send an email using /bin/mail
                /bin/mail -s "$SUBJECT" "$EMAIL" < $EMAILMESSAGE

                echo "$CURRENTIP" > $FILELOC
        fi
else
        echo "$CURRENTIP" > $FILELOC
fi