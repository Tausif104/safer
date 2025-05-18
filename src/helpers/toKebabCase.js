export default function toKebabCase(str) {
  return str?.toLowerCase().replace(/\s+/g, "-");
}
