class EditorSelection {
  getSelection() {
    const sel = window.getSelection()!;

    return {
      start: sel.anchorOffset,
      end: sel.focusOffset,
    };
  }
}

export default EditorSelection;
