"use strict";
(function(root){
  const VERSION=3;
  const blank=()=>({version:VERSION,points:0,awards:[],lessonAttempts:{},completedLessons:[],storyProgress:{},completedStories:[],gameRuns:[],bestGames:{},unitTests:{},selfAssess:{},diary:[],project:{foods:[],title:"قائمة إفطار عُمانية",sentences:"",updatedAt:null},updatedAt:null});
  const arr=v=>Array.isArray(v)?v:[];
  function migrate(raw,legacyDiary=[]){
    const out=blank(),x=raw&&typeof raw==="object"?raw:{};
    if(x.version===VERSION){Object.assign(out,x);}
    else{
      out.points=Number.isFinite(x.points)?Math.max(0,x.points):0;
      out.completedLessons=arr(x.completedLessons);
      out.completedStories=arr(x.completedStories);
      out.gameRuns=arr(x.gameRuns);
      out.lessonAttempts=x.lessonAttempts&&typeof x.lessonAttempts==="object"?x.lessonAttempts:{};
      out.awards=arr(x.awards);
      if(!out.awards.length&&out.points>0) out.awards=["legacy-points"];
    }
    for(const k of ["awards","completedLessons","completedStories","gameRuns","diary"]) out[k]=arr(out[k]);
    for(const k of ["lessonAttempts","storyProgress","bestGames","unitTests","selfAssess"]) if(!out[k]||typeof out[k]!=="object"||Array.isArray(out[k])) out[k]={};
    if(!out.project||typeof out.project!=="object") out.project=blank().project;
    if(!out.diary.length&&legacyDiary.length) out.diary=legacyDiary;
    out.version=VERSION; return out;
  }
  const norm=v=>String(v??"").trim().toLowerCase().replace(/[’']/g,"'").replace(/\s+/g," ").replace(/[.!?]+$/g,"");
  function isCorrect(question,value){return arr(question.acceptedAnswers||[question.answer]).some(a=>norm(a)===norm(value));}
  function award(state,key,points){if(state.awards.includes(key)) return false;state.awards.push(key);state.points+=points;return true;}
  function answerLesson(state,question,value){const ok=isCorrect(question,value),old=state.lessonAttempts[question.lessonId]||{tries:0,best:0};old.tries++;old.lastCorrect=ok;old.best=Math.max(old.best,ok?100:0);state.lessonAttempts[question.lessonId]=old;if(ok){if(!state.completedLessons.includes(question.lessonId))state.completedLessons.push(question.lessonId);award(state,"lesson:"+question.lessonId,10);}return ok;}
  function completeStory(state,id,correct){state.storyProgress[id]={scene:999,quizCorrect:!!correct};if(correct){if(!state.completedStories.includes(id))state.completedStories.push(id);award(state,"story:"+id,10);}}
  function completeGame(state,id,score,total,runId){const pct=total?Math.round(score/total*100):0;state.gameRuns.push({id,score,total,pct,runId,at:new Date().toISOString()});state.bestGames[id]=Math.max(state.bestGames[id]||0,pct);award(state,"game:"+id,15);return pct;}
  root.PlatformCore={VERSION,blank,migrate,norm,isCorrect,award,answerLesson,completeStory,completeGame};
  if(typeof module!=="undefined")module.exports=root.PlatformCore;
})(typeof window!=="undefined"?window:globalThis);
