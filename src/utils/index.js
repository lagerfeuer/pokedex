import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

export function formatName(name) {
  return name
    .replace(/^\w/, (letter) => letter.toUpperCase())
    .replace(/-[mf]$/, "");
}

export function gender(name) {
  if (name.endsWith("-m")) return <FontAwesomeIcon icon={faMars} />;
  if (name.endsWith("-f")) return <FontAwesomeIcon icon={faVenus} />;
  return null;
}
