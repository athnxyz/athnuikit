export interface ContextMap {
  context: string; 
  start: number; 
  end: number;
}


export const useHints = () => {
  const findClosestContextStart = (contextPositions: ContextMap[], position: number) => {
    return contextPositions.reduce((closest: ContextMap, current: ContextMap) => {
      if (current.start < position) {
        const currDiff = position - current.start;
        if (! closest || currDiff < position -closest.start) return current;
      }

      return closest;
    });
  };

  const findWordEnd = (str: string, offset: number, cursor: number): number => {
    const partialWordRegex = /[\w]/;
    if (offset >= cursor && ! partialWordRegex.test(str[cursor])) return offset;

    const separatorRegex = /[\t\r\n,]/;
    const contextRegex = /[\[]/; // /[\[]]/;

    for (let pos = cursor; pos <= str.length; pos++) {
      if (separatorRegex.test(str[pos])) return pos;
      if (contextRegex.test(str[pos])) return pos - 1;
    }

    return str.length;
  }

  const findWordStart = (str: string, offset: number, cursor: number, autoComplete?: boolean): number => {
    const separatorRegex = autoComplete ? /[\s\t\r\n,]/ : /[\t\r\n,]/ ;
    for (let pos = cursor; pos >= offset; pos--) { 
      if (separatorRegex.test(str[pos])) return pos + 1;
    }

    return offset + 1;
  }

  const stringifyIfNeeded = (input: any): string => {
    if (typeof input === 'string') return input;
    return JSON.stringify(input);
  }

  const updateCursorPosition = (initial: string, updated: string, autoComplete?: boolean): number => {
    const isValidString = (str: string): boolean => ! str || str.trim() === '';

    if (isValidString(updated)) return 0;
    if (isValidString(initial)) return updated.length;

    const maxLength = Math.max(initial.length, updated.length);

    for (let cursor = 0; cursor < maxLength; cursor++) {
      if (initial[cursor] !== updated[cursor]) {
        const newPos = autoComplete ? findWordEnd(updated, 0, cursor) : cursor;
        return initial.length > updated.length ? newPos : newPos + 1;
      }
    }

    return maxLength + 1;
  }

  const parseContext = (potentialContext: string): string => {
    return potentialContext.startsWith('[') && potentialContext.endsWith(']') 
      ? potentialContext.slice(1, -1)
      : potentialContext;
  }

  return { findClosestContextStart, findWordEnd, findWordStart, stringifyIfNeeded, updateCursorPosition, parseContext }
};