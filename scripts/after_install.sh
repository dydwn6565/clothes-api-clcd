#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/clothes-api-clcd/deploy.log

echo 'cd /home/ec2-user/clothes-api-clcd' >> /home/ec2-user/clothes-api-clcd/deploy.log
cd /home/ec2-user/clothes-api-clcd >> /home/ec2-user/clothes-api-clcd/deploy.log

echo 'npm install' >> /home/ec2-user/clothes-api-clcd/deploy.log 
npm install >> /home/ec2-user/clothes-api-clcd/deploy.log