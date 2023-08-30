export const ROOM_TYPE_MAP = {
  single: '싱글룸 (싱글 침대 1개)',
  double: '더블룸 (더블 침대 1개)',
  twin: '트윈룸 (싱글 침대 2개)',
  triple: '트리플룸 (더블 침대 1개, 간이 침대 1개)',
}

export type ROOM_TYPE_KEY = keyof typeof ROOM_TYPE_MAP
