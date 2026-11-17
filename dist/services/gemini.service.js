import { GoogleGenAI } from "@google/genai";
import { InvoiceExtractionSchema } from "../schemas/extraction.schema.js";
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
//Extraction function that takes invoice text and returns structured data
export async function extractInvoice(invoiceText) {
    const interaction = await retry(() => ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        system_instruction: `
    You are an invoice data extraction assistant.

    Extract the following fields:
    - invoice_number
    - vendor
    - date
    - subtotal
    - tax
    - total

    Do not invent missing values.
    Return numeric values as numbers, not strings.
    Return only valid JSON matching the requested structure.
    `,
        input: invoiceText,
        response_format: {
            type: "text",
            mime_type: "application/json",
        },
    }), 4);
    if (interaction.output_text === undefined) {
        throw new Error("No output text received from the AI interaction.");
    }
    const usage = interaction.usage;
    const extractedData = JSON.parse(interaction.output_text);
    const validatedData = InvoiceExtractionSchema.parse(extractedData);
    if (usage) {
        const cost = calculateCost(usage.total_input_tokens ?? 0, usage.total_output_tokens ?? 0);
        console.log("Token Usage:", usage);
        console.log("Extraction Cost: $", cost.toFixed(8));
    }
    return validatedData;
}
// Retry function to handle transient errors with exponential backoff
async function retry(fn, attempts) {
    for (let i = 1; i <= attempts; i++) {
        try {
            const result = await fn();
            return result;
        }
        catch (error) {
            if (i === attempts || !isRetryable(error)) {
                throw error;
            }
            const delay = 1000 * Math.pow(2, i - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Retry failed");
}
// Retry function to determine if an error is retryable based on its status code
function isRetryable(error) {
    if (typeof error !== "object" || error === null) {
        return false;
    }
    if (!("status" in error)) {
        return false;
    }
    const status = error.status;
    if (typeof status !== "number") {
        return false;
    }
    return [429, 500, 502, 503, 504].includes(status);
}
const PRICING = {
    input: 1, // USD per 1 million tokens
    output: 2, // USD per 1 million tokens
};
// Placeholder rates. Replace with verified model pricing
// before treating this estimate as a real cost.
function calculateCost(inputTokens, outputTokens) {
    const inputCost = (inputTokens * PRICING.input) / 1_000_000;
    const outputCost = (outputTokens * PRICING.output) / 1_000_000;
    return inputCost + outputCost;
}
