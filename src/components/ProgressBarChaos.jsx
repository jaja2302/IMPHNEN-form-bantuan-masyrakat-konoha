import './ProgressBarChaos.css';

export default function ProgressBarChaos({ currentStep, totalSteps }) {
  const percent = totalSteps ? Math.round((currentStep / totalSteps) * 100) : 0;
  return (
    <div className="progress-bar-chaos">
      <div className="progress-bar-chaos-fill" style={{ width: `${percent}%` }} />
      <span className="progress-bar-chaos-label">{percent}%</span>
    </div>
  );
}
