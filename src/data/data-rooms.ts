import { supabaseUrl } from 'constants/supabseClient'

const imageUrl = `${supabaseUrl}/storage/v1/object/public/room-images/`

export const rooms = [
  {
    name: '수페리얼 싱글룸 1',
    roomType: 'single',
    maxCapacity: 1,
    regularPrice: 150000,
    discount: 0,
    image: [
      imageUrl + 'Superior-Single1.jpeg',
      imageUrl + 'Superior-Single2.jpeg',
      imageUrl + 'Superior-Single3.jpeg',
    ].join(','),
    description:
      '우리의 아늑한 싱글룸은 혼자 여행하거나 비즈니스 출장 중인 분들에게 최적의 선택입니다. 편안한 침대와 필요한 편의 시설을 갖춘 이 공간에서 편안하게 휴식을 취하실 수 있습니다. 개인적인 공간에서 편안한 시간을 보내보세요.',
  },
  {
    name: '수페리얼 싱글룸 2',
    roomType: 'single',
    maxCapacity: 1,
    regularPrice: 150000,
    discount: 25000,
    image: [
      imageUrl + 'Superior-Single1.jpeg',
      imageUrl + 'Superior-Single2.jpeg',
      imageUrl + 'Superior-Single3.jpeg',
    ].join(','),
    description:
      '우리의 아늑한 싱글룸은 혼자 여행하거나 비즈니스 출장 중인 분들에게 최적의 선택입니다. 편안한 침대와 필요한 편의 시설을 갖춘 이 공간에서 편안하게 휴식을 취하실 수 있습니다. 개인적인 공간에서 편안한 시간을 보내보세요.',
  },
  {
    name: '수페리얼 싱글룸 3',
    roomType: 'single',
    maxCapacity: 1,
    regularPrice: 150000,
    discount: 0,
    image: [
      imageUrl + 'Superior-Single1.jpeg',
      imageUrl + 'Superior-Single2.jpeg',
      imageUrl + 'Superior-Single3.jpeg',
    ].join(','),
    description:
      '우리의 아늑한 싱글룸은 혼자 여행하거나 비즈니스 출장 중인 분들에게 최적의 선택입니다. 편안한 침대와 필요한 편의 시설을 갖춘 이 공간에서 편안하게 휴식을 취하실 수 있습니다. 개인적인 공간에서 편안한 시간을 보내보세요.',
  },
  {
    name: '프리미어 더블룸 1',
    roomType: 'double',
    maxCapacity: 2,
    regularPrice: 250000,
    discount: 50000,
    image: [
      imageUrl + 'Premier-Double1.jpeg',
      imageUrl + 'Premier-Double2.jpeg',
      imageUrl + 'Premier-Double3.jpeg',
    ].join(','),
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '프리미어 더블룸 2',
    roomType: 'double',
    maxCapacity: 2,
    regularPrice: 250000,
    discount: 0,
    image: [
      imageUrl + 'Premier-Double1.jpeg',
      imageUrl + 'Premier-Double2.jpeg',
      imageUrl + 'Premier-Double3.jpeg',
    ].join(','),
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '프리미어 더블룸 3',
    roomType: 'double',
    maxCapacity: 2,
    regularPrice: 250000,
    discount: 100000,
    image: [
      imageUrl + 'Premier-Double1.jpeg',
      imageUrl + 'Premier-Double2.jpeg',
      imageUrl + 'Premier-Double3.jpeg',
    ].join(','),
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '프리미어 더블룸 4',
    roomType: 'double',
    maxCapacity: 2,
    regularPrice: 300000,
    discount: 100000,
    image: [
      imageUrl + 'Premier-Double1.jpeg',
      imageUrl + 'Premier-Double2.jpeg',
      imageUrl + 'Premier-Double3.jpeg',
    ].join(','),
    description:
      '커플이나 친구와 함께하는 여행객을 위한 더블룸을 소개합니다. 편안한 퀸 사이즈 또는 킹 사이즈 침대가 구비되어 있어 편안한 휴식을 제공하며, 아늑한 분위기가 만들어내는 포근한 느낌이 더해집니다. 특별한 시간을 함께 보내는 최적의 장소입니다.',
  },
  {
    name: '레지던스 트윈룸 1',
    roomType: 'twin',
    maxCapacity: 3,
    regularPrice: 400000,
    discount: 0,
    image: [
      imageUrl + 'Residence-Twin1.jpeg',
      imageUrl + 'Residence-Twin2.jpeg',
      imageUrl + 'Residence-Twin3.jpeg',
    ].join(','),
    description:
      '친구나 가족과 함께하는 여행에 이상적인 트윈룸을 소개합니다. 두 개의 트윈 침대가 구비되어 있어 각자의 공간에서 편안하게 머무를 수 있습니다. 모던한 인테리어와 편리한 시설이 조화를 이루어 특별한 추억을 만들어드립니다.',
  },
  {
    name: '레지던스 트윈룸 2',
    roomType: 'twin',
    maxCapacity: 3,
    regularPrice: 400000,
    discount: 0,
    image: [
      imageUrl + 'Residence-Twin1.jpeg',
      imageUrl + 'Residence-Twin2.jpeg',
      imageUrl + 'Residence-Twin3.jpeg',
    ].join(','),
    description:
      '친구나 가족과 함께하는 여행에 이상적인 트윈룸을 소개합니다. 두 개의 트윈 침대가 구비되어 있어 각자의 공간에서 편안하게 머무를 수 있습니다. 모던한 인테리어와 편리한 시설이 조화를 이루어 특별한 추억을 만들어드립니다.',
  },
  {
    name: '레지던스 트윈룸 3',
    roomType: 'twin',
    maxCapacity: 3,
    regularPrice: 450000,
    discount: 0,
    image: [
      imageUrl + 'Residence-Twin1.jpeg',
      imageUrl + 'Residence-Twin2.jpeg',
      imageUrl + 'Residence-Twin3.jpeg',
    ].join(','),
    description:
      '친구나 가족과 함께하는 여행에 이상적인 트윈룸을 소개합니다. 두 개의 트윈 침대가 구비되어 있어 각자의 공간에서 편안하게 머무를 수 있습니다. 모던한 인테리어와 편리한 시설이 조화를 이루어 특별한 추억을 만들어드립니다.',
  },
  {
    name: '매그니픽 트리플룸-1',
    roomType: 'triple',
    maxCapacity: 4,
    regularPrice: 500000,
    discount: 0,
    image: [
      imageUrl + 'Magnific-Triple1.jpeg',
      imageUrl + 'Magnific-Triple2.jpeg',
      imageUrl + 'Magnific-Triple3.jpeg',
    ].join(','),
    description:
      '소규모 그룹 여행이나 가족 여행을 위한 트리플룸을 소개합니다. 퀸 사이즈 또는 싱글 침대가 조화롭게 배치되어 여행객 여러분께 최적의 편안함을 제공합니다. 함께하는 시간을 더욱 소중하게 만들어 줄 것입니다.',
  },
  {
    name: '매그니픽 트리플룸-2',
    roomType: 'triple',
    maxCapacity: 4,
    regularPrice: 500000,
    discount: 0,
    image: [
      imageUrl + 'Magnific-Triple1.jpeg',
      imageUrl + 'Magnific-Triple2.jpeg',
      imageUrl + 'Magnific-Triple3.jpeg',
    ].join(','),
    description:
      '소규모 그룹 여행이나 가족 여행을 위한 트리플룸을 소개합니다. 퀸 사이즈 또는 싱글 침대가 조화롭게 배치되어 여행객 여러분께 최적의 편안함을 제공합니다. 함께하는 시간을 더욱 소중하게 만들어 줄 것입니다.',
  },
]
