// chatBotController.js

const API_URL = "http://localhost:8000";

export const chatBotController = async ({ message, sessionId }) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      // sesuaikan endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        session_id: sessionId || null,
      }),
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
    console.error("Chat API Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};
