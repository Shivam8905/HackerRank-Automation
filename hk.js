//require puppeteer
const puppeteer = require('puppeteer')

const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = '*********************'
const password = '123456'

//it will open our browser but it will be not visible therefor we will use headless false
let browserOpen = puppeteer.launch({
    headless : false,

    //open the browser with full screen
    args :['--start-maximized'],
    //for slowing the speed
     slowMo:10,

    defaultViewport:null
})

let page

//open a new tab
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;

}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    //delay so we can see
    let emailIsEntered = page.type("input[id='input-1']", email, {delay : 1})
    return emailIsEntered
  
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']", password, {delay : 1})
    return passwordIsEntered

}).then(function(){
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', {delay : 1})
    return loginButtonClicked

}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="data-structures"]', page)
    return clickOnAlgoPromise

}).then(function(){
    let getToeasy = waitAndClick('input[value="easy"]', page)
    return getToeasy
}).then(function(){
    let getToArray = waitAndClick('input[value="arrays"]', page)
    return getToArray
}).then(function(){
    let waitFor1Seconds = page.waitFor(500)
    return waitFor1Seconds

}).then(function(){
    //$$ query selector for all
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
    return allChallengesPromise
}).then(function(questionsArr){
    console.log('number of question', questionsArr.length)
    let questionWillBeSolved = questionSolver(page ,questionsArr[0] ,codeObj.answers[0])
    return questionWillBeSolved;
})

//will wait to load the page
function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
        

    })
}

function questionSolver(page ,question , answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click()
       // return questionWillBeClicked
       questionWillBeClicked.then(function(){
           let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
           return EditorInFocusPromise
       }).then(function(){
           return waitAndClick('.checkbox-input', page)
       }).then(function(){
           return waitAndClick('#input-1', page)
        }).then(function(){
            return page.type('#input-1', answer, {delay:1})

        }).then(function(){
            let CtrlIsPressed = page.keyboard.down('Control')
            return CtrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A', {delay:10})
            return AIsPressed
        }).then(function(){
            let XIsPressed = page.keyboard.press('X', {delay:10})
            return XIsPressed
        }).then(function(){
            let CtrlIsUnPressed = page.keyboard.up('Control')
            return CtrlIsUnPressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return mainEditorInFocus
        }).then(function(){
            let CtrlIsPressed = page.keyboard.down('Control')
            return CtrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A', {delay:10})
            return AIsPressed
        }).then(function(){
            let VIsPressed = page.keyboard.press('V', {delay:10})
            return VIsPressed
        }).then(function(){
            let CtrlIsUnPressed = page.keyboard.up('Control')
            return CtrlIsUnPressed
        }).then(function(){
            return page.click('.hr-monaco-submit', {delay:10})

        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })

    })
}