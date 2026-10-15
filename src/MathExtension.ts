import { Node, InputRule } from '@tiptap/core';
import type { Node as PMNode } from '@tiptap/pm/model';
import katex from 'katex';
import './math.css';

/* قاعدة markdown-it: تحوّل $...$ و $$...$$ إلى عنصر معادلة عند تحميل المستند */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mathRule(state: any, silent: boolean) {
  const src: string = state.src;
  const pos: number = state.pos;
  if (src.charCodeAt(pos) !== 0x24) return false; // ليس $

  const display = src.startsWith('$$', pos);
  const delim = display ? '$$' : '$';
  const start = pos + delim.length;
  const end = src.indexOf(delim, start);
  if (end === -1) return false;

  const latex = src.slice(start, end);
  if (!latex.trim() || latex.includes('\n')) return false;
  // يمنع تحويل نصوص مثل: "$5 و $10"
  if (!display && (/\s/.test(latex[0]) || /\s/.test(latex[latex.length - 1]))) return false;

  if (!silent) {
    const token = state.push('math_inline', '', 0);
    token.content = latex;
    token.markup = delim;
  }
  state.pos = end + delim.length;
  return true;
}

export const MathNode = Node.create({
  name: 'math',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      latex: { default: '' },
      display: { default: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="math"]',
        getAttrs: (el) => {
          const e = el as HTMLElement;
          return {
            latex: e.getAttribute('data-latex') ?? '',
            display: e.getAttribute('data-display') === 'true',
          };
        },
      },
    ];
  },

  renderHTML({ node }) {
    return [
      'span',
      {
        'data-type': 'math',
        'data-latex': node.attrs.latex,
        'data-display': String(node.attrs.display),
      },
    ];
  },

  /* العرض داخل المحرر + تعديل المعادلة بالنقر عليها */
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement('span');
      dom.className = 'math-node';
      dom.contentEditable = 'false';
      let current: PMNode = node;

      const render = (n: PMNode) => {
        dom.classList.toggle('display', !!n.attrs.display);
        try {
          katex.render(n.attrs.latex, dom, {
            throwOnError: false,
            displayMode: !!n.attrs.display,
          });
        } catch {
          dom.textContent = n.attrs.latex;
        }
      };
      render(node);

      dom.addEventListener('click', () => {
        if (!editor.isEditable) return;
        const pos = getPos();
        if (typeof pos !== 'number') return;
        const next = window.prompt('عدّل المعادلة (LaTeX) — اتركها فارغة للحذف:', current.attrs.latex);
        if (next === null) return;
        if (next.trim() === '') {
          editor.chain().focus().deleteRange({ from: pos, to: pos + current.nodeSize }).run();
        } else {
          editor.view.dispatch(
            editor.view.state.tr.setNodeMarkup(pos, undefined, { ...current.attrs, latex: next.trim() }),
          );
        }
      });

      return {
        dom,
        update(updated: PMNode) {
          if (updated.type !== current.type) return false;
          current = updated;
          render(updated);
          return true;
        },
      };
    };
  },

  /* الكتابة: $x^2$ أو $$x^2$$ تتحول فوراً إلى معادلة */
  addInputRules() {
    const type = this.type;
    const make = (find: RegExp, display: boolean) =>
      new InputRule({
        find,
        handler: ({ state, range, match }) => {
          const lead = match[1].length; // المسافة قبل $ إن وجدت
          state.tr.replaceWith(range.from + lead, range.to, type.create({ latex: match[2], display }));
        },
      });

    return [
      make(/(^|\s)\$\$([^$\n]+)\$\$$/, true),
      make(/(^|\s)\$([^$\s](?:[^$\n]*[^$\s])?)\$$/, false),
    ];
  },

  /* الربط مع tiptap-markdown: الحفظ والتحميل */
  addStorage() {
    return {
      markdown: {
        serialize(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state: any,
          node: PMNode,
        ) {
          const d = node.attrs.display ? '$$' : '$';
          state.write(`${d}${node.attrs.latex}${d}`);
        },
        parse: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setup(md: any) {
            md.inline.ruler.before('escape', 'math_inline', mathRule);
            md.renderer.rules.math_inline = (tokens: any[], idx: number) => {
              const t = tokens[idx];
              return `<span data-type="math" data-latex="${md.utils.escapeHtml(t.content)}" data-display="${t.markup === '$$'}"></span>`;
            };
          },
        },
      },
    };
  },
});