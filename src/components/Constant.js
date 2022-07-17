const BALL_RADIUS = 80
const BALL_RADIUS_OFFSET = BALL_RADIUS * 0.2
const TYPE_DRAG = 0
const TYPE_CLICK = 1
const GO_BACK = 0
const GO_PROJECT = 1
const STAY = 2



class Student {
    constructor( name, image, school, hakbeon, hobby, comment, color)
    {
        this.name = name  
        this.image = image
        this.school = school
        this.hakbeon = hakbeon 
        this.hobby = hobby
        this.comment = comment
        this.color = color
    }
}

const Data = {
    name : [
        "남유성", "김상엽", "장지원", "이상민", "정찬우", 
        "김재민", "김가현", "박상빈", "김찬우", "김효정",
        "최가희", "황인준", "구민재", "김사은", "이지현",
        "김태훈", "강지훈", "조예진", "하현수", "한성익"
    ], 

    school  : [
        "GIST", "고려대", "부산대", "KAIST", "한양대",
        "고려대", "KAIST", "KAIST", "KAIST", "숙명여대",
        "숙명여대", "KAIST", "KAIST", "숙명여대", "KAIST",
        "한양대", "KAIST", "한양대", "포항공대", "부산대"
    ],

    hakbeon : [
        18, 18, 19, 19, 17,
        18, 19, 20, 20, 21,
        18, 21, 19, 20, 19,
        18, 19, 20, 20, 19
    ],

    hobby : [
        "사진, 여행", "음악, AI", "음악, 영화", "농구, 축구, 컴퓨터", "음악, 게임",
        "맛집, 여행", "영화, 책", "게임", "책, 노래", "책, 보드게임, 경제", 
        "창업, 춤, 노래", "시스템 공부 + 웹 개발", "음악, 게임", "창업, 동물, 책, edm", 
        "영화", "음악, 밴드, 축구", "음악, 축구, 스타트업", "여행, 게임", "게임", "개발"
    ],
    
    comment : [
        "안녕하세요! 캠프 기간동안 서로 의지하면서 성장할 수 있는 시간이 됐으면 좋겠습니다!",
        "안녕하세요. 재밌고 알찬 1달이 됐으면 좋겠습니다. 잘부탁드립니다~~",
        "안녕하세요. 캠프 기간 동안 재밌는 추억 많이 쌓으면서 즐겁게 공부했으면 좋겠습니다. 잘 부탁드립니다!",
        "안녕하세요! 1달 동안 즐겁게 지내면 좋겠습니다",
        "안녕하세요, 1달 동안 다같이 즐겁고 새로운 경험 쌓기를 바라며 잘 부탁드립니다.",
        "안녕하세요! 한 달동안 모두 좋은 경험하고 갔으면 좋겠습니다ㅎㅎ 잘 부탁드립니다!!",
        "안녕하세요. 한 달 동안 좋은 경험하고 가면 좋겠습니다. 잘 부탁드립니다!",
        "안녕하세요! 함께 즐거운 시간 보내면서 많이 성장하고 싶습니다. 잘 부탁드립니다.",
        "안녕하세요. 즐거운 캠프기간이 되었으면 좋겠습니다!",
        "캠프에서 어떤 경험을 할지 설레는 마음으로 기다리고 있습니다:) 함께 성장하는 시간으로 행복하게 채우면 좋겠습니다! 잘부탁드려요~",
        "안녕하세요!!!!!! 최가희입니다!! 한달동안 잘 부탁드립니다! 4분반 한달동안 화이팅넘치게 재밌고 빡세게 달려봐요~~~~",
        "Hello World! 모두 반갑습니다 :)",
        "기대 많이 되네요:냠냠: 즐겁게 열심히 해봐요 화이팅!",
        "한달 동안 동고동락하며 뿌듯한 기억, 즐거운 기억 함께 얻어갔으면 좋겠습니다!! 모두 반갑습니다~~",
        "안녕하세요 반가워요:미소짓는_상기된_얼굴: 한 달 동안 함께 즐거운 시간 보냈으면 좋겠습니다!",
        "안녕하세요, 즐거운 한 달이 되었으면 좋겠습니다! 잘 부탁드립니다ㅎㅎ",
        "안녕하세요!! 늦어서 죄송합니다ㅠㅠ한달 동안 열심히 같이 생활하면서, 모두 뜻깊고 좋은 추억으로 가져갈 수 있으면 좋겠습니다! 잘부탁드립니다",
        "몰입캠프가 하루앞으로 다가왔네요! 좋은 추억 많이 쌓고 싶습니다! 잘부탁드립니다ㅎㅎ",
        "몰입캠프 앞으로 잘 부탁드립니다 ! 즐거운 경험이 되었음 좋겠습니다 ㅎㅎ 잘 부탁드립니다.",
        "안녕 나는 한성익"
    ],

    color : [
        'FFA9A9', 'CD7070', 'F6BE2C', 'DDFF0D', '00FF00',
        '964EA8', '0012B6', '108CFF', '0DA4AD', '00FFA3',
        'FF83E4', 'CB8696', 'FF2727', '27FFF2', '135811',
        'FD83FF', '272052', '2400FF', 'D5FFCE', 'FF7A00',
        '00C1FF'
    ]
}

function hexToRGB(code) {
    let rStr = code.substring(0, 2)
    let gStr = code.substring(2, 4)
    let bStr = code.substring(4, 6)

    return {
        r: parseInt(rStr, 16),
        g: parseInt(gStr, 16),
        b: parseInt(bStr, 16)
    }
}

export { BALL_RADIUS, BALL_RADIUS_OFFSET, Data, hexToRGB , Student, TYPE_CLICK, TYPE_DRAG, GO_BACK, GO_PROJECT, STAY }

