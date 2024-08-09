const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, 'widget-server')));

const url = `http://localhost:${port}`;

app.get('/widget', (req, res) => {
  const { formState = {}, rewardId = '', imageSrc = '', poweredBy = '', pointer = '' } = req.query;

  let parsedFormState;
  try {
    parsedFormState = JSON.parse(formState);
  } catch (e) {
    parsedFormState = {};
  }

  console.log('formState', formState)

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
