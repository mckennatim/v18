# v18/iot 

The v18/iot stack is part of the core v18 stack which is responsive/multipane,  drops navigo and redux and adopts history and context as described in [the v18 README](../README.md) and [the responsive context README](../READMEresponsive_context.md) and [in the v17 README](../READMEv17.md)

@mckenna.tim/mqtt-hooks and @mckenna/react-zonetimer are now deprecated. The `/home/tim/www/react/v8/iot@mckennatim/src` is what will be used for the present v18 stack. I retorspect it was kind of crazy to take perfectly fine es6 code and transpile it down to a es5 lib which then gets transpiled again when it is included in the app. So now we just include the es6 source and transpile that with the app.

## wsclient log
### 2/27/23 16-128demo2-tmr_prg
TODO finish cmd to turn on relay for x seconds

now shows up

### 2/23/23 15-128demo2-mvp
Two way communication with device. Able to set relay onof and hi lo

TODO 
- setup timer and program to work
- expand initState.js to change the appid
### 2/7/23 14-wsclient_req-my_recd_sent
TODO lint

TODO show the current data in the app, send a cmd to change the state of the strike relay
SOFAR shows temp_out, publishes cmd not understood
### 2/2/2023 07-realign
This lines up tag nubers between home/tim/www/react/v18/iot and /fs/iot3 
wifi connects, mqtt connects, it get date time and the requests from app.

Uses the initialState from  fs/iot3/wsclient/conf/127doorStrike/doorStrike.js and the databasee entries from fs/iot3/wsclient/conf/127doorStrike/doorStrike.sql.

### 1/26/23 03-wsclient_mqtt-hooks_git.sh
Now uses [git.sh](https://github.com/mckennatim/gitinfo/wiki/gitonvscode#git.sh) to update github and keep the current working copy in the tags directory. 

### 1/24/23 02-wsclient
a multipane ws client using mqtt-hooks

### 1/24/23 01-qd-multipane_iot

The intent here is to use @mckennatim/mqtt-hooks and spin up a quick and dirty (qd) websockets mqtt client usend mqtt-hooks via `v18/iot/@ckenaatim/mqtt-hooks/src` testing the latest c++ coded esp devices. Stole the ls key from greenhouse so this mimics that old hooks2 app.

TODO: make your own key utility. or register utlity

