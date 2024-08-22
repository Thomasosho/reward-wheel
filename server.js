const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, 'widget-server')));

const url = `http://localhost:${port}`;

app.get('/widget', (req, res) => {
  const {
    formState = '{}',
    rewardId = '',
    imageSrc = '',
    poweredBy = '',
    pointer = '',
    primaryColor = '',
    secondaryColor = '',
    textColor = '',
    selectedFont = '',
    isOnPageLoad = 'false',
    isOnExit = 'false',
    isOnClickTrigger = 'false',
    seconds = '0',
    days = '0',
    winTitle = '',
    winDescription = '',
    winPrimaryButton = '',
    winSecondaryButton = '',
    loseTitle = '',
    loseDescription = '',
    losePrimaryButton = '',
    loseSecondaryButton = '',
    isModalOpen = ''
  } = req.query;

  console.log('Received request with query params:', formState);
  let parsedFormState;
  try {
    parsedFormState = JSON.parse(formState);
  } catch (e) {
    parsedFormState = {};
  }

  console.log('formState', formState)

  console.log('rewardId', rewardId)

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${parsedFormState.nameOfReward} ${rewardId}</title>
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
</head>
<body>
  <div id="reward-widget"></div>
  <script src="${url}/public/static/widget/bundle.js"></script>
  <script>
    window.renderRewardWidget(
      {
        nameOfReward: '${parsedFormState.nameOfReward}',
        rewardOptions: ${JSON.stringify(parsedFormState.rewardOptions)},
        image: '${imageSrc}',
        poweredBy: '${poweredBy}',
        pointer: '${pointer}',
        primaryColor: '${primaryColor}',
        secondaryColor: '${secondaryColor}',
        textColor: '${textColor}',
        selectedFont: '${selectedFont}',
        isOnPageLoad: '${isOnPageLoad}',
        isOnExit: '${isOnExit}',
        isOnClickTrigger: '${isOnClickTrigger}',
        seconds: '${seconds}',
        days: '${days}',
        winTitle: '${winTitle}',
        winDescription: '${winDescription}',
        winPrimaryButton: '${winPrimaryButton}',
        winSecondaryButton: '${winSecondaryButton}',
        loseTitle: '${loseTitle}',
        loseDescription: '${loseDescription}',
        losePrimaryButton: '${losePrimaryButton}',
        loseSecondaryButton: '${loseSecondaryButton}',
        isOpen: '${isModalOpen}',
        rewardId: '${rewardId}',
      }, 
      'reward-widget'
    );
  </script>
</body>
</html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
