type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function classList(node: HastNode): string[] {
  const value = node.properties?.className;
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') return value.split(/\s+/);
  return [];
}

export function rehypeWrapTables() {
  return (tree: HastNode) => {
    wrapTables(tree);
  };
}

function wrapTables(node: HastNode) {
  if (!node.children) return;
  if (!classList(node).includes('table-wrap')) {
    node.children = node.children.map((child) => {
      if (child?.type === 'element' && child.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrap'], tabIndex: 0 },
          children: [child],
        };
      }
      return child;
    });
  }
  for (const child of node.children) {
    if (child?.type === 'element') wrapTables(child);
  }
}

export function rehypeExternalLinks(hosts: string[] = []) {
  const sponsored = new Set(hosts.map((host) => host.toLowerCase().replace(/^www\./, '')));

  return (tree: HastNode) => {
    visit(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return;

      let hostname = '';
      try {
        hostname = new URL(href).hostname.toLowerCase().replace(/^www\./, '');
      } catch {
        return;
      }

      const rel = new Set(['noopener', 'noreferrer']);
      const isSponsored = [...sponsored].some((host) => hostname === host || hostname.endsWith(`.${host}`));
      if (isSponsored) rel.add('sponsored');
      node.properties = node.properties ?? {};
      node.properties.target = '_blank';
      node.properties.rel = [...rel].join(' ');

      node.children = node.children ?? [];
      const alreadyNoted = node.children.some(
        (child) => child.type === 'element' && child.tagName === 'span' && classList(child).includes('sr-only'),
      );
      if (!alreadyNoted) {
        node.children.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['sr-only'] },
          children: [{ type: 'text', value: ' (opens in a new tab)' }],
        });
      }
    });
  };
}

function visit(node: HastNode, fn: (node: HastNode) => void) {
  fn(node);
  if (!node.children) return;
  for (const child of node.children) {
    if (child?.type === 'element') visit(child, fn);
  }
}
