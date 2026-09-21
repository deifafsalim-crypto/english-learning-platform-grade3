"use strict";
const assert=require("assert");
const C=require("../platform_v2_core.js");

const migrated=C.migrate({points:20,lessonsCompleted:2,totalAttempts:4},[{id:"old",text:"I play.",title:"Old"}]);
assert.equal(migrated.version,3,"migrates to current version");
assert.equal(migrated.points,20,"preserves legacy points");
assert.equal(migrated.diary.length,1,"preserves legacy diary entries");

const s=C.blank();
const question={id:"q",lessonId:"lesson-1",answer:"In the morning."};
assert.equal(C.answerLesson(s,question," in  the MORNING "),true,"normalizes harmless spacing and case");
assert.equal(s.points,10,"awards first correct answer");
assert.equal(C.answerLesson(s,question,"In the morning."),true);
assert.equal(s.points,10,"does not award repeated correct answer");
assert.deepEqual(s.completedLessons,["lesson-1"],"derives completion from unique ids");

C.completeStory(s,"story-1",true);C.completeStory(s,"story-1",true);
assert.equal(s.points,20,"story reward is idempotent");
assert.equal(s.completedStories.length,1,"story completion is unique");

C.completeGame(s,"match",3,4,"run-1");
C.completeGame(s,"match",4,4,"run-2");
assert.equal(s.gameRuns.length,2,"counts completed runs, not game opens");
assert.equal(s.bestGames.match,100,"keeps best score");
assert.equal(s.points,35,"game achievement points are awarded once");
console.log("platform_v2_core: 14 assertions passed");
