// Run automatically by `npm run deploy` after `truffle migrate`.
// Copies the fresh ABI into src/ and writes the deployed address to .env.local,
// so the React app always talks to the contract that was just deployed.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const artifact = require(path.join(root, 'build', 'contracts', 'Evaluation.json'));
const networkIds = Object.keys(artifact.networks || {});
if (networkIds.length === 0) {
  console.error('Evaluation has not been deployed yet. Run `npm run chain`, then `npm run deploy`.');
  process.exit(1);
}
const address = artifact.networks[networkIds[networkIds.length - 1]].address;

fs.writeFileSync(
  path.join(root, 'src', 'Evaluation.json'),
  JSON.stringify({ contractName: 'Evaluation', abi: artifact.abi, networks: {} }, null, 2) + '\n'
);

const envPath = path.join(root, '.env.local');
const lines = fs.existsSync(envPath)
  ? fs.readFileSync(envPath, 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('REACT_APP_EVALUATION_ADDRESS='))
  : [];
lines.push(`REACT_APP_EVALUATION_ADDRESS=${address}`);
fs.writeFileSync(envPath, lines.join('\n') + '\n');

console.log(`Evaluation deployed at ${address}. Updated src/Evaluation.json and .env.local.`);
console.log('Restart `npm start` so React picks up the new address.');
