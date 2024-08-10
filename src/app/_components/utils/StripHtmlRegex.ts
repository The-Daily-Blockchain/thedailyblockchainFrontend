const stripHtmlRegex = (html: string): string => {
  let text = html.replace(/<\/?[^>]+>/gi, "");

  // Remove &nbsp; entities
  text = text.replace(/&nbsp;/g, " ");

  return text;
};

export default stripHtmlRegex;
