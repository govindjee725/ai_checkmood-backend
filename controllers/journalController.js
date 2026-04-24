import Journal from "../models/Journal.js";
import { runPythonPrediction } from "../utils/runPython.js";

// -----------------------------------
// Analyze Mood + Problem + Response
// -----------------------------------
export const analyzeMood = async (req, res) => {
  try {
    const { text } = req.body;

    // Validation
    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Text is required"
      });
    }

    // Run Python AI Model
    const result = await runPythonPrediction(text);

    // Save MongoDB
    const saved = await Journal.create({
      text: text.trim(),

      // Existing
      mood: result.mood,
      score: result.score,

      // New Fields
      emotion: result.emotion,
      problem: result.problem,
      problemConfidence: result.problemConfidence,
      response: result.response
    });

    // Response
    res.status(201).json({
      success: true,
      message: "AI analysis completed successfully",
      data: saved
    });

  } catch (error) {
    console.error("Analyze Error:", error);

    res.status(500).json({
      success: false,
      message: "Prediction failed",
      error: error.toString()
    });
  }
};

// -----------------------------------
// Get Full History
// -----------------------------------
export const getHistory = async (req, res) => {
  try {
    const journals = await Journal.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: journals.length,
      data: journals
    });

  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history"
    });
  }
};

// -----------------------------------
// Delete Entry
// -----------------------------------
export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Journal.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Entry not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    console.error("Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
};