// This example shows how to make a response using OoenAI API

if (
  secrets.apiKey == "" ||
  secrets.apiKey === "Your OpenAI API key (get a free one: https://platform.openai.com/)"
) {
  throw Error(
    "OPENAI _API_KEY environment variable not set for OpenAI API.  Get a free key from https://platform.openai.com/"
  )
}

// request message
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

// request body data
const body = JSON.stringify({
  messages,
  model: 'gpt-3.5-turbo',
});

// To make an HTTP request, use the Functions.makeHttpRequest function
// Functions.makeHttpRequest function parameters:
// - url
// - method (optional, defaults to 'GET')
// - headers: headers supplied as an object (optional)
// - params: URL query parameters supplied as an object (optional)
// - data: request body supplied as an object (optional)
// - timeout: maximum request duration in ms (optional, defaults to 10000ms)
// - responseType: expected response type (optional, defaults to 'json')

// Use multiple APIs & aggregate the results to enhance decentralization
const openAiRequest = Functions.makeHttpRequest({
  url: `https://api.openai.com/v1/chat/completions`,
  headers: { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ secrets.apiKey }`,
  },
  method: "POST",
  data: {
    'messages': [
      {
        role: 'user',
        content: `
          Please Generate an appropriate string of 50 characters.
        `,
      },
    ],
    model: 'gpt-3.5-turbo',
  },
  timeout: 9000
})


// First, execute all the API requests are executed concurrently, then wait for the responses
const res = await openAiRequest;

var result;

if (!res.error) {
  console.log("API Call Success!!");
  //console.log("data:", res);

  data = JSON.parse(JSON.stringify(res))
  // console.log("data:", data)
  // console.log("choices data:", JSON.stringify(data.data.choices[0]))
  result = data.data.choices[0].message.content;
} else {
  console.log("OpenAI API call Error");
  console.error("error", res)
}

// The source code MUST return a Buffer or the request will return an error message
// Use one of the following functions to convert to a Buffer representing the response bytes that are returned to the client smart contract:
// - Functions.encodeUint256
// - Functions.encodeInt256
// - Functions.encodeString
// Or return a custom Buffer for a custom byte encoding
return Functions.encodeString(result)
