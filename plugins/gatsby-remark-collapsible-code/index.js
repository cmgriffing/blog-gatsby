module.exports = async (tree, pluginOptions) => {
  const { visit } = await import("unist-util-visit")
  const { nanoid } = await import("nanoid")
  visit(tree.markdownAST, "html", node => {
    const isCodeBlock = node.value.indexOf("gatsby-highlight") > -1
    if (!isCodeBlock) {
      return tree
    }

    const lineCount = Array.from(node.value.matchAll(new RegExp("\\n", "g")))
      .length

    if (lineCount > 30) {
      const uniqueId = nanoid()
      const html = `
        <div class="collapsible-code-block" data-length="${lineCount}">
          <input type="checkbox" class="sr-only collapsible-code-checkbox"
          id="collapsible-code-checkbox-${uniqueId}" name="collapsible-code-checkbox-${uniqueId}" />
          <div class="collapsible-code">
            ${node.value}
          </div>
          <label class="collapsible-code-toggle" for="collapsible-code-checkbox-${uniqueId}">
            <span class="collapsible-code-toggle-show">Show More ▾</span>
            <span class="collapsible-code-toggle-hide">Show Less ▴</span>
          </label>
        </div>
      `
      node.value = html
    }
  })

  return tree
}
