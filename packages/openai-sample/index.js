const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

// 入力データ
const messages = [
  {
    role: 'user',
    content: `
      入力に書かれたsolidityのコードを生成してください。

      #入力
      ERC-721のNFTを発行するコード
      
      #出力
      `,
  },
];

/**
 * main function
 * @param {*} messages 入力値
 * @returns 
 */
const main = async (messages) => {
  const body = JSON.stringify({
    messages,
    model: 'gpt-3.5-turbo',
  });

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  const data = await res.json();
  console.log(data);
  const choice = 0;
  return data.choices[choice].message;
};

main(messages).then(res => {
  console.log('出力結果:', res ? res.content : '', 'END');
});