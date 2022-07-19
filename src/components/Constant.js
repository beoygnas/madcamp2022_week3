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
        this.projects = []
    }
}

const Projects = [
    {
        week : 1,
        id : 1, 
        team : ["김상엽", "이상민"],
        name : "덤벼라 인스타그램",
        github : "https://github.com/beoygnas/week1",
        img : [],
        text : [
            "인스타그램을 이길만한 연락처 앱을 만들어 봤습니다", 
            "실제 휴대폰의 연락처/갤러리를 동기화하고, 캘린더 탭에서는 내부저장소에 일정을 저장합니다.",
            ],
    },
    {   
        week : 1,
        id : 2, 
        team : ["김재민", "정찬우"],
        name : "K-Xylophone",
        github : "https://github.com/dev-jaemin/FirstFlow",
        img : [],
        text : [
            "연락처/나만의 이미지 갤러리을 구현하고, 실로폰 연주 및 녹음할 수 있는 앱을 개발했습니다.", 
            "수많은 기능이 있지만, 단 하나의 에러도 발생하지 않도록 많은 노력을 기울였습니다",
            "금주의 픽!"
            ],
    },
    {
        week : 1,
        id : 3,
        team : ["김태훈", "박상빈"],
        name : "Forcard",
        github : "https://github.com/sbpark0611/project1",
        img : [],
        text : [
            "연락처별 맞춤 포토카드를 만들 수 있는 안드로이드 기반 어플리케이션입니다!",
            "실제 연락처와 갤러리 속 사진을 만든 포토카드는, 인스타 스토리 공유가 가능합니다."
        ]
    },
    {
        week : 1,
        id : 4,
        team : ["구민재", "김효정"],
        name : "Office On",
        github : "https://github.com/9mande/madcamp1",
        img : [],
        text : [
            
            "Office라는 주제로 업무연락처와 명함집, Todo list, 오피스룩 추천 기능을 구현해보았습니다.",
            "깔끔한 디자인, 다양한 라이브러리/API을 이용한 수많은 디테일을 만끽해보세요.",
            "금주의 픽!"
        ]
    },
    {
        week : 1,
        id : 5,
        team : ["김찬우", "장지원"],
        name : "MADCAMP_1주차",
        github : "https://github.com/DebbieIsFree/madCamp_week01",
        img : [],
        text : [
            "연락처, 갤러리, 지도 기능을 가진 안드로이드 어플리케이션을 개발했습니다.",
            "Naver Map API를 이용해 현재 위치와 지도 상의 새로운 지점을 구할 수 있습니다."
        ]
    },
    {
        week : 1,
        id : 6,
        team : ["이지현", "하현수"],
        name : "마퍼앱",
        github : "https://github.com/Jihyun03/madcamp_android",
        img : [],
        text : [
            "나만의 앨범, 나만의 메모장을 커스텀할 수 있는 앱을 개발했습니다!",
            "간단한 메모장 기능으로 개인용 기록장으로 사용할 수 있습니다."
        ]
    },
    {
        week : 1,
        id : 7,
        team : ["김가현", "남유성"],
        name : "카이냠",
        github : "https://github.com/zzxzzhyun/cs496_week1",
        img : [],
        text : [
            "배고픈 친구들에게 카이스트 주변 맛집을 소개해줄 수 있는 애플리케이션을 제작해봤습니다.",
            "Naver Map API를 이용해 먹고 싶은 맛집의 실제 위치를 지도 상에서 확인 할 수 있습니다."
        ]
    },
    {
        week : 1,
        id : 8,
        team : ["김사은", "황인준"],
        name : "The Most Useful App",
        github : "https://github.com/injoonH/madcamp-simple-app/tree/develop",
        img : [],
        text : [
            "각 탭에 연락처 / 갤러리 / TodoList 를 담은 애플리케이션을 제작했습니다.",
            "SQLite를 이용해, TodoList에서 간단한 텍스트와 일정에 대한 CRUD를 지원합니다."
        ]
    },
    {
        week : 1,
        id : 9,
        team : ["최가희", "한성익"],
        name : "낙하산",
        github : "https://github.com/seongikx/Madcamp01/",
        img : [],
        text : [
            "연락처와 다이어리, 각종 게임을 즐길 수 있는 페이지로 구성한 안드로이드 앱을 개발했습니다.",
            "앱 내부저장소에 저장되는 다이어리는 삭제되지 않고, 연락처를 통해 전화/문자를 할 수 있습니다"
        ]
    }
    ,
    {
        week : 1,
        id : 10,
        team : ["강지훈", "조예진"],
        name : "GameBoy Beta",
        github : "https://github.com/jakekang28/Project1",
        img : [],
        text : [
            "기본적인 연락처/갤러리 탭 외에, 포켓몬 배틀 탭을 구성하여 게임보이 베타를 제작해보려 했습니다.",
            "포켓몬 갤러리를 통해 포켓몬 영상을 볼 수 있고, 영어 단어장을 통해 급하게 화면전환을 할 수 있습니다."
        ]
    }
    ,
    {
        week : 2,
        id : 1,
        team : ["김가현", "김재민"],
        name : "카이냠 (Ver.2)",
        github : "https://github.com/zzxzzhyun/kaiyum",
        img : [],
        text : [
            "카이스트 학생들이 실제로 사용할 수 있는, 맛집 어플을 제작을 목표로 개발한 앱입니다",
            "매일매일의 교내식당 정보, 카이스트 근처의 맛집과 정보공유 커뮤니티 등의 기능을 제공합니다."
        ]
    },
    {
        week : 2,
        id : 2,
        team : ["김태훈", "김사은"],
        name : "Gathering",
        github : "https://github.com/twodf78/project2",
        img : [],
        text : [
            "쉽고 빠르게, 모임을 만들고 모임에 가입할 수 있게 도와주는 앱을 제작해보았습니다.",
            "매력지수라는 포인트를 통해, 모임원 평가 진행되며 칭호가 주어집니다."
        ]
    },
    {
        week : 2,
        id : 3,
        team : ["박상빈", "장지원"],
        name : "Roots",
        github : "https://github.com/sbpark0611/Roots",
        img : [],
        text : [
            "다양한 음악을 들으며, 나만의 플레이 리스트를 저장해 관리 할 수 있는 안드로이드 기반 앱입니다.",
            "랜덤 음악 추천으로 풍요로운 음악 감성을 채워보세요."
        ]
    },
    {
        week : 2,
        id : 4,
        team : ["김상엽", "조예진"],
        name : "개발같이해요, 개같이",
        github : "https://github.com/beoygnas/week2_developer_app",
        img : [],
        text : [
            "개발자들끼리 프로젝트에 대한 정보를 공유할 수 있는 개발자 커뮤니티 앱을 만들어 봤습니다.",
            "프로젝트 게시판, 질문 게시판, 실시간 채팅의 기능을 구현해 효율적인 소통을 할 수 있습니다."
        ]
    },
    {
        week : 2,
        id : 5,
        team : ["이지현", "정찬우"],
        name : "BloomBuddy",
        github : "https://github.com/Jhanoo/BloomBuddy",
        img : [],
        text : [
            "사용자 계정에 로그인하여, 근처의 친구들과 화상통화를 할 수 있는 어플을 구현해보고자 했습니다.",
            "주변의 친구들을 지도 상에서 확인하고 화상통화를 통해 소통하세요."
        ]
    },
    {
        week : 2,
        id : 6,
        team : ["구민재", "최가희"],
        name : "런드리맵",
        github : "https://github.com/100-IT-CEO/LaundryMap/tree/thirdstart",
        img : [],
        text : [
            "세상에 없던, 코인세탁소의 세탁기/건조기에 대한 획기적인 예약 시스템을 고안해보았습니다.",
            "QR코드를 이용해, 세탁기에 대한 정보를 서버와 공유하며 이를 통해 예약시스템을 구현했습니다."
        ]
    },
    {
        week : 2,
        id : 7, 
        team : ["김효정", "이상민"],
        name : "VR 실습실 탈출, 이었던 것",
        github : "https://github.com/alex6095/FFFFFinal",
        img : [],
        text : [
            "VR FPS 멀티게임으로, 친구와 함꼐 몬스터를 잡으며 실습실을 탈출하는 게임을 제작해보고자 했습니다.",
            "1234"
        ]
    },
    {
        week : 2,
        id : 8, 
        team : ["김찬우", "남유성"],
        name : "MadRunner",
        github : "https://github.com/alex6095/FFFFFinal",
        img : [],
        text : [
            "1234",
            "1234"
        ]
    },
    {
        week : 2,
        id : 9, 
        team : ["강지훈", "한성익"],
        name : "오징어게임",
        github : "https://github.com/alex6095/FFFFFinal",
        img : [],
        text : [
            "1234",
            "1234"
        ]
    },
    {
        week : 2,
        id : 10, 
        team : ["하현수", "황인준"],
        name : "게임",
        github : "https://github.com/alex6095/FFFFFinal",
        img : [],
        text : [
            "1234",
            "1234"
        ]
    }
]

const Data = {
    name : [
        "남유성", "김상엽", "장지원", "이상민", "정찬우", 
        "김재민", "김가현", "박상빈", "김찬우", "김효정",
        "최가희", "황인준", "구민재", "김사은", "이지현",
        "김태훈", "강지훈", "조예진", "하현수", "한성익"
    ], 

    project : [
        [7, 8], [1, 4], [5, 3], [1, 7], [2, 5],
        [2, 1], [7, 1], [3, 3], [5, 8], [4, 7],
        [9, 6], [8, ], [4, 6], [8, 2], [6, 5],
        [3, 2], [10, ], [10, 4], [6, ], [9, ]
    ],

    github : [
        "",
        "https://github.com/beoygnas",
        "https://github.com/DebbieIsFree",
        "https://github.com/alex6095",
        "",


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
        "안녕하세요!!!!!! 최가희입니다!! 한달동안 잘 부탁드립니다! 4분반 한달동안 화이팅넘치게 재밌고  빡세게 달려봐요~~~~",
        "Hello World! 모두 반갑습니다 :)",
        "기대 많이 되네요:냠냠: 즐겁게 열심히 해봐요 화이팅!",
        "한달 동안 동고동락하며 뿌듯한 기억, 즐거운 기억 함께 얻어갔으면 좋겠습니다!! 모두 반갑습니다~~",
        "안녕하세요 반가워요:: 한 달 동안 함께 즐거운 시간 보냈으면 좋겠습니다!",
        "안녕하세요, 즐거운 한 달이 되었으면 좋겠습니다! 잘 부탁드립니다ㅎㅎ",
        "안녕하세요!! 늦어서 죄송합니다ㅠㅠ한달 동안 열심히 같이 생활하면서, 모두 뜻깊고 좋은 추억으로 가져갈 수 있으면 좋겠습니다! 잘부탁드립니다",
        "몰입캠프가 하루앞으로 다가왔네요! 좋은 추억 많이 쌓고 싶습니다! 잘부탁드립니다ㅎㅎ",
        "몰입캠프 앞으로 잘 부탁드립니다 ! 즐거운 경험이 되었음 좋겠습니다 ㅎㅎ 잘 부탁드립니다.",
        "안녕 한성익입니다."
    ],

    color : [
        'FFC0C0', 'B2C3FF', 'FEC5FF', '17D3DE', 'C3AED8',
        'FFA8A8', '97AEFF', 'FDA6FF', '15C0CA', 'B59DCC',
        'FF8F8F', '809CFF', 'FD97FF', '11A4AD', '9D83B7',
        'FF6F6F', '6688FF', 'FC5BFF', '0F8F97', '8D6FAA',
        '00C1FF'
    ]
    
}

const GALLERY = [
    '성익이 귀 빠진 기념 회식',
    '유성이의 사랑이야기',
    '신세계 선구자들',
    '상남자특 ) 정찬우',
    '몰입캠프 3주차',
    '????',
    '자강두천',
    '상빈이가 가장 크게 웃은 날',
    '진짜부럽다',
    '성익이 귀여워',
    '케익정산 언제해',
    '으악'


]

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

export { BALL_RADIUS, BALL_RADIUS_OFFSET, Data, hexToRGB , Student, TYPE_CLICK, TYPE_DRAG, GO_BACK, GO_PROJECT, STAY , Projects, GALLERY }

