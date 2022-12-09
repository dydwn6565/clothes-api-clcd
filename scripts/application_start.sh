
# sudo chmod -R 777 /home/ec2-user/express-app

# cd /home/ec2-user/express-app

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh"] && \. "$NVM_DIR/nvm.sh"
# [ -s "$NVM_DIR/bash_completion"] && \. "$NVM_DIR/bash_completion"

# npm install
# node index.js >app.out.log 2 > app.err.log < /dev/null &

#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/clothes-api-clcd/deploy.log

echo 'pm2 restart nodejs-express-app' >> /home/ec2-user/clothes-api-clcd/deploy.log
pm2 restart nodejs-express-app >> /home/ec2-user/clothes-api-clcd/deploy.log