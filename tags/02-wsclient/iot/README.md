# v18/iot 

## wsclient log
### 1/24/23 02-wsclient
a multipane ws client using mqtt-hooks 

`mqtt-hooks/src` and `react-zonetimer/src` in the v18/@mckennatim are used as the imports instead of the npm packages. This is because the existing versions have tons of vulnerabilities and don't even `npm install`

### 1/24/23 01-qd-multipane_iot

The intent here is to use @mckennatim/mqtt-hooks and spin up a quick and dirty (qd) websockets mqtt client for testing the latest c++ coded esp devices. Stole the ls key from greenhouse so this mimics that old hooks2 app.

TODO: make your own key utility. or register utlity

