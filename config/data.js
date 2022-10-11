const rideCards = [
    {rideName:'Ganga Aarti Boat-Ride',
    desc: 'Watch the beautiful Ganga-Aarti from boat itself.',
    rideTime: '6:00 PM',
    route: 'Kedar-Aarti Darshan-Marnikarnika-Kedar',
    pickupGhat: 'Kedar ghat',
    estimatedAmount: '@ ₹599 onwards',
    imgLink: 'https://images.thrillophilia.com/image/upload/s--hy87qy6---/c_fill,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/013/070/original/1569826243_ganga_arti1.jpg.jpg?1569826243'
    },
    {rideName:'Regular Boat-Ride',
    desc: 'Enjoy the heritage ghats of Varanasi',
    rideTime: 'Flexible',
    route: 'Kedar-Assi-Marnikarnika-Kedar',
    pickupGhat: 'Kedar ghat',
    estimatedAmount: '@₹799 onwards',
    imgLink: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/72/68/de.jpg'
    }
]
const timeSlots = [
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
]
// const pickupPoint = [
//     'Kedar Ghat',
//     'Assi Ghat',
// ]

const priceCard = [
    {amount: 500,
    boatType: 'Motor Boat',
    riderRange: '1-4'    
    },
    {amount: 800,
    boatType: 'Motor Boat',
    riderRange: '5-8'    
    },
    {amount: 1000,
    boatType: 'Motor Boat',
    riderRange: '8-12'    
    },
]
const validDiscounts = [
    {code:'harhargange',
    discountPrice: 50,
    partner: 'tastewithdada'
    },
    {code:'boatersop',
    discountPrice: 100,
    partner: 'gkp'
    }
]

module.exports = {rideCards, timeSlots, priceCard, validDiscounts}