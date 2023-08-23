import { supabaseUrl } from 'constants/supabseClient'

const imageUrl = `${supabaseUrl}/storage/v1/object/public/room-images/`

export const rooms = [
  {
    name: '101',
    room_type: 'single',
    maxCapacity: 1,
    regularPrice: 150,
    discount: 0,
    image: imageUrl + 'single-001.jpeg',
    description:
      '우리의 아늑한 싱글룸은 혼자 여행하거나 비즈니스 출장 중인 분들에게 최적의 선택입니다. 편안한 침대와 필요한 편의 시설을 갖춘 이 공간에서 편안하게 휴식을 취하실 수 있습니다. 개인적인 공간에서 편안한 시간을 보내보세요.',
  },
  {
    name: '201',
    room_type: 'single',
    maxCapacity: 1,
    regularPrice: 150,
    discount: 25,
    image: imageUrl + 'single-002.jpeg',
    description:
      '우리의 아늑한 싱글룸은 혼자 여행하거나 비즈니스 출장 중인 분들에게 최적의 선택입니다. 편안한 침대와 필요한 편의 시설을 갖춘 이 공간에서 편안하게 휴식을 취하실 수 있습니다. 개인적인 공간에서 편안한 시간을 보내보세요.',
  },
  {
    name: '301',
    room_type: 'single',
    maxCapacity: 1,
    regularPrice: 150,
    discount: 0,
    image: imageUrl + 'single-003.jpeg',
    description:
      '우리의 아늑한 싱글룸은 혼자 여행하거나 비즈니스 출장 중인 분들에게 최적의 선택입니다. 편안한 침대와 필요한 편의 시설을 갖춘 이 공간에서 편안하게 휴식을 취하실 수 있습니다. 개인적인 공간에서 편안한 시간을 보내보세요.',
  },
  {
    name: '102',
    room_type: 'double',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 50,
    image: imageUrl + 'double-001.jpeg',
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '202',
    room_type: 'double',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: imageUrl + 'double-002.jpeg',
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '302',
    room_type: 'double',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 100,
    image: imageUrl + 'double-003.jpeg',
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '103',
    room_type: 'double',
    maxCapacity: 2,
    regularPrice: 300,
    discount: 100,
    image: imageUrl + 'double-004.jpeg',
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '203',
    room_type: 'twin',
    maxCapacity: 3,
    regularPrice: 400,
    discount: 0,
    image: imageUrl + 'twin-001.jpeg',
    description:
      '친구나 가족과 함께하는 여행에 이상적인 트윈룸을 소개합니다. 두 개의 트윈 침대가 구비되어 있어 각자의 공간에서 편안하게 머무를 수 있습니다. 모던한 인테리어와 편리한 시설이 조화를 이루어 특별한 추억을 만들어드립니다.',
  },
  {
    name: '303',
    room_type: 'twin',
    maxCapacity: 3,
    regularPrice: 400,
    discount: 0,
    image: imageUrl + 'twin-002.jpeg',
    description:
      '친구나 가족과 함께하는 여행에 이상적인 트윈룸을 소개합니다. 두 개의 트윈 침대가 구비되어 있어 각자의 공간에서 편안하게 머무를 수 있습니다. 모던한 인테리어와 편리한 시설이 조화를 이루어 특별한 추억을 만들어드립니다.',
  },
  {
    name: '104',
    room_type: 'twin',
    maxCapacity: 3,
    regularPrice: 450,
    discount: 0,
    image: imageUrl + 'twin-003.jpeg',
    description:
      '친구나 가족과 함께하는 여행에 이상적인 트윈룸을 소개합니다. 두 개의 트윈 침대가 구비되어 있어 각자의 공간에서 편안하게 머무를 수 있습니다. 모던한 인테리어와 편리한 시설이 조화를 이루어 특별한 추억을 만들어드립니다.',
  },
  {
    name: '204',
    room_type: 'triple',
    maxCapacity: 4,
    regularPrice: 500,
    discount: 0,
    image: imageUrl + 'triple-001.jpeg',
    description:
      '소규모 그룹 여행이나 가족 여행을 위한 트리플룸을 소개합니다. 퀸 사이즈 또는 싱글 침대가 조화롭게 배치되어 여행객 여러분께 최적의 편안함을 제공합니다. 함께하는 시간을 더욱 소중하게 만들어 줄 것입니다.',
  },
  {
    name: '304',
    room_type: 'triple',
    maxCapacity: 4,
    regularPrice: 500,
    discount: 0,
    image: imageUrl + 'triple-002.jpeg',
    description:
      '소규모 그룹 여행이나 가족 여행을 위한 트리플룸을 소개합니다. 퀸 사이즈 또는 싱글 침대가 조화롭게 배치되어 여행객 여러분께 최적의 편안함을 제공합니다. 함께하는 시간을 더욱 소중하게 만들어 줄 것입니다.',
  },
]
