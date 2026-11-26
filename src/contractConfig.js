import EvaluationArtifact from './Evaluation.json';

// After `truffle migrate`, put the deployed address in .env.local:
//   REACT_APP_EVALUATION_ADDRESS=0x...
export const EVALUATION_ADDRESS = process.env.REACT_APP_EVALUATION_ADDRESS || '';
export const EVALUATION_ABI = EvaluationArtifact.abi;
export const MAX_MARKS = 240;

const NO_PREVIOUS = ['', 'no', 'none', 'nil', 'na', 'n/a', '-'];

// Builds the 12 answers in the order Evaluation.sol expects (see the comment in the contract).
export function buildEvaluationFields(formData) {
  const previous = (formData.previous || '').trim().toLowerCase();
  const caste = (formData.caste || '').trim().toUpperCase();
  return [
    formData.agriculture,
    formData.pl,
    formData.widow,
    formData.disabled,
    formData.disease,
    formData.unmarried,
    NO_PREVIOUS.includes(previous) ? 'no' : 'yes',
    caste === 'SC' || caste === 'ST' ? caste : 'OTHER',
    formData.government,
    formData.land,
    formData.water,
    formData.toilet,
  ].map((value) => (value ?? '').toString());
}
