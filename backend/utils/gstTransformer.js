import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const PROMPT_TEMPLATE = `You are an assistant that prepares GST return JSON files for upload to the Indian GST portal.

You are given:
1. A business profile with its GST registration ID and return period.
2. A list of invoices for that period in a simple internal schema.

Your job:
- Transform this data into a JSON structure that is READY TO UPLOAD to the GST portal’s offline tool.
- The structure must contain at least the following keys:
  - "gstin": string
  - "ret_period": string in MMYYYY format
  - "b2b": array of B2B invoice groups by buyer GSTIN (ctin)
  - "b2cs": array of summary rows for small B2C invoices
- Each "b2b" entry must have:
  - "ctin": buyer GSTIN
  - "inv": array of invoices, where each invoice has:
    - "inum": invoice number (string)
    - "idt": invoice date in DD-MM-YYYY format
    - "val": invoice total value
    - "pos": place of supply code as string
    - "rchrg": "Y" or "N"
    - "itms": array of items, each item has:
      - "num": line item number
      - "itm_det": object with:
        - "txval": taxable value
        - "rt": tax rate in percent
        - "camt": CGST amount
        - "samt": SGST amount
        - "iamt": IGST amount
- The "b2cs" array must summarize eligible B2C invoices with:
  - "sply_ty": "INTRA" or "INTER"
  - "pos": place of supply code
  - "txval": taxable value total
  - "camt": CGST amount total
  - "samt": SGST amount total
  - "iamt": IGST amount total

Rules:
- Use ONLY the data given in the input. Do not invent invoices or GSTINs.
- Perform all necessary tax calculations using the provided taxable values and tax rates.
- Ensure that all numeric fields are valid numbers, and all required fields are present.
- The JSON must be syntactically valid and must strictly follow the key and nesting structure described above.

Output format:
- Return ONE JSON object only.
- Do NOT include any explanation, comments, notes, markdown, or additional text.
- The response must be parseable by a standard JSON parser on the first attempt.

Here is the input data you must transform (business profile and invoices):
{{INPUT_DATA_JSON}}`;

export const generateGSTReturnJSON = async (businessData, invoicesData) => {
    try {
        const inputData = {
            businessProfile: businessData,
            invoices: invoicesData
        };
        const inputStr = JSON.stringify(inputData, null, 2);
        const prompt = PROMPT_TEMPLATE.replace("{{INPUT_DATA_JSON}}", inputStr);

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or "gemini-pro"

        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();

        // Remove markdown formatting if present
        if (text.startsWith("\`\`\`json")) {
            text = text.substring(7);
        }
        if (text.startsWith("\`\`\`")) {
            text = text.substring(3);
        }
        if (text.endsWith("\`\`\`")) {
            text = text.substring(0, text.length - 3);
        }

        return JSON.parse(text.trim());
    } catch (error) {
        console.error("Error generating GST JSON with Gemini:", error);
        throw error;
    }
};
