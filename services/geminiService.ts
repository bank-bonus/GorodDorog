import { GoogleGenAI } from "@google/genai";
import { Resources } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCityAdvice = async (resources: Resources, totalBuildings: number): Promise<string> => {
  try {
    const prompt = `
      Ты - саркастичный и умный советник мэра в игре про строительство города.
      Текущая статистика города:
      - Население: ${resources.population} / ${resources.maxPopulation}
      - Деньги: ${resources.money}
      - Материалы: ${resources.materials}
      - Энергия: ${resources.energy}
      - Всего зданий: ${totalBuildings}
      
      На основе этих данных придумай ОДИН короткий новостной заголовок (максимум 15 слов) для местной газеты.
      Он должен быть либо смешным, либо тревожным (если ресурсы на исходе), либо хвалебным.
      Отвечай только текстом заголовка на русском языке.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("AI Error:", error);
    return "Связь с центром советников потеряна... (Проверьте API ключ)";
  }
};