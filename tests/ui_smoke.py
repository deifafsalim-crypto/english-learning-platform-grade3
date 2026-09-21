"""Focused browser smoke test using Chrome DevTools; no third-party test runner required."""
import json, subprocess, time, urllib.request
from pathlib import Path
import websocket

ROOT=Path(__file__).resolve().parents[1]
PORT=9333
chrome=Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
profile=ROOT/".chrome-ui-smoke"
url=(ROOT/"english_learning_platform_v2.html").as_uri()
proc=subprocess.Popen([str(chrome),"--headless=new","--disable-gpu","--no-sandbox","--no-first-run",f"--remote-debugging-port={PORT}","--remote-allow-origins=*",f"--user-data-dir={profile}",url],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
try:
    target=None
    for _ in range(50):
        try:
            tabs=json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json",timeout=1))
            target=next((x for x in tabs if x.get("type")=="page"),None)
            if target: break
        except Exception: time.sleep(.1)
    assert target,"Chrome DevTools page did not start"
    ws=websocket.create_connection(target["webSocketDebuggerUrl"],timeout=10)
    seq=0
    def evaluate(expression):
        nonlocal_dummy=None
        global seq
        seq+=1; current=seq
        ws.send(json.dumps({"id":current,"method":"Runtime.evaluate","params":{"expression":expression,"awaitPromise":True,"returnByValue":True}}))
        while True:
            msg=json.loads(ws.recv())
            if msg.get("id")==current:
                result=msg["result"]["result"]
                if "exceptionDetails" in msg.get("result",{}): raise AssertionError(msg["result"]["exceptionDetails"])
                return result.get("value")
    time.sleep(.7)
    assert evaluate("COURSE.lessons.length")==47
    assert evaluate("COURSE.stories.length")==12
    # Complete the first lesson, then prove repeated checking does not add points.
    result=evaluate("""(async()=>{const wait=()=>new Promise(r=>setTimeout(r,40));document.querySelector('[data-answer="رتّب المكان"]').click();document.querySelector('[data-check="w1q"]').click();await wait();let a=JSON.parse(localStorage.englishPlatformStateV3);document.querySelector('[data-answer="رتّب المكان"]').click();document.querySelector('[data-check="w1q"]').click();await wait();let b=JSON.parse(localStorage.englishPlatformStateV3);return {first:a.points,second:b.points,done:b.completedLessons.includes('w1')}})()""")
    assert result=={"first":10,"second":10,"done":True},result
    # Robot School has a complete route through scenes and comprehension.
    result=evaluate("""(async()=>{const wait=()=>new Promise(r=>setTimeout(r,25));document.querySelector('[data-page="stories"]').click();document.querySelector('[data-story="robot"]').click();for(let i=0;i<3;i++){document.querySelector('[data-story-nav="next"]').click();await wait()}document.querySelector('[data-story-answer="At quarter to three."]').click();document.querySelector('[data-story-check]').click();await wait();return JSON.parse(localStorage.englishPlatformStateV3).completedStories.includes('robot')})()""")
    assert result is True
    # Opening a game does not count; completing all rounds does.
    result=evaluate("""(async()=>{const wait=()=>new Promise(r=>setTimeout(r,25));document.querySelector('[data-page="games"]').click();document.querySelector('[data-game="match"]').click();let before=JSON.parse(localStorage.englishPlatformStateV3).gameRuns.length;for(const answer of ['حذاء رياضي','بنّاء','الخريف','أؤدي الواجب']){document.querySelector(`[data-game-option="${answer}"]`).click();document.querySelector('[data-game-check]').click();await wait();document.querySelector('[data-game-next]').click();await wait()}let after=JSON.parse(localStorage.englishPlatformStateV3).gameRuns.length;return {before,after}})()""")
    assert result=={"before":0,"after":1},result
    # Diary create and update keep one stable entry.
    result=evaluate("""(async()=>{const wait=()=>new Promise(r=>setTimeout(r,25));document.querySelector('[data-page="diary"]').click();document.querySelector('#diary-title').value='My day';document.querySelector('#diary-text').value='I play.';document.querySelector('[data-diary-save]').click();await wait();let a=JSON.parse(localStorage.englishPlatformStateV3);document.querySelector('#diary-text').value='I play tennis.';document.querySelector('[data-diary-save]').click();await wait();let b=JSON.parse(localStorage.englishPlatformStateV3);return {created:a.diary.length,updated:b.diary.length,text:b.diary[0].text}})()""")
    assert result=={"created":1,"updated":1,"text":"I play tennis."},result
    result=evaluate("""(async()=>{const wait=()=>new Promise(r=>setTimeout(r,25));document.querySelector('[data-diary-delete]').click();await wait();document.querySelector('#confirm-dialog').close('confirm');await wait();return JSON.parse(localStorage.englishPlatformStateV3).diary.length})()""")
    assert result==0,result
    # A section test calculates and persists last/best results.
    result=evaluate("""(async()=>{const wait=()=>new Promise(r=>setTimeout(r,20));document.querySelector('[data-page="learn"]').click();document.querySelector('[data-unit-test="welcome"]').click();for(const answer of ['رتّب المكان',"My name’s Lily.",'These are pens.']){const button=[...document.querySelectorAll('[data-unit-answer]')].find(x=>x.dataset.unitAnswer===answer);button.click();document.querySelector('[data-unit-next]').click();await wait()}return JSON.parse(localStorage.englishPlatformStateV3).unitTests.welcome.best})()""")
    assert result==100,result
    # Corrupt JSON must not break the rendered application after reload.
    assert evaluate("localStorage.englishPlatformStateV3='{bad';location.reload();true") is True
    time.sleep(.7)
    assert evaluate("document.querySelectorAll('[data-open-module]').length")==9
    print("ui_smoke: lesson, points, story, game, diary, and corrupt-storage checks passed")
finally:
    try: ws.close()
    except Exception: pass
    proc.terminate()
    try: proc.wait(timeout=5)
    except subprocess.TimeoutExpired: proc.kill()
