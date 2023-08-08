var  selectedElement;
var selectedElementStack = [];
//2023-8-17reco
//  歪打正着。之前这两个事件，一个忘了addEventListener前面加的document，
// 结果在chrome扩展内反而可以挂接，而加了document的却不行。因为这点差异，
// 我就去掉document，发现两个都可以挂接了。
/*
Interest Points

1. 如何创建内容脚本？Chrome extension - Content Script
2. 差别在何处？document.addEventListener vs. addEventListener.
Difference between document.addEventListener and window.addEventListener?
https://stackoverflow.com/questions/12045440/difference-between-document-addeventlistener-and-window-addeventlistener
3. 如何注入css和js到当前内容内？
4. 如何创建后台脚本？ service work script - background script
5. 如何添加和删除class？

Offical guide : https://developer.chrome.com/docs/extensions/

*/
function copyDivToClipboard(element) {
    var range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}
addEventListener("keypress", (e) => {
    // console.log(e.key)
    if(e.key == 1){
      if(!selectedElement)return;
      // console.log(2)
      let element = selectedElement.parentElement
      if(!element)return;
      // console.log(3)
      if (element == selectedElement)return ;
      // console.log(4)
      if (selectedElement){
        selectedElement.classList.remove('selected')
      }
      element.classList.add('selected')
      selectedElementStack.push(selectedElement)
      selectedElement = element
    }else if (e.key == 2){
      console.log(2)
      if(selectedElementStack.length == 0 )return ;
      console.log(3)
      if (selectedElement){
        selectedElement.classList.remove('selected')
      }
      element = selectedElementStack.pop()
      element.classList.add('selected')
      selectedElement = element
    }else if (e.key == 0){
      console.log(2)
      if(selectedElementStack.length == 0 )selectedElementStack = [] ;
      console.log(3)
      if (selectedElement){
        selectedElement.classList.remove('selected')
      }
      selectedElement.remove()
      selectedElement = undefined
    }else if (e.key == 9){
      if(selectedElement)
        copyDivToClipboard(selectedElement)
    }

  });
addEventListener('click', e => {
    var x = e.clientX
    var y = e.clientY
    let element = document.elementFromPoint(x,y);
    if(!element)return;
    // if(!element.classList.contains('selectable'))return ;
    if (element == selectedElement)return ;
    element.classList.add('selected')
    if(selectedElement){
      selectedElement.classList.remove('selected')
    }
    selectedElement = element
}, {passive: true})
  // function findelements(x,y){
  //   let output = document.getElementById("output");
  //   output.innerHTML = ""
  //   if (document.elementsFromPoint) {
  //     let elements = document.elementsFromPoint(x,y);
  //     elements.forEach((elt, i) => {
  //       output.textContent += elt.localName + elt.className??"";
  //       if (i < elements.length - 1) {
  //         output.textContent += " < ";
  //       }
  //     });
  //     // elements[0].style.borderColor ="red"
  //     // elements[0].style.borderWidth = 2

  //   } else {
  //     output.innerHTML =
  //       '<span style="color: red;">' +
  //       "Browser does not support <code>document.elementsFromPoint()</code>" +
  //       "</span>";
  //   }
  // }
