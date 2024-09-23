// docs: https://github.dowjones.net/newsroom-innovation/capi-generator
//ai2html link: https://int-production-ai2html-admin.vir.onservo.com/project/10be3932-5fa8-4bb2-b49f-2c1f21c90234
const { CapiGenerator, Image } = require('capi-generator');

module.exports = async function () {
  const cg = new CapiGenerator();

  const image = new Image({
    photoUrl: 'https://www.wsj.com/ai2html/10be3932-5fa8-4bb2-b49f-2c1f21c90234/fallback_app.jpg',
    width: 600,
    height: 1358,
    alternate_text: '',
    credit: '',
    caption: '',
  });
  cg.addToBody(image);

  return cg;
};