// Places a centered quotation between two decorative gold lines.
function QuoteLine({ text, source }) {
  return <figure className="quote-line"><span aria-hidden="true" /><blockquote>{text}</blockquote><span aria-hidden="true" /><figcaption>{source}</figcaption></figure>
}
export default QuoteLine
