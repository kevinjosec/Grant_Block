# Grant Block

Grant distribution portal for Kerala panchayats.

- **Citizens** sign up, pick a scheme and submit an application with PDF documents.
  The application is encrypted and stored on IPFS; Firestore only keeps its CID.
- **Government officers (V.E.O.)** open/close schemes, review applications, score them
  with the `Evaluation` smart contract, approve or reject, and publish the beneficiary list.

| Piece | What it does |
|---|---|
| React app (`src/`) | All UI. Citizen pages and officer pages (`/Gov*`, `/Applicant*`). |
| Firebase Auth | Logins. An officer is any account with a document at `admins/{uid}`. |
| Firestore | Profiles (`users`), pending applications (`applicantForm`), counters (`scheme`), the open/closed flag (`schemeActivation`), published results (`notification`). Access rules: `firestore.rules`. |
| IPFS (local daemon) | Stores the encrypted application JSON + PDFs. |
| `contracts/Evaluation.sol` | Scores the 12 answers (max 240) and keeps approved applicants sorted on-chain. Only the deploying account can add applicants. |

## Running it locally

You need Node.js, [IPFS Kubo](https://docs.ipfs.tech/install/command-line/) and the MetaMask browser extension.

```bash
npm install                 # first time only

# terminal 1: local blockchain (data persists in .ganache-db/)
npm run chain

# terminal 2: deploy the contract (first time, or after changing Evaluation.sol)
npm run deploy              # also writes the address to .env.local

# terminal 3: IPFS
ipfs daemon

# terminal 4: the website
npm start                   # http://localhost:3000
```

### MetaMask (officer only)
1. Add network: RPC `http://127.0.0.1:8545`, chain ID `1337`, symbol `ETH`.
2. Import account with the private key printed as `(0)` under "Private Keys" when `npm run chain` starts.
   This is the account that deployed the contract, so it is the only one allowed to approve applicants.
   (It is a well-known local test key: never send real funds to it.)

### Making someone an officer
1. Let them sign up normally on the site.
2. Firebase console → Authentication → copy their **User UID**.
3. Firestore → start collection `admins` → document ID = that UID → any field (e.g. `role: "veo"`).

### Firestore rules
```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules --project grant-block
```

### Tests
```bash
npm run chain                                   # if not already running
npx truffle test --network development          # contract tests
```
