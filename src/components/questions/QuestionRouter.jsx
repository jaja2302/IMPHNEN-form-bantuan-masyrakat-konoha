import Q01_NamaSamaran from './Q01_NamaSamaran';
import Q02_TanggalLahir from './Q02_TanggalLahir';
import Q03_JenisKelamin from './Q03_JenisKelamin';
import Q04_StatusSosial from './Q04_StatusSosial';
import Q05_TingkatKebutuhan from './Q05_TingkatKebutuhan';
import Q06_JumlahTabBrowser from './Q06_JumlahTabBrowser';
import Q07_KepuasanNegara from './Q07_KepuasanNegara';
import Q08_WarnaLamborghini from './Q08_WarnaLamborghini';
import Q09_SumberInformasi from './Q09_SumberInformasi';
import Q10_Checkbox from './Q10_Checkbox';
import Q11_UsernameMedsos from './Q11_UsernameMedsos';
import Q12_CitaCita from './Q12_CitaCita';
import Q13_MenuMakanSiang from './Q13_MenuMakanSiang';
import Q14_PersenKesabaran from './Q14_PersenKesabaran';
import Q15_NamaGuruSD from './Q15_NamaGuruSD';
import Q16_PilihKarakter from './Q16_PilihKarakter';
import Q17_Captcha from './Q17_Captcha';
import Q18_Password from './Q18_Password';
import Q19_ConfirmPassword from './Q19_ConfirmPassword';
import Q20_ConfirmTheConfirm from './Q20_ConfirmTheConfirm';
import RouletteQuestion from './RouletteQuestion';
import FinalGatekeeper from '../FinalGatekeeper';

const QUESTIONS = [
  Q01_NamaSamaran,
  Q02_TanggalLahir,
  Q03_JenisKelamin,
  Q04_StatusSosial,
  Q05_TingkatKebutuhan,
  Q06_JumlahTabBrowser,
  Q07_KepuasanNegara,
  Q08_WarnaLamborghini,
  Q09_SumberInformasi,
  Q10_Checkbox,
  Q11_UsernameMedsos,
  Q12_CitaCita,
  Q13_MenuMakanSiang,
  Q14_PersenKesabaran,
  Q15_NamaGuruSD,
  Q16_PilihKarakter,
  Q17_Captcha,
  Q18_Password,
  Q19_ConfirmPassword,
  Q20_ConfirmTheConfirm,
];

export default function QuestionRouter({ step, totalSteps, onNext, onPrev }) {
  const { useAppState } = require('../../context/AppState');
  const { roulettePosition, rouletteQuestion } = useAppState();

  if (step > totalSteps) {
    return <FinalGatekeeper onSuccess={onNext} />;
  }

  const showRouletteHere = roulettePosition != null && step === roulettePosition && rouletteQuestion;
  const QuestionComponent = QUESTIONS[step - 1];

  return (
    <div className="question-router">
      {showRouletteHere && (
        <RouletteQuestion question={rouletteQuestion} onNext={onNext} />
      )}
      {!showRouletteHere && QuestionComponent && (
        <QuestionComponent
          onNext={onNext}
          onPrev={onPrev}
          step={step}
          totalSteps={totalSteps}
        />
      )}
    </div>
  );
}
