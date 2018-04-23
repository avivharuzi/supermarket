import { Directive, ElementRef, Input, AfterViewChecked, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements AfterViewChecked {
  @Input('appHighlight') appHighlight: string;
  @Input() caseSensitive = true;

  private WRAPPER_TOKEN = '==--==##';

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewChecked(): void {
    this.removePreviouslyMarkedTextInNode();
    this.markMatchedTextTokens(this.el.nativeElement);
  }

  private get caseSensitivity(): string {
    return this.caseSensitive ? '' : 'i';
  }

  private markMatchedTextTokens(htmlNode: HTMLElement) {
    const _searchTerm = this.getSearchTerm();
    const searchRegex = new RegExp(_searchTerm, 'gmi');

    const _searchTermUniqueTokens = this.getUniqueTokenWrappedSearchTerm();
    const searchRegexUniqueTokens = new RegExp(_searchTermUniqueTokens, 'gmi');
    this.traverseHtmlElementsTree(htmlNode, e => {
      this.traverseNodesInElement(htmlNode.childNodes, node => this.wrapUniqueTokensAroundMatchedText(node, searchRegex));
    });

    this.markMatchedTextAndRemoveUniqueTokens(htmlNode, searchRegexUniqueTokens);
  }

  private markMatchedTextAndRemoveUniqueTokens(htmlNode: HTMLElement, searchRegex: RegExp) {
    if (htmlNode.innerHTML) {
      const innerHtml = htmlNode.innerHTML;
      const newHtml = innerHtml.replace(searchRegex, match => {
        const wrapperLength = this.WRAPPER_TOKEN.length;
        const markedStr = match.substr(wrapperLength, match.length - (wrapperLength * 2));
        return `<mark>${markedStr}</mark>`;
      });

      htmlNode.innerHTML = newHtml;
    }
  }

  private traverseNodesInElement(nodes: NodeList, visitCallback: (node: Node) => any) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType === 3) {
        visitCallback(node);
      }
    }
  }

  private wrapUniqueTokensAroundMatchedText(htmlNode: Node, searchRegex: RegExp) {
    const innerText = htmlNode.nodeValue;
    const newText = innerText.replace(searchRegex, `${this.WRAPPER_TOKEN}$&${this.WRAPPER_TOKEN}`);
    htmlNode.nodeValue = newText;
  }

  private traverseHtmlElementsTree(currentNode: HTMLElement, visitCallback: (node: HTMLElement) => any) {
    if (currentNode) {
      visitCallback(currentNode);
    }

    for (let i = 0; i < currentNode.children.length; i++) {
      const childNode = currentNode.children[i];
      this.markMatchedTextTokens(<HTMLElement>childNode);
    }
  }

  private removePreviouslyMarkedTextInNode() {
    const node = this.el.nativeElement;
    const markingPattern = new RegExp('<mark>|<\/mark>', 'g');
    const cleanText = node.innerHTML.replace(markingPattern, '');
    node.innerHTML = cleanText;
  }

  private highlightedNewTextInNode() {
    const node = this.el.nativeElement;
    const htmlNegativeLookaheadPattern = '(?![^<>]*>)';
    const searchTermPattern = this.getSearchTerm();
    const searchRegex = new RegExp(searchTermPattern + htmlNegativeLookaheadPattern, 'gmi');
    const markedText = node.innerHTML.replace(searchRegex, '<mark>$&</mark>');
    node.innerHTML = markedText;
  }

  private getSearchTerm() {
    let escapedSearchTerm = `${this.escapeRegExp(this.appHighlight)}`;
    const spaceToMultiMatchRegex = new RegExp(' ', 'gm');
    escapedSearchTerm = escapedSearchTerm.replace(spaceToMultiMatchRegex, '|');
    return escapedSearchTerm;
  }

  private getUniqueTokenWrappedSearchTerm() {
    let escapedSearchTerm = this.escapeRegExp(this.appHighlight);
    const spaceToMultiMatchRegex = new RegExp(' ', 'gm');
    escapedSearchTerm = escapedSearchTerm.replace(spaceToMultiMatchRegex, `${this.WRAPPER_TOKEN}|${this.WRAPPER_TOKEN}`);
    escapedSearchTerm = `${this.WRAPPER_TOKEN}${escapedSearchTerm}${this.WRAPPER_TOKEN}`;
    return escapedSearchTerm;
  }

  private escapeRegExp(str) {
    return str.replace('/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g', '\\$&');
  }
}
