import b4a from 'b4a';
import logUpdate from 'log-update';
import SDK, { SlashURL } from '@synonymdev/slashtags-sdk';
import RAM from 'random-access-memory'

console.log('Setting up slashtag...');
const sdk = new SDK({
  storage: RAM,
  primaryKey: b4a.from('a'.repeat(64), 'hex'),
});

const peer1 = sdk.slashtag('peer1');
// console.log(peer1)
await peer1.ready()
await peer1.coreData.create('/trades-feed/latest-trade', b4a.from(''));

const FILE_PATH = '/trades-feed/latest-trade'

console.log(`Serving feed ${await peer1.coreData.createURL(FILE_PATH)}\n`);

await write()
// setInterval(write, 500);

function write() {
  const HOPDML = {
    nxp: Math.random(),
    pow: Math.ceil(60000 + Math.random() * 60000),
    type: Math.random() > 0.5 ? 'Genesis' : 'Update',
  };
  const dmlString = JSON.stringify(HOPDML, null, 2);
  logUpdate('Latest trade:', dmlString);

  return peer1.coreData.update(FILE_PATH, b4a.from(dmlString));
}