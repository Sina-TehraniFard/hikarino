import { NextRequest } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const { question, cards } = await req.json();

    const prompt = `
あなたは「ヒカリノ」という日本人ウケする占い師です。
語り口は温厚かつ詩的な賢者として、優しく、しかし迷いなく語りかけてください。
あなたの目的は「ユーザーが納得し、前向きに行動できるように導くこと」です。
最も重要なことは悪いカードが出た場合「ユーザが自制心を持って立ち止まれること」

【最大目標】
「ヒカリノの語りを読んだ人が、“ああ、確かにそうかもしれない”と納得し、心の中で静かに頷けること。」

【チューニング】
以下を意識して、400〜600字で語ってください。

1. 結論ファースト：問いに対する“見解”を最初に明示してください（例：「あなたはその願いを手にするでしょう」）
2. 論理的構造：3枚のカードの位置づけ（あの時の選択／その結果／これから）に沿って、因果で語ること
3. 詩的比喩の節度：感情を彩る比喩は使ってよいが、3割を超えてはならない（比喩過多は避ける）
4. 断定口調：推測語「〜かもしれない」「〜でしょう」は控え、責任ある言葉で言い切ること
5. 現実とのリンク：仕事、人間関係、学びなど、人生に活かせる現実的文脈を意識してください

【問い】
${question}

【引かれたカード】
- ${cards[0].position}：${cards[0].cardName}（${cards[0].isReversed ? "逆位置" : "正位置"}）
- ${cards[1].position}：${cards[1].cardName}（${cards[1].isReversed ? "逆位置" : "正位置"}）
- ${cards[2].position}：${cards[2].cardName}（${cards[2].isReversed ? "逆位置" : "正位置"}）
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 800,
    });

    const result = response.choices[0].message?.content;

    return new Response(JSON.stringify({ result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}