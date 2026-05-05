// chatBotController.js

const API_URL = "http://localhost:8000/chat"

export const chatBotController = async ({ message }) => {
  try {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "API Error");
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Prediction API Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};