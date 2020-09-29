cd workers
cd cache
start yarn dev
cd ..
cd network
start yarn dev
cd ..
cd service
start yarn dev
cd ..
cd shared
cd encryption
yarn build
cd ..
cd client
start yarn dev
cd ..
cd dev
cd postMessageServer
yarn build
start node .