const { parseSync } = require('@babel/core');


function transformExtension(filepath, extMapping) {
  if(!filepath.startsWith('./') && !filepath.startsWith('../')) {
    // Package import
    return filepath;
  }

  const idx = filepath.lastIndexOf('.');
  if(idx === -1 || filepath.includes('/', idx)) {
    // No extension
    const newExt = extMapping[''];
    if(newExt) {
      return filepath + newExt;
    }
    return filepath;
  }

  for(let [origExt, newExt] of Object.entries(extMapping).sort(
    (a, b) => b[0].length - a[0].length
  )) {
    if(filepath.endsWith(origExt)) {
      return filepath.slice(0, -origExt.length) + newExt;
    }
  }
  return filepath;
}
const astTransformExtension = parseSync(
  `(${transformExtension.toString()})`, { filename: '' }
).program.body[0].expression;


function getOption(state, key) {
  const opts = state.opts || {};
  return opts[key];
}

export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const extMapping = getOption(state, 'extMapping');
        if(!extMapping) {
          return;
        }
        const source = path.node.source;

        source.value = transformExtension(source.value, extMapping);
      },
      // For re-exporting
      'ExportNamedDeclaration|ExportAllDeclaration'(path, state) {
        const extMapping = getOption(state, 'extMapping');
        if(!extMapping) {
          return;
        }
        const source = path.node.source;
        if(source == null) {
          return;
        }

        source.value = transformExtension(source.value, extMapping);
      },
      // For dynamic import
      CallExpression(path, state) {
        // TODO: Implement dynamic import

        const opts = state.opts || {};
        const extMapping = opts.extMapping;
        if(!extMapping) {
          return;
        }
        if(!path.node.callee || path.node.callee.type !== 'Import') {
          return;
        }

        const astExtMapping = t.objectExpression(
          Object.entries(extMapping).map(x => t.objectProperty(
            t.stringLiteral(x[0]), t.stringLiteral(x[1])
          ))
        );

        const argument = path.get('arguments.0');
        argument.replaceWith(t.callExpression(
          astTransformExtension, [argument.node, astExtMapping]
        ));
      },
    },
  };
}