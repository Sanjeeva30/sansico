// For components that need custom JSX around the text (e.g. splitting on "|" for
// an italic word) and so can't use <StyledText> directly. Returns plain text plus
// a style object with only the overrides Studio actually set.
export function getStyled(value) {
  if (value == null) return { text: "", style: {} };
  const isObj = typeof value === "object";
  const text = isObj ? (value.text || "") : value;
  const style = {};
  if (isObj && value.sizePx) style.fontSize = `${value.sizePx}px`;
  if (isObj && value.color) style.color = value.color;
  return { text, style };
}
