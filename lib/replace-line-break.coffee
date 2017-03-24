{CompositeDisposable} = require 'atom'

module.exports = ReplaceLineBreak =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable
    # Register command that replaces this view
    @subscriptions.add atom.commands.add 'atom-text-editor', 'replace-line-break:replace': => @replace()

  deactivate: ->
    @subscriptions.dispose()

  replace: ->
    editor = atom.workspace.getActiveTextEditor()
    selectedText = editor.getSelectedText()
    if selectedText
      replacedText = selectedText.replace(/\r?\n|\\n/g, '')
      editor.insertText(replacedText)
    else
      replacedText = editor.getText().replace(/\r?\n|\\n/g, '')
      editor.setText(replacedText)
