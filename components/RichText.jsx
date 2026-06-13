// Shared rich text renderer — handles bold, italic, colour annotations, links
export default function RichText({ blocks, className }) {
  if (!blocks?.length) return null;

  function renderMark(child, keyPrefix) {
    let el = child.text;
    if (!el && el !== 0) return null;

    // Apply marks in order
    (child.marks || []).forEach((markKey) => {
      if (markKey === "strong") { el = <strong key={`s-${keyPrefix}`}>{el}</strong>; return; }
      if (markKey === "em")     { el = <em key={`e-${keyPrefix}`}>{el}</em>; return; }
    });

    return el;
  }

  function renderBlock(block, i) {
    // Resolve annotations from the markDefs array
    const markDefs = block.markDefs || [];

    const children = (block.children || []).map((child, j) => {
      let el = child.text || "";

      // Check if any mark key points to an annotation
      (child.marks || []).forEach((markKey) => {
        if (markKey === "strong") { el = <strong key={`${i}-${j}-s`}>{el}</strong>; return; }
        if (markKey === "em")     { el = <em key={`${i}-${j}-e`}>{el}</em>; return; }

        // Lookup in markDefs
        const def = markDefs.find((d) => d._key === markKey);
        if (!def) return;
        if (def._type === "colour") {
          const hex = def.customHex || def.hex;
          if (hex) { el = <span key={`${i}-${j}-c`} style={{ color: hex }}>{el}</span>; }
          return;
        }
        if (def._type === "link" && def.href) {
          el = <a key={`${i}-${j}-l`} href={def.href} target="_blank" rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}>{el}</a>;
          return;
        }
      });

      return <span key={`${i}-${j}`}>{el}</span>;
    });

    const style = block.style || "normal";
    if (style === "h2") return <h2 key={i}>{children}</h2>;
    if (style === "h3") return <h3 key={i}>{children}</h3>;
    if (style === "blockquote") return <blockquote key={i}>{children}</blockquote>;
    return <p key={i}>{children}</p>;
  }

  return (
    <div className={className || "prose"}>
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}
