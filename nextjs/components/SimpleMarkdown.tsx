interface SimpleMarkdownProps {
  children: string;
}

export function SimpleMarkdown({ children }: SimpleMarkdownProps) {
  // Simple markdown-to-HTML conversion for basic formatting
  const formatText = (text: string) => {
    return text
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert *italic* to <em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Convert ### headers to <h3>
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Convert ## headers to <h2>
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      // Convert # headers to <h1>
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      // Convert line breaks to <br>
      .replace(/\n/g, '<br>')
      // Convert bullet points (- or *) to <ul><li>
      .replace(/^[*-] (.*$)/gm, '<li>$1</li>')
      // Wrap consecutive <li> items in <ul>
      .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
      // Clean up nested <ul> tags
      .replace(/<\/ul>\s*<ul>/g, '');
  };

  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: formatText(children) }}
    />
  );
}
