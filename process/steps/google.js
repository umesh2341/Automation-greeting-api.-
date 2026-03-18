import services from '../config.js';

const {geminiAI}=services;

async function main() {
    const response = await geminiAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "hi, this is test message that you are woking",
  });
  console.log(response.text);
}

main();