'use babel';

import { CompositeDisposable } from 'atom';

const LINE_BREAK_TOKEN = /\r?\n/g

function replace(editor) {
  const selectedText = editor.getSelectedText();

  if (typeof selectedText !== 'string') {
    return;
  }

  if (selectedText === '') {
    const replacedText = editor.getText().replace(LINE_BREAK_TOKEN, '');
    editor.setText(replacedText);
  } else {
    const replacedText = selectedText.replace(LINE_BREAK_TOKEN, '');
    editor.insertText(replacedText);
  }
}

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'replace-line-break:replace': () => replace(atom.workspace.getActiveTextEditor())
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  }
};
