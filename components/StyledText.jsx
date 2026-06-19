// Renders a field that may be either a plain string (legacy/unmigrated content)
// or a { text, sizePx, color } object from Studio's new styled-text fields.
// Unset sizePx/color fall through to whatever className/style the caller already uses,
// so pages keep their normal design by default — only explicit Studio choices override it.
export default function StyledText({ value, as: Tag = "span", className, style, fallback = null }) {
  if (value == null || value === "") return fallback;
  const isObj = typeof value === "object";
  const text = isObj ? value.text : value;
  if (!text) return fallback;

  const override = {};
  if (isObj && value.sizePx) override.fontSize = `${value.sizePx}px`;
  if (isObj && value.color) override.color = value.color;

  return (
    <Tag className={className} style={{ ...style, ...override }}>
      {text}
    </Tag>
  );
}
