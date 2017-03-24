'use babel';

describe('ReplaceLineBreak', () => {

  let editor, editorElement;

  beforeEach(() => {
    waitsForPromise(() => atom.workspace.open());

    waitsForPromise(() => atom.packages.activatePackage('replace-line-break'));

    runs(() => {
      editor = atom.workspace.getActiveTextEditor();
      editorElement = atom.views.getView(editor);
    });
  });

  afterEach(() => {
    atom.packages.disablePackage('replace-line-break');
  });

  describe('when the replace-line-break:replace event is triggered', () => {
    it('replace line break to empty string', () => {
      editor.setText('line1\nline2\rline3\r\nline4\n\rline5\\nline6\\rline7');
      atom.commands.dispatch(editorElement, 'replace-line-break:replace');
      expect(editor.getText()).toEqual('line1line2\rline3line4\rline5\\nline6\\rline7');
    });
  });

});
