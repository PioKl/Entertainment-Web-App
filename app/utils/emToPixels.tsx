//konwerter em do pixeli (w breakPoints są te wartości, ale w tym przypadku bez końcówki em)

export function emToPixels(emValue: number): number {
  const emInPixels = 16; // W tym pojekcie 1em = 16px
  return emValue * emInPixels;
}
