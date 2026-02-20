import './QuestionLayout.css';

export default function QuestionLayout({ title, children, onPrev, onNext, step, totalSteps, error }) {
  return (
    <div className="question-layout">
      <h2 className="question-layout-title">Soal {step} dari {totalSteps}</h2>
      <p className="question-layout-label">{title}</p>
      {error && (
        <p className="question-layout-error">
          {error}
          <span className="question-layout-error-stamp"> DITOLAK</span>
        </p>
      )}
      {children}
      <div className="question-layout-nav">
        {step > 1 && (
          <button type="button" className="question-layout-btn prev" onClick={onPrev}>
            Sebelumnya
          </button>
        )}
        <button type="button" className="question-layout-btn next" onClick={onNext}>
          {step < totalSteps ? 'Selanjutnya' : 'Lanjut'}
        </button>
      </div>
    </div>
  );
}
