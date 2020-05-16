/* eslint-disable no-console */
const Aki = require('../index');

const regions = ['en', 'en_object', 'en_animals',
  'ar', 'cn', 'de', 'de_animals', 'es', 'es_animals', 'fr', 'fr_objects', 'fr_animals',
  'il', 'it', 'it_animals', 'jp', 'jp_animals', 'kr', 'nl', 'pl', 'pt', 'ru', 'tr'];

const testGame = async (region) => {
  console.log(`REGION: ${region} STARTING`);

  const aki = new Aki(region);

  await aki.start();
  console.log('start:', aki.question, aki.progress);

  await aki.step(0);
  console.log('step:', aki.currentStep, aki.question, aki.progress);

  await aki.back();
  console.log('step:', aki.currentStep, aki.question, aki.progress);

  while (aki.progress <= 50 && aki.currentStep < 15) {
    await aki.step(Math.floor(Math.random() * 2));
    console.log('step:', aki.currentStep, aki.question, aki.progress);
  }

  await aki.win();
  console.log('win:', aki.question, aki.answers);
};

(async () => {
  for (let i = 0; i < regions.length; i += 1) {
    const r = regions[i];
    try {
      await testGame(r);
      console.log(i + 1, 'test passed', r);
    } catch (error) {
      console.error(error);
      console.error(i + 1, 'TEST FAILED', r);
    }
  }
})();
