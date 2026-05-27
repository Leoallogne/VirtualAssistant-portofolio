import React, { useState } from 'react';

const ClientQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'painPoint',
      question: 'What is the biggest bottleneck in your business right now?',
      options: [
        { label: 'Inbox & Calendar Chaos', value: 'admin' },
        { label: 'Inconsistent Social Media', value: 'social' },
        { label: 'Scattered Data & Docs', value: 'data' }
      ]
    },
    {
      id: 'hours',
      question: 'How many hours per week do you want to win back?',
      options: [
        { label: '10 - 20 hours', value: '15' },
        { label: '20 - 40 hours', value: '30' },
        { label: '40+ hours', value: '45' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const getRecommendation = () => {
    if (answers.painPoint === 'admin') return "I recommend the 'Executive Admin Package'. I'll clear your inbox daily and optimize your calendar.";
    if (answers.painPoint === 'social') return "I recommend the 'Social Media Growth Package'. I'll schedule posts and engage with your audience.";
    if (answers.painPoint === 'data') return "I recommend the 'Workspace Organization Package'. I'll build you a Notion/CRM system that runs itself.";
    return "Let's hop on a discovery call to build a custom solution for your needs.";
  };

  return (
    <section className="section-padding" style={{ padding: '4rem 2rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Find Your <span style={{ color: 'var(--accent)' }}>Perfect Fit</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Take this quick 2-step assessment to discover how I can save you the most time.
        </p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        {step < questions.length ? (
          <div>
            <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Question {step + 1} of {questions.length}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
              {questions[step].question}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(questions[step].id, opt.value)}
                  style={{
                    padding: '1rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 15px var(--accent-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem' 
            }}>
              🎉
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--accent)' }}>
              Your Recommendation
            </h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Based on your answers, you can win back roughly <strong>{answers.hours} hours a week</strong>.
              <br/><br/>
              {getRecommendation()}
            </p>
            <button
              onClick={() => { setStep(0); setAnswers({}); }}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid var(--accent)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              Retake Quiz
            </button>
            <a 
              href="#contact" 
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--gradient-primary)',
                border: 'none',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Book a Call
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientQuiz;
