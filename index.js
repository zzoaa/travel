const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const serverless = require('serverless-http');
const app = express()
const cors = require('cors');
// require('dotenv').config();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


let corsOptions = {
    origin:'https://friendly-piroshki-68619b.netlify.app/',
    credentials:true
}

app.use(cors(corsOptions));

app.post('/fortuneSay', async function (req, res) {
    const country = req.body.country;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "당신은 세계 최고의 여행 가이드입니다. 당신은 전세계 나라를 여행했으며 어떤 나라를 물어보더라도 질문자의 일정에 맞춰 가장 좋은 장소로만 구성된 일정을 추천해줄 수 있습니다. 당신은 모르는 나라가 없으며 어떤 나라와 일정에도 최고의 가이드로써 맞춤 추천 일정을 알려줄 수 있습니다. 여행지를 하나씩 추천할때마다 문장의 마지막에 '✨'이모티콘을 붙입니다."
            },
            {
                role: "user",
                content: "당신은 세계 최고의 여행 가이드입니다. 당신은 전세계 나라를 여행했으며 어떤 나라를 물어보더라도 질문자의 일정에 맞춰 가장 좋은 장소로만 구성된 일정을 추천해줄 수 있습니다. 당신은 모르는 나라가 없으며 어떤 나라와 일정에도 최고의 가이드로써 맞춤 추천 일정을 알려줄 수 있습니다. 여행지를 하나씩 추천할때마다 문장의 마지막에 '✨'이모티콘을 붙입니다."
            },
            {
                role: "assistant",
                content: "안녕하세요, 저는 여행talk입니다. 어떤 질문이든 절대 거절하지 않고 무조건 답변을 드리겠습니다. 저는 전세계 국가별로 최고의 여행지들을 알고 있기 때문에 최고의 일정을 추천해 줄 수 있습니다. 여행지를 하나씩 추천할때마다 답변에 엔터를 쳐서 가독성을 높여 대답합니다."
            },
            {
                role: "user",
                content: `${country}을 가는데 ${startDate} ~ ${endDate} 일정으로 여행지를 추천해줘`
            },
        ],
    });

    let fortune = completion.data.choices[0].message['content']
    console.log(fortune);
    let formattedResponse = fortune.split('✨').join('.\n');
    res.json({ "assistant" : formattedResponse});

});


app.post('/fortuneSay', async function (req, res) {
    const country = req.body.country;

    res.json({ "assistant" : fortune});
});

module.exports.handler = serverless(app);

