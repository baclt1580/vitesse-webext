
let treeWalker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT)
while (treeWalker.nextNode()) {
  const node = treeWalker.currentNode as Text;
  if(node.textContent&&!isAllWhitespace(node.textContent)){
      
  }
}
function isAllWhitespace(text:string) {
  // 使用正则表达式匹配空白字符
  return /^\s*$/.test(text);
}