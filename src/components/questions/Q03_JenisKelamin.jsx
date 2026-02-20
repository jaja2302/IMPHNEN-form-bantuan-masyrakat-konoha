import { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppState';
import QuestionLayout from './QuestionLayout';
import './Q03_JenisKelamin.css';

export default function Q03_JenisKelamin({ onNext, onPrev, step, totalSteps }) {
  const { answers, dispatch } = useAppState();
  const value = answers['q03'] ?? '';
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      dispatch({ type: 'SET_ANSWER', payload: { id: 'q03', value: file.name } });
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleNext = () => {
    if (!value) return;
    onNext();
  };

  return (
    <QuestionLayout title="Jenis Kelamin" onPrev={onPrev} onNext={handleNext} step={step} totalSteps={totalSteps}>
      <div className="q03-file-wrap">
        <input
          type="file"
          id="q03-file"
          accept="image/*"
          onChange={handleFileChange}
          className="q03-file-input"
        />
        {previewUrl && (
          <div className="q03-preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
      </div>
    </QuestionLayout>
  );
}
