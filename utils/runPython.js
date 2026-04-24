export const runPythonPrediction = async (text) => {
  try {
    const response = await fetch(
      process.env.AI_API,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      }
    );

    if (!response.ok) {
      throw new Error(
        `AI API Error: ${response.status}`
      );
    }

    const data = await response.json();

    return data;

  } catch (error) {
    throw new Error(
      "Prediction Failed: " + error.message
    );
  }
};