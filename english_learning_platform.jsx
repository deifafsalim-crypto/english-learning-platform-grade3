import React, { useState, useEffect, useRef } from 'react';

const EnglishLearningPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState({});
  const [diaryEntries, setDiaryEntries] = useState({});
  const [breakfastProject, setBreakfastProject] = useState({ title: '', foods: [], description: '' });
  const synth = useRef(null);

  useEffect(() => {
    synth.current = window.speechSynthesis;
    return () => {
      if (synth.current) synth.current.cancel();
    };
  }, []);

  const speak = (text, rate = 1) => {
    if (!synth.current) return;
    synth.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    synth.current.speak(utterance);
  };

  const dailyRoutines = [
    { id: 1, text: 'get up', ar: 'استيقظ', img: '🛏️' },
    { id: 2, text: 'pray', ar: 'صلِّ', img: '🤲' },
    { id: 3, text: 'have breakfast', ar: 'تناول الفطور', img: '🍽️' },
    { id: 4, text: 'go to school', ar: 'اذهب للمدرسة', img: '🚌' },
    { id: 5, text: 'have art lessons', ar: 'درس الفن', img: '🎨' },
    { id: 6, text: 'play', ar: 'العب', img: '⚽' },
    { id: 7, text: 'have lunch', ar: 'تناول الغداء', img: '🍜' },
    { id: 8, text: 'do homework', ar: 'اعمل الواجب', img: '📝' },
    { id: 9, text: 'have dinner', ar: 'تناول العشاء', img: '🍲' },
    { id: 10, text: 'go to bed', ar: 'نم', img: '😴' },
  ];

  const timesOfDay = [
    { id: 1, text: 'in the morning', ar: 'في الصباح', time: '🌅' },
    { id: 2, text: 'in the afternoon', ar: 'في بعد الظهر', time: '☀️' },
    { id: 3, text: 'in the evening', ar: 'في المساء', time: '🌆' },
    { id: 4, text: 'at night', ar: 'في الليل', time: '🌙' },
  ];

  const Lesson1 = () => (
    <div className="lesson-container">
      <h2>الدرس 1: اكتشف أنشطتك اليومية</h2>
      <p>تعلم أسماء 10 أنشطة يومية</p>
      
      <div className="vocab-grid">
        {dailyRoutines.map(routine => (
          <div key={routine.id} className="vocab-card">
            <div className="vocab-emoji">{routine.img}</div>
            <h3>{routine.text}</h3>
            <p className="ar-text">{routine.ar}</p>
            <button onClick={() => speak(routine.text)}>🔊 استمع</button>
          </div>
        ))}
      </div>

      <div className="lesson-activity">
        <h3>نشاط: صل العبارة بالصورة</h3>
        <MatchingGame routines={dailyRoutines} />
      </div>
    </div>
  );

  const Lesson2 = () => (
    <div className="lesson-container">
      <h2>الدرس 2: الإثبات والنفي</h2>
      <p>تعلم كيفية الإثبات والنفي باستخدام I و We</p>
      
      <div className="grammar-box">
        <div className="grammar-rule">
          <h4>✅ الإثبات (Affirmative)</h4>
          <p><strong>I play.</strong> - أنا ألعب.</p>
          <p><strong>We have lunch.</strong> - نحن نتناول الغداء.</p>
        </div>
        
        <div className="grammar-rule">
          <h4>❌ النفي (Negative)</h4>
          <p><strong>I don't play.</strong> - أنا لا ألعب.</p>
          <p><strong>We don't have lunch.</strong> - نحن لا نتناول الغداء.</p>
        </div>
      </div>

      <div className="lesson-activity">
        <h3>نشاط: اختر الجملة الصحيحة</h3>
        <AffirmativeNegativeGame routines={dailyRoutines} />
      </div>
    </div>
  );

  const Lesson3 = () => (
    <div className="lesson-container">
      <h2>الدرس 3: فترات اليوم</h2>
      <p>تعلم فترات اليوم المختلفة</p>
      
      <div className="time-grid">
        {timesOfDay.map(time => (
          <div key={time.id} className="time-card">
            <div className="time-emoji">{time.time}</div>
            <h3>{time.text}</h3>
            <p className="ar-text">{time.ar}</p>
            <button onClick={() => speak(time.text)}>🔊 استمع</button>
          </div>
        ))}
      </div>

      <div className="lesson-activity">
        <h3>نشاط: اربط النشاط بالفترة الصحيحة</h3>
        <TimeMatchingGame routines={dailyRoutines} times={timesOfDay} />
      </div>
    </div>
  );

  const Lesson4 = () => (
    <div className="lesson-container">
      <h2>الدرس 4: السؤال عن الروتين</h2>
      <p>تعلم كيفية السؤال عن الوقت والإجابة</p>
      
      <div className="dialogue-box">
        <div className="dialogue">
          <p className="speaker-a">👧 When do you have breakfast?</p>
          <p className="speaker-b">👦 We have breakfast in the morning.</p>
        </div>
        <button onClick={() => speak("When do you have breakfast? We have breakfast in the morning.")}>🔊 استمع للحوار</button>
      </div>

      <div className="lesson-activity">
        <h3>نشاط: أكمل الحوار</h3>
        <DialogueGame routines={dailyRoutines} times={timesOfDay} />
      </div>
    </div>
  );

  const Lesson5 = () => (
    <div className="lesson-container">
      <h2>الدرس 5: قراءة الساعة</h2>
      <p>تعلم كيفية قراءة الساعة والتعبير عن الوقت</p>
      
      <div className="clock-learning">
        <div className="clock-times">
          <TimeClockCard time="6:00" text="six o'clock" />
          <TimeClockCard time="6:15" text="quarter past six" />
          <TimeClockCard time="6:30" text="half past six" />
          <TimeClockCard time="6:45" text="quarter to seven" />
        </div>
      </div>

      <div className="lesson-activity">
        <h3>نشاط: اختر الوقت الصحيح</h3>
        <ClockGame />
      </div>
    </div>
  );

  const Lesson6 = () => (
    <div className="lesson-container">
      <h2>الدرس 6: الصوتيات - wh و ph</h2>
      <p>تعلم نطق الحروف wh و ph</p>
      
      <div className="phonics-grid">
        <div className="phonics-card">
          <h3>🐋 wh</h3>
          <ul>
            <li>whale 🐋</li>
            <li>wheel 🎡</li>
            <li>wheat 🌾</li>
            <li>white ⚪</li>
          </ul>
          <button onClick={() => speak("whale wheel wheat white")}>🔊 استمع</button>
        </div>
        
        <div className="phonics-card">
          <h3>☎️ ph</h3>
          <ul>
            <li>phone ☎️</li>
            <li>dolphin 🐬</li>
            <li>elephant 🐘</li>
            <li>alphabet 🔤</li>
          </ul>
          <button onClick={() => speak("phone dolphin elephant alphabet")}>🔊 استمع</button>
        </div>
      </div>

      <div className="lesson-activity">
        <h3>نشاط: صنّف الكلمات - wh أو ph</h3>
        <PhonicsGame />
      </div>
    </div>
  );

  const StoryAtomic = () => (
    <div className="story-container">
      <h2>📖 قصة: Atomic is Colorful!</h2>
      <p>اكتشف كيفية استمتع أتوميك برسم الألوان مع أصدقائه</p>
      
      <div className="story-scenes">
        <StoryScene 
          num={1} 
          text="Lily and Jack have art lessons at school today. They paint flowers with colorful paints."
          ar="للي وجاك لديهما درس فن في المدرسة اليوم. يرسمان الزهور بألوان جميلة."
          action="🎨" 
        />
        <StoryScene 
          num={2} 
          text="Polly is on the table. Atomic looks at the paints. Oh no! What a mess!"
          ar="بولي على الطاولة. أتوميك ينظر إلى الألوان. يا إلهي! ما أكثر هذا من فوضى!"
          action="😱" 
        />
        <StoryScene 
          num={3} 
          text="Blue and yellow make green! Atomic is colorful now!"
          ar="الأزرق والأصفر يصنعان الأخضر! أتوميك ملون الآن!"
          action="✨" 
        />
      </div>

      <div className="story-activity">
        <h3>نشاط: رتب مشاهد القصة</h3>
        <StorySequencingGame />
      </div>
    </div>
  );

  const MatchingGame = ({ routines }) => {
    const [matched, setMatched] = useState({});
    const [selected, setSelected] = useState(null);

    const handleClick = (routine) => {
      if (selected && selected !== routine.id) {
        setMatched(prev => ({ ...prev, [selected]: routine.id }));
        setSelected(null);
      } else {
        setSelected(routine.id === selected ? null : routine.id);
      }
    };

    return (
      <div className="game-container">
        <div className="game-instructions">اضغط على الصورة والعبارة لربطهما معاً</div>
        <div className="matching-game">
          <div className="matching-left">
            {routines.map(r => (
              <div 
                key={r.id}
                className={`matching-item ${selected === r.id ? 'selected' : ''}`}
                onClick={() => handleClick(r)}
              >
                {r.img}
              </div>
            ))}
          </div>
          <div className="matching-right">
            {routines.map(r => (
              <div key={r.id} className="matching-text">
                {r.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AffirmativeNegativeGame = ({ routines }) => {
    const [answers, setAnswers] = useState({});
    const questions = [
      { id: 1, routine: 'play', subject: 'I', correct: 'affirmative' },
      { id: 2, routine: 'have breakfast', subject: 'We', correct: 'affirmative' },
      { id: 3, routine: 'go to school', subject: 'I', correct: 'negative' },
    ];

    return (
      <div className="game-container">
        {questions.map(q => (
          <div key={q.id} className="question-item">
            <p><strong>{q.subject} {q.routine}</strong></p>
            <div className="button-group">
              <button 
                className={`option-btn ${answers[q.id] === 'affirmative' ? 'correct' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: 'affirmative' }))}
              >
                ✅ صحيح
              </button>
              <button 
                className={`option-btn ${answers[q.id] === 'negative' ? 'correct' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: 'negative' }))}
              >
                ❌ نفي
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const TimeMatchingGame = ({ routines, times }) => {
    const [matches, setMatches] = useState({});

    const activities = [
      { routine: 'get up', correctTime: 'in the morning' },
      { routine: 'have breakfast', correctTime: 'in the morning' },
      { routine: 'play', correctTime: 'in the afternoon' },
      { routine: 'have dinner', correctTime: 'in the evening' },
      { routine: 'go to bed', correctTime: 'at night' },
    ];

    return (
      <div className="game-container">
        {activities.map((act, idx) => (
          <div key={idx} className="time-match-item">
            <strong>{act.routine}</strong>
            <select 
              onChange={(e) => setMatches(prev => ({ ...prev, [idx]: e.target.value }))}
              value={matches[idx] || ''}
            >
              <option value="">اختر الفترة</option>
              {times.map(t => (
                <option key={t.id} value={t.text}>{t.text}</option>
              ))}
            </select>
            {matches[idx] === act.correctTime && <span className="correct">✅</span>}
          </div>
        ))}
      </div>
    );
  };

  const DialogueGame = ({ routines, times }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const dialogues = [
      { question: 'When do you have breakfast?', correctStart: 'We have breakfast' },
      { question: 'When do you have lunch?', correctStart: 'We have lunch' },
    ];

    return (
      <div className="game-container">
        {dialogues.map((d, idx) => (
          <div key={idx} className="dialogue-item">
            <p className="question">👧 {d.question}</p>
            <div className="answer-input">
              <input 
                type="text"
                placeholder="اكتب الإجابة..."
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <button onClick={() => speak(userAnswer)}>🔊</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const TimeClockCard = ({ time, text }) => (
    <div className="clock-card">
      <div className="time-display">{time}</div>
      <p>{text}</p>
      <button onClick={() => speak(`It's ${text}`)}>🔊</button>
    </div>
  );

  const ClockGame = () => {
    const times = [
      { display: '3:00', text: "three o'clock" },
      { display: '3:15', text: 'quarter past three' },
      { display: '3:30', text: 'half past three' },
      { display: '3:45', text: 'quarter to four' },
    ];
    const [answers, setAnswers] = useState({});

    return (
      <div className="game-container">
        {times.map((t, idx) => (
          <div key={idx} className="clock-game-item">
            <div className="clock-display">{t.display}</div>
            <div className="time-options">
              {times.map((opt, optIdx) => (
                <button 
                  key={optIdx}
                  className={`time-option ${answers[idx] === optIdx ? 'selected' : ''}`}
                  onClick={() => setAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const PhonicsGame = () => {
    const words = [
      { word: 'whale', phonics: 'wh' },
      { word: 'phone', phonics: 'ph' },
      { word: 'wheel', phonics: 'wh' },
      { word: 'elephant', phonics: 'ph' },
      { word: 'white', phonics: 'wh' },
      { word: 'dolphin', phonics: 'ph' },
    ];
    const [answers, setAnswers] = useState({});

    return (
      <div className="game-container">
        {words.map((w, idx) => (
          <div key={idx} className="phonics-item">
            <span className="word">{w.word}</span>
            <div className="phonics-options">
              <button 
                className={`phonics-btn ${answers[idx] === 'wh' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, [idx]: 'wh' }))}
              >
                wh
              </button>
              <button 
                className={`phonics-btn ${answers[idx] === 'ph' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, [idx]: 'ph' }))}
              >
                ph
              </button>
            </div>
            {answers[idx] === w.phonics && <span className="correct">✅</span>}
          </div>
        ))}
      </div>
    );
  };

  const StoryScene = ({ num, text, ar, action }) => (
    <div className="story-scene">
      <div className="scene-number">مشهد {num}</div>
      <div className="scene-action">{action}</div>
      <p className="scene-en">{text}</p>
      <p className="scene-ar">{ar}</p>
      <button onClick={() => speak(text)}>🔊 استمع</button>
    </div>
  );

  const StorySequencingGame = () => {
    const [sequence, setSequence] = useState([1, 2, 3]);
    const scenes = [
      { id: 1, title: 'الدرس البداية', emoji: '🎨' },
      { id: 2, title: 'الفوضى', emoji: '😱' },
      { id: 3, title: 'النتيجة الجميلة', emoji: '✨' },
    ];

    return (
      <div className="game-container">
        <div className="sequencing-game">
          {sequence.map((id, idx) => (
            <div key={idx} className="sequence-item">
              {idx + 1}. {scenes.find(s => s.id === id)?.emoji}
            </div>
          ))}
        </div>
        <button onClick={() => setSequence([1, 2, 3])} className="reset-btn">إعادة تعيين</button>
      </div>
    );
  };

  const HomePage = () => (
    <div className="home-page">
      <div className="welcome-card">
        <h1>🌟 مرحباً بك في منصة تعلم اللغة الإنجليزية</h1>
        <p>الوحدة الأولى: It's a Happy Day!</p>
        <p className="subtitle">للصف الثالث - الفصل الدراسي الأول</p>
      </div>

      <div className="home-grid">
        <button className="nav-btn" onClick={() => setCurrentPage('diagnostic')}>
          <span className="emoji">🎯</span>
          جاهز للمغامرة؟
          <span className="desc">تشخيص البداية</span>
        </button>
        
        <button className="nav-btn" onClick={() => setCurrentPage('lessons')}>
          <span className="emoji">📚</span>
          دروسي
          <span className="desc">6 دروس رئيسية</span>
        </button>
        
        <button className="nav-btn" onClick={() => setCurrentPage('games')}>
          <span className="emoji">🎮</span>
          ساحة الألعاب
          <span className="desc">ألعاب تفاعلية</span>
        </button>
        
        <button className="nav-btn" onClick={() => setCurrentPage('story')}>
          <span className="emoji">📖</span>
          وقت القصة
          <span className="desc">Atomic is Colorful</span>
        </button>
        
        <button className="nav-btn" onClick={() => setCurrentPage('clock')}>
          <span className="emoji">⏰</span>
          ساعة يومي
          <span className="desc">قراءة الساعة</span>
        </button>
        
        <button className="nav-btn" onClick={() => setCurrentPage('diary')}>
          <span className="emoji">📔</span>
          دفتر يومي
          <span className="desc">اكتب روتينك</span>
        </button>
        
        <button className="nav-btn" onClick={() => setCurrentPage('breakfast')}>
          <span className="emoji">🍽️</span>
          قائمة إفطاري
          <span className="desc">مشروع الفطور</span>
        </button>
        
        <button className="nav-btn" onClick={() => setCurrentPage('progress')}>
          <span className="emoji">📊</span>
          مراجعتي
          <span className="desc">تتبع التقدم</span>
        </button>
      </div>
    </div>
  );

  const LessonsPage = () => (
    <div className="lessons-page">
      <h1>📚 دروسي</h1>
      <div className="lessons-nav">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <button 
            key={num}
            className={`lesson-btn ${currentLesson === num ? 'active' : ''}`}
            onClick={() => setCurrentLesson(num)}
          >
            الدرس {num}
          </button>
        ))}
      </div>

      <div className="lesson-content">
        {currentLesson === 1 && <Lesson1 />}
        {currentLesson === 2 && <Lesson2 />}
        {currentLesson === 3 && <Lesson3 />}
        {currentLesson === 4 && <Lesson4 />}
        {currentLesson === 5 && <Lesson5 />}
        {currentLesson === 6 && <Lesson6 />}
      </div>
    </div>
  );

  const BreakfastProject = () => (
    <div className="project-container">
      <h2>🍽️ قائمة إفطار عُمان</h2>
      <div className="project-form">
        <input 
          type="text"
          placeholder="اسم القائمة"
          value={breakfastProject.title}
          onChange={(e) => setBreakfastProject(prev => ({ ...prev, title: e.target.value }))}
        />
        <textarea 
          placeholder="وصف القائمة"
          value={breakfastProject.description}
          onChange={(e) => setBreakfastProject(prev => ({ ...prev, description: e.target.value }))}
        />
        <div className="foods-list">
          <h4>الأطعمة:</h4>
          <ul>
            {breakfastProject.foods.map((food, idx) => (
              <li key={idx}>{food}</li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={() => window.print()} className="print-btn">طباعة القائمة 🖨️</button>
    </div>
  );

  const DiaryPage = () => (
    <div className="diary-container">
      <h2>📔 دفتر يومي</h2>
      <div className="diary-form">
        <textarea 
          placeholder="اكتب يومك باستخدام الكلمات التي تعلمتها..."
          value={diaryEntries.today || ''}
          onChange={(e) => setDiaryEntries(prev => ({ ...prev, today: e.target.value }))}
          rows={6}
        />
        <button onClick={() => speak(diaryEntries.today)}>🔊 استمع لكتابتك</button>
      </div>
    </div>
  );

  const ProgressPage = () => (
    <div className="progress-container">
      <h2>📊 مراجعتي</h2>
      <div className="progress-stats">
        <div className="stat-card">
          <h3>الدروس المكتملة</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>النقاط</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>أيام المتابعة</h3>
          <p className="stat-number">1</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .app-container {
          direction: rtl;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Navigation */
        .nav-bar {
          background: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 1rem;
        }

        .nav-bar h1 {
          color: #667eea;
          font-size: 1.2rem;
        }

        .nav-bar button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        /* Home Page */
        .home-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .welcome-card h1 {
          color: #667eea;
          margin-bottom: 1rem;
          font-size: 2rem;
        }

        .welcome-card .subtitle {
          color: #888;
          font-size: 0.95rem;
        }

        .home-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .nav-btn {
          background: white;
          border: none;
          border-radius: 16px;
          padding: 1.5rem 1rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .nav-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .nav-btn .emoji {
          font-size: 2.5rem;
        }

        .nav-btn .desc {
          font-size: 0.75rem;
          color: #888;
          font-weight: 400;
        }

        /* Lessons */
        .lessons-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .lessons-nav {
          display: flex;
          gap: 0.5rem;
          margin: 1rem 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .lesson-btn {
          background: white;
          border: 2px solid #ddd;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .lesson-btn.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .lesson-container {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin-top: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .lesson-container h2 {
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .vocab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .vocab-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .vocab-emoji {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .vocab-card h3 {
          font-size: 1rem;
          margin: 0.5rem 0;
        }

        .ar-text {
          font-size: 0.85rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .vocab-card button {
          background: white;
          color: #667eea;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .grammar-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .grammar-rule {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 10px;
          border-left: 4px solid #667eea;
        }

        .time-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .time-card {
          background: white;
          border: 2px solid #667eea;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .time-emoji {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .game-container {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 10px;
          margin-top: 1rem;
        }

        .game-instructions {
          text-align: center;
          color: #666;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .matching-game {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .matching-left {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .matching-item {
          font-size: 2.5rem;
          cursor: pointer;
          padding: 1rem;
          background: white;
          border-radius: 10px;
          text-align: center;
          transition: all 0.2s;
          border: 3px solid transparent;
        }

        .matching-item.selected {
          border-color: #667eea;
          background: #f0f0f0;
        }

        .matching-right {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .matching-text {
          padding: 1rem;
          background: white;
          border-radius: 10px;
          font-weight: 500;
        }

        .question-item {
          background: white;
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .option-btn {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .option-btn.correct {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        .story-container {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .story-scenes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .story-scene {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .scene-number {
          font-size: 0.85rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .scene-action {
          font-size: 2rem;
          margin: 1rem 0;
        }

        .scene-en {
          font-size: 0.95rem;
          margin: 0.75rem 0;
          line-height: 1.5;
        }

        .scene-ar {
          font-size: 0.9rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .story-scene button {
          background: white;
          color: #667eea;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          margin-top: 1rem;
        }

        .diary-container, .project-container, .progress-container {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .diary-form textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #ddd;
          border-radius: 10px;
          font-family: inherit;
          margin: 1rem 0;
        }

        .progress-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          margin-top: 0.5rem;
        }

        /* Back Button */
        .back-btn {
          background: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          color: #667eea;
          margin: 1rem;
        }

        @media (max-width: 768px) {
          .home-grid {
            grid-template-columns: 1fr 1fr;
          }

          .grammar-box {
            grid-template-columns: 1fr;
          }

          .matching-game {
            grid-template-columns: 1fr;
          }

          .story-scenes {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="nav-bar">
        <h1>📚 منصة تعلم الإنجليزية</h1>
        {currentPage !== 'home' && (
          <button onClick={() => setCurrentPage('home')}>← الرئيسية</button>
        )}
      </div>

      <div className="app-content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'lessons' && <LessonsPage />}
        {currentPage === 'games' && <div style={{padding: '2rem', background: 'white', borderRadius: '16px', margin: '1rem'}}><h2>ساحة الألعاب - قريباً 🎮</h2></div>}
        {currentPage === 'story' && <StoryAtomic />}
        {currentPage === 'clock' && <div style={{padding: '2rem', background: 'white', borderRadius: '16px', margin: '1rem'}}><h2>ساعة يومي - قريباً ⏰</h2></div>}
        {currentPage === 'diary' && <DiaryPage />}
        {currentPage === 'breakfast' && <BreakfastProject />}
        {currentPage === 'progress' && <ProgressPage />}
      </div>
    </div>
  );
};

export default EnglishLearningPlatform;
