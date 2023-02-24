export function getStudentTypeValue(value) {
  switch (value) {
    case "A":
      return "แผน ก";
    case "B":
      return "แผน ข";
    case "C":
      return "แบบ 1";
    case "ฏ":
      return "แบบ 2";
    default:
      return "-";
  }
}
