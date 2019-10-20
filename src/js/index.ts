let lineCount = 0;

enum Mode {Upper, Lower}

function convertString(input: string, mode: Mode): string {
  switch(mode) {
    case Mode.Lower:
      return input.toLowerCase();
    case Mode.Upper:
      return input.toUpperCase();
  }
}

function printResult(stringToPrint: string): void {
  const lastResult: HTMLDivElement = <HTMLDivElement> document.querySelector('#last-result');
  const resultsContainer: HTMLDivElement = <HTMLDivElement> document.querySelector('#results');
  const resultLineTemplate: HTMLTemplateElement = <HTMLTemplateElement> document.querySelector('#result-line-template');

  lastResult.textContent = stringToPrint;

  const resultLine: DocumentFragment = <DocumentFragment> document.importNode(resultLineTemplate.content, true);
  const resultId: HTMLDivElement = <HTMLDivElement> resultLine.querySelector('.result-id');
  const resultValue: HTMLDivElement = <HTMLDivElement> resultLine.querySelector('.result-value');

  resultId.textContent = "" + ++lineCount;
  resultValue.textContent = stringToPrint;

  resultsContainer.prepend(resultLine);
}

function inputForm_onSubmit(e: Event): void {
  e.preventDefault();

  const inputField: HTMLInputElement = <HTMLInputElement> document.querySelector('#input-string');
  const modeSelector: HTMLSelectElement = <HTMLSelectElement> document.querySelector('#mode-selector');

  const convertedString: string = convertString(inputField.value, Mode[modeSelector.value as keyof typeof Mode]);

  printResult(convertedString);
}

const inputForm: HTMLFormElement = <HTMLFormElement> document.querySelector('#input-form');
inputForm.addEventListener('submit', inputForm_onSubmit);
