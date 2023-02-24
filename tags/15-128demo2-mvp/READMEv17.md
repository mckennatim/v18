## code-splitting lazy load
*https://medium.com/@abhayshiravanthe/modules-and-code-splitting-in-webpack-5-6ce0a58d7f36

## responsive routing
*https://www.digitalocean.com/community/tutorials/react-crud-context-hooks

*https://reactarmory.com/guides/context-free-react-router

Proof of concept is in `07ablank-resp-data-pag-grid` where `App`  sets the page and `Ctrl.changePage` runs `App.handle.Page=>setPage` which does the `history.push`. The other func in `App` that runs `setPage` is `window.onhashchange`

Should the whole thing be in context? Does any page besides `App` well beloow `Ctrl` need access the page change machinery?

Should touching somewhere on a page make it active in a multi-pane situation. Frome one page do you need to go to another, not by the nav menu?


## grid css
*https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/

*https://medium.com/samsung-internet-dev/common-responsive-layouts-with-css-grid-and-some-without-245a862f48df

*https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout

*https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout


## bootstrapping authorization
If you have an token, or can copy one in, use it. This app is bootstrapped to a timecards/RRCLLC/tim token.

## howto build an app

### check your credentials
Get some quick meta data  from the server at the startup of the app. render the opening page or direct user to sign in. Meanwhile wait for the table data displaying some blank. Same process for any route. Each route should make a call to back to control for auth.
### sharing data by props betweeen pages
Display an array of pages where only the one selected owns the route. Displaying multiple pages means that all are rendered and will re-render when the props change. a change in one page proagates back up to control where it gets rerendered to the other pages and sent to the server. The server comes back with data that modifies the pages props causing rerenders.
### fetches in services or right out of control? 
### how do route pages send data back to control?
throught a function you sent with a link 

## log
https://www.atlassian.com/git/tutorials/using-branches/git-checkout#:~:text=The%20git%20checkout%20command%20lets,new%20commits%20on%20that%20branch.

`git tag` lists all your tags

In order to go back and run at a previous tag `git checkout 4-abplank_hashroute_responsive-data`. You want to be all commited up before. oNCE YOU MOVE, You don't want to make any changes here since your head is detached. 

To continue developing, you need to get back to the “current” state of your project: 

if git status says 

    HEAD detached from 4-abplank_hashroute_responsive-data

then reattach with
 
    git checkout main

but now if you have doene anything like a commit while you were back at 4, going to main says `Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded. (use "git pull" to update your local branch)`

    git pull

If you want to create a new branch from a prior tag to retain commits you create, you may do so (now or later) by using -b with the checkout command again. Example:

    git checkout 3-ablank_context
    git checkout -b <new-branch-name>
    git branch //lists branches available

### 2/3/21 3-ablank_context
### 2/4/21 4-abplank_hashroute_responsive-data
In this iteration I dumped react-router opting using a `Ctrl` component that listens for `window.onhashchange` then sets the page based on that. That gets you <> navigation via your browser buttons. The other way to set a page is programatically from a nav bar or something.
### 2/5/21 5-ablank_hash_resp.data_grid
Navbar is on its own, Jobs, AddJob and Help are in the grid container
### 2/5/21 6-git-test
see git notes above
### 2/5/21 07ablank-acontext-onresize-onhashchange
moving functionality from App to context
### 2/5/21 08ablank-code-splitting
works in dev but not prod, but prod build is so tiny, 
### 2/8/21 09ablank-milestone-lazy-responsive
Combines most of the important elements needed for prototype app. This app is responsive to device size, loading only the components needed for that device. Every app needs a `multi` object to provide the arrangement of pages for whatever device sizes it specifies. The following shows 2 routes, `jobs` and `addjobs` with component arrays for from 1 to 3 panes for each route. ''However it breaks it only a single `help` page is specified or if a unexpected hash is in the url''

    const multi={
      jobs: [
          ['Jobs'],
          ['Jobs', 'Help'],
          ['Jobs', 'AddJob', 'Help']
      ],
      addjob:[
          ['AddJob'],
          ['AddJob', 'Jobs'],
          ['AddJob', 'Jobs', 'Help'],
      ],
      help:[
        ['Help]
      ]
    }

### 2/9/21 10ablank-milestone-lazy-responsive_v2
<s>It seems that React.lazy has to be in the file that uses it</s>

### 2/9/21 11ablank-milestone-lazy-responsive_v3-reorg
The changeable stuff for the app is in appRoutes. How do you use mutiple contexts? Add hel next?

### 2/12/21 s2g 
installed but now working, problem with soath local 7080

### 2/16/21

reorg of help

Help.jsx: just gets alljobs and indents answeres into help which gets displayed

HelpApp.js: changes help as needed. Toggle of answer/editing display. Also toggle edit/display for each question and answer. listen to text area. post on submit.

state: help, toggle array, 

### 2/19/21 13 deploy_tcard-connect_tcard-jobs_modify_spa1_signup

does not work
{"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g"}

{"email":"mckenna.tim@gmail.com","firstday":1,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJleHAiOjE2MTcyMTY4OTkwNjZ9.Du9l5Jni3a2t2v0h-gX8VhCCIBg0CPC3fmZ5oDpfbek"}

reroo
{"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoicmVyb28iLCJyb2xlIjoicGFydG5lciIsImFwcGlkIjoic2lnbnVwIiwiZW1haWxpZCI6Im1ja2VubmEudGltQGdtYWlsLmNvbSIsImV4cCI6MTYxNzIwOTAwNDE1NX0.SU9sfK8xSD5Ji4KlQEP0rL_wBi5JSdSiWcAFpwdkB2E"}


ln -s /home/tim/www/react/v17/tcard-jobs/dist/ /home/tim/www/spa1/timecards/jobs/v0/dist

ln -s /home/tim/www/react/v17/tcard-jobs/prod/ /home/tim/www/spa1/timecards/jobs/v0/prod

ln -s /home/tim/www/react/v17/tcard-connect/dist/ /home/tim/www/spa1/timecards/connect/v0/dist

ln -s /home/tim/www/react/v17/tcard-connect/prod/ /home/tim/www/spa1/timecards/connect/v0/prod

ln -s /home/tim/www/react/v17/tcard-signin/dist/ /home/tim/www/spa1/timecards/signin/v0/dist

ln -s /home/tim/www/react/v17/tcard-signin/prod/ /home/tim/www/spa1/timecards/signin/v0/prod

ln -s /home/tim/www/react/v17/tcard-connect/dist/ /home/tim/www/spa1/timecards/connect/v0/dist

signin
{"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ25pbiIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.lASfx3Cm3Nvm2xs3r-It2-LBSKZAxkygbP-VCnrmGS4"}

connect locahost
http://localhost/spa1/timecards/signup/v0/dist/#/registered?email=mckenna.tim@gmail.com&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g

RRCLLC

"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJleHAiOjE2MTcyMjMwMDQ3NTh9.PQN6PoIhHabWojm8O3nixZqXYH4YED4_CozfJr-50q0"

RRCLLC connect tim 
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJleHAiOjE2MTcyMjQ1MzE2NTZ9.IQ4ffmQxE2hkF6Q43MgTtXRgw7SvvRlOLX5ylmtagis


{"email":"mckenna.tim@gmail.com","firstday":1,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJleHAiOjE2MTcyMjMwMDQ3NTh9.PQN6PoIhHabWojm8O3nixZqXYH4YED4_CozfJr-50q0"}

{"email":"mckenna.tim@gmail.com","firstday":1,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJleHAiOjE2MTcyMjQ1MzE2NTZ9.IQ4ffmQxE2hkF6Q43MgTtXRgw7SvvRlOLX5ylmtagis"}


gtten via urapps XXXXXXXX
{"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g"}

noah
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJub2FoLm1ja2VubmFAZ21haWwuY29tIiwiZXhwIjoxNjE3MjI0MzQwMDM1fQ.OdmjrD7vPN0IJGbL378bIesI0XBljcVgxo_XRRVJWig

http://localhost/spa1/timecards/signup/v0/dist/#/?email=noah.mckenna@gmail.com&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJub2FoLm1ja2VubmFAZ21haWwuY29tIiwiZXhwIjoxNjE3MjI0Mzk1MTAzfQ.n5RE3Vp-F8kDcfsrStHsaDOEwj6TxogMgQLHZfzxph4


returning from socialauth mckennatim 
http://localhost/spa1/timecards/signup/v0/dist/#/registered?email=mckenna.tim@gmail.com&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g

localhos registered 150 getCToken
{token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiU…xMDN9.90bDRsadF-X1FvtmIULq5HEDWGK0WgmS37duTFepA_M", firstday: 1, binfo: {…}, coid: "RRCLLC", role: "partner"}binfo: {auth: true, message: "user has apps", emailid: "mckenna.tim@gmail.com", appid: "signup", cos: Array(6)}coid: "RRCLLC"firstday: 1role: "partner"token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJleHAiOjE2MTcyMjY4NzYxMDN9.90bDRsadF-X1FvtmIULq5HEDWGK0WgmS37duTFepA_M"__proto__: Object

{"email":"mckenna.tim@gmail.com","firstday":1,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiUlJDTExDIiwicm9sZSI6InBhcnRuZXIiLCJhcHBpZCI6InNpZ251cCIsImVtYWlsaWQiOiJtY2tlbm5hLnRpbUBnbWFpbC5jb20iLCJleHAiOjE2MTcyMjY4NzYxMDN9.90bDRsadF-X1FvtmIULq5HEDWGK0WgmS37duTFepA_M"}


timecards.sitebuilt

https://timecards.sitebuilt.net/signup/#/registered?email=mckenna.tim@gmail.com&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g

back to signup
{token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiU…0NTB9.isZ1kb7FzNG7YWCSCzc2t7VaYsQnQyH7Wg4P1UXhkmo", firstday: 1, binfo: {…}, coid: "RRCLLC", role: "partner"}

{email: "mckenna.tim@gmail.com", firstday: 1, token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2lkIjoiU…0NTB9.isZ1kb7FzNG7YWCSCzc2t7VaYsQnQyH7Wg4P1UXhkmo"}

timecards
{"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g"}

signin
{"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g"}





{"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNpZ251cCIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.ELiuUtxsNbwNKcznaI07GoZXwdtbDqmRRR-P_kanI5g"}

### 2/20/21 14tcard-signin_history.replace.search

connect sends a search string to urapps, If it is there it should replace ls, same of for urcos formerly registered

### 2/22/21 15tcard-signin_fetchToken-connect-ls_fetchTcardToken-cos-lsa

### 2/23/21 16tcard-signin_synch_urapps+cos

### 2/23/21 17tcard-signing+css

### 2/27/21 18tcard-jobcost

### 3/2/21 19tcard-jobcost_pc_byday