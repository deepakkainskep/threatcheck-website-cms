import React from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Heading,
  AlignLeft,
  List,
  Image as ImageIcon,
  Quote,
  Link as LinkIcon,
  AlertTriangle,
} from "lucide-react";
import { ContentBlock } from "../../types";

interface BlockEditorProps {
  value: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const blockTypes = [
  { type: "heading", label: "Heading", icon: Heading },
  { type: "paragraph", label: "Paragraph", icon: AlignLeft },
  { type: "list", label: "List", icon: List },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "quote", label: "Quote", icon: Quote },
  { type: "link", label: "Link", icon: LinkIcon },
  { type: "callout", label: "Callout", icon: AlertTriangle },
] as const;

export const BlockEditor: React.FC<BlockEditorProps> = ({ value = [], onChange }) => {
  const updateBlock = (index: number, patch: Partial<ContentBlock>) => {
    const updated = value.map((b, i) => (i === index ? { ...b, ...patch } : b));
    onChange(updated);
  };

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      type,
      level: type === "heading" ? 2 : undefined,
      text: "",
      items: type === "list" ? [""] : undefined,
    };
    onChange([...value, newBlock]);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= value.length) return;
    const clone = [...value];
    const temp = clone[index];
    clone[index] = clone[targetIndex];
    clone[targetIndex] = temp;
    onChange(clone);
  };

  const removeBlock = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="blockEditor">
      <div className="blockToolBar">
        <span style={{ fontSize: "12px", color: "var(--text-muted)", alignSelf: "center", marginRight: "6px" }}>
          Add Block:
        </span>
        {blockTypes.map(({ type, label, icon: Icon }) => (
          <button
            type="button"
            key={type}
            onClick={() => addBlock(type as ContentBlock["type"])}
            className="btnSecondary"
            style={{ padding: "5px 10px" }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {value.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)", border: "1px dashed var(--border-subtle)", borderRadius: "8px" }}>
          No content blocks added yet. Click a block button above to begin building article content.
        </div>
      )}

      {value.map((b, i) => (
        <div key={i} className="blockCard">
          <div className="blockHeader">
            <span>
              Block {i + 1}: {b.type}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                type="button"
                className="iconBtn"
                onClick={() => moveBlock(i, -1)}
                disabled={i === 0}
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="iconBtn"
                onClick={() => moveBlock(i, 1)}
                disabled={i === value.length - 1}
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                className="iconBtn"
                style={{ color: "#EF4444" }}
                onClick={() => removeBlock(i)}
                title="Delete Block"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {b.type === "heading" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <select
                value={b.level || 2}
                onChange={(e) => updateBlock(i, { level: Number(e.target.value) })}
                style={{ width: "90px" }}
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
              <input
                placeholder="Heading text"
                value={b.text || ""}
                onChange={(e) => updateBlock(i, { text: e.target.value })}
              />
            </div>
          )}

          {b.type === "paragraph" && (
            <textarea
              placeholder="Paragraph text..."
              value={b.text || ""}
              onChange={(e) => updateBlock(i, { text: e.target.value })}
            />
          )}

          {b.type === "list" && (
            <textarea
              placeholder="List items (one item per line)"
              value={(b.items || []).join("\n")}
              onChange={(e) => updateBlock(i, { items: e.target.value.split("\n") })}
            />
          )}

          {(b.type === "quote" || b.type === "callout") && (
            <textarea
              placeholder={b.type === "quote" ? "Quote text..." : "Callout highlight text..."}
              value={b.text || ""}
              onChange={(e) => updateBlock(i, { text: e.target.value })}
            />
          )}

          {(b.type === "image" || b.type === "link") && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <input
                placeholder={b.type === "image" ? "Image Alt text / Title" : "Link Anchor text"}
                value={b.text || b.title || ""}
                onChange={(e) => updateBlock(i, { text: e.target.value })}
              />
              <input
                placeholder={b.type === "image" ? "Image URL (e.g. /uploads/media/...)" : "Target URL"}
                value={b.url || ""}
                onChange={(e) => updateBlock(i, { url: e.target.value })}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
