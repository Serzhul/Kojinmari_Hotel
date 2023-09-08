export const ROOM_TYPE_MAP = {
  single: '싱글룸 (싱글 침대 1개)',
  double: '더블룸 (더블 침대 1개)',
  twin: '트윈룸 (싱글 침대 2개)',
  triple: '트리플룸 (더블 침대 1개, 간이 침대 1개)',
}

export type ROOM_TYPE_KEY = keyof typeof ROOM_TYPE_MAP

export const BOOKING_STATUS_MAP = {
  unconfirmed: '결제 대기중',
  confirmed: '예약 확정',
  checkin: '체크인',
  checkout: '체크아웃',
}

export type BOOKING_STATUS_KEY = keyof typeof BOOKING_STATUS_MAP
