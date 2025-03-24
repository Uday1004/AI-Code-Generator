const cleanGeneratedCode = (rawCode) => {
  // Remove text before and after the code block
  let cleaned = rawCode.replace(/```jsx|```javascript|```/g, "").trim();

  // Handle cases where Gemini wraps the output in quotes
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.slice(1, -1);
  }

  return cleaned;
};
export default cleanGeneratedCode;
