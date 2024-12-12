import { ChatOpenAI } from "@langchain/openai";

export const analyze = async (entry: string) => {
  const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
    temperature: 0.5,
  });

  const response = await chatModel.invoke(entry);
  const parsedContent = JSON.parse(response.content as string);
  console.log(parsedContent);
};

// const prompt = `Voy a darte una entrada de diario. Quiero que analices la entrada y me devuelvas los siguientes datos en formato JSON: 
// - Estado de ánimo: el estado de ánimo predominante en la entrada.
// - Resumen: un breve resumen de la entrada.
// - Tema principal: el tema principal de la entrada.
// - Color que represente el estado de ánimo: un color que simbolice el estado de ánimo.
// - Análisis positivo: un booleano que indique si el análisis es positivo (true) o negativo (false).

// El formato JSON debe ser exactamente como este:
// {
//   "estado_de_animo": "feliz",
//   "resumen": "Hoy tuve un día increíble lleno de aventuras.",
//   "tema_principal": "aventuras",
//   "color": "amarillo",
//   "analisis_positivo": true
// }

// Por favor, responde solo con el JSON y nada más. Entrada de diario: ${entry}`