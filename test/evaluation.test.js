// Run with: npm run chain   (in one terminal)
//           npx truffle test --network development
const Evaluation = artifacts.require('Evaluation');

// Order: agriculture, pl, widow, disabled, disease, unmarried, previous, caste, government, land, water, toilet
const NEEDIEST = ['yes', 'BPL', 'yes', 'yes', 'yes', 'yes', 'no', 'SC', 'no', 'no', 'public', 'no'];
const LEAST_NEEDY = ['no', 'APL', 'no', 'no', 'no', 'no', 'yes', 'OTHER', 'yes', 'yes', 'private', 'yes'];

contract('Evaluation', (accounts) => {
  const [owner, stranger] = accounts;
  let ev;

  beforeEach(async () => {
    ev = await Evaluation.new({ from: owner });
  });

  it('gives full marks to the neediest answers and zero to the least needy', async () => {
    const high = await ev.calculateMarks(NEEDIEST);
    const low = await ev.calculateMarks(LEAST_NEEDY);
    assert.equal(high[1].toString(), '240');
    assert.equal(low[1].toString(), '0');
  });

  it('does not reward empty answers (old isInteger("") bug)', async () => {
    const res = await ev.calculateMarks(Array(12).fill(''));
    assert.equal(res[1].toString(), '0');
  });

  it('accepts ST as well as SC for the caste field', async () => {
    const fields = [...LEAST_NEEDY];
    fields[7] = 'ST';
    assert.equal((await ev.calculateMarks(fields))[1].toString(), '20');
  });

  it('computes marks on-chain when adding an applicant', async () => {
    await ev.addApplicant('A', 9000000001, 'addr', 'Life mission', 1, 1, NEEDIEST, { from: owner });
    const a = await ev.applicants(0);
    assert.equal(a.marks_scored.toString(), '240');
  });

  it('only lets the owner add applicants', async () => {
    try {
      await ev.addApplicant('A', 9000000001, 'addr', 'Life mission', 1, 1, NEEDIEST, { from: stranger });
      assert.fail('stranger was allowed to add an applicant');
    } catch (e) {
      assert.include(e.message, 'caller is not the owner');
    }
  });

  it('rejects the same person twice for the same scheme', async () => {
    await ev.addApplicant('A', 9000000001, 'addr', 'Life mission', 1, 1, NEEDIEST, { from: owner });
    try {
      await ev.addApplicant('A', 9000000001, 'addr', 'Life mission', 1, 1, NEEDIEST, { from: owner });
      assert.fail('duplicate was accepted');
    } catch (e) {
      assert.include(e.message, 'already added');
    }
    // Same person, different scheme is fine
    await ev.addApplicant('A', 9000000001, 'addr', 'Home renovation', 1, 1, NEEDIEST, { from: owner });
    assert.equal((await ev.getApplicantsLength()).toString(), '2');
  });

  it('keeps applicants sorted by marks, highest first', async () => {
    const mid = [...LEAST_NEEDY];
    mid[0] = 'yes'; mid[1] = 'BPL'; // 40 marks
    await ev.addApplicant('Low', 1, 'a', 'S', 1, 1, LEAST_NEEDY, { from: owner });
    await ev.addApplicant('High', 2, 'a', 'S', 1, 1, NEEDIEST, { from: owner });
    await ev.addApplicant('Mid', 3, 'a', 'S', 1, 1, mid, { from: owner });
    const list = await ev.getApplicants();
    assert.deepEqual(list.map((x) => x.name), ['High', 'Mid', 'Low']);
  });
});
