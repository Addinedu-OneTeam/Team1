# 문서정리

**프로젝트 명**: One - Planner

**팀 구성원**:

- 1조: 강민, 애경, 용철
- 2조: 범신, 재호

**개요**:
이 프로젝트는 사용자 개인의 요구에 맞춘 맞춤형 플래너를 웹 기술을 활용하여 구현하는 것을 목표로 합니다. 
이를 통해 사용자는 자신의 일정을 효율적으로 관리할 수 있으며, 일상 생활의 질을 향상시킬 수 있습니다.

**목적**:
다양한 플래너 기능을 직접 구현하여 사용자에게 개인화된 경험을 제공합니다. 
이 프로젝트는 웹 개발 기술을 실제 상황에 적용하며, 협업을 통한 실무 경험을 쌓는 데에도 중점을 둡니다.

**기술 스택 및 역할**:

- **Spring Boot, Java**: 백엔드 서버 구축 및 비즈니스 로직 처리
- **JPA**: 객체 관계 매핑을 통한 데이터베이스 관리 및 접근 최적화
- **IntelliJ IDEA**: 통합 개발 환경(IDE)으로 코드 작성 및 디버깅
- **Thymeleaf**: 서버 사이드 Java 템플릿 엔진으로 사용자 인터페이스 구축
- **Oracle, JDBC**: 데이터베이스 관리 및 Java 애플리케이션과 데이터베이스의 연결 관리
- **HTML, CSS, JavaScript, jQuery, AJAX**: 프론트엔드 페이지 설계 및 동적 기능 구현

**주차별 목표**:

1. **1주차 (1/15 ~ 1/19)**: 데이터베이스 설계, 인터페이스 설계, 기능에 대한 논의, 문서화 작업
2. **2주차 (1/22 ~ 1/26)**: 데이터베이스 구축 및 연동, 서버와의 연결 설정, 웹 페이지 제작 시작
3. **3주차 (1/29 ~ 2/2)**: 데이터베이스 값 검증, 목표 기능 구현 및 테스트, 페이지 레이아웃 조정 및 수정
4. **4주차 (2/5 ~ 2/9)**: 목표 기능 검증 및 튜닝, 추가 기능 개발, 사용자 인터페이스 다듬기
5. **마무리 (2/12 ~ 2/16)**: 버그 수정, 최종 문서 작업 및 프로젝트 마무리

**기능**:

- **목표 기능(필수)**:
    - 로그인, 회원가입, 마이페이지 구현
    - CR (생성과 조회): 로그인 및 회원가입 기능에 이메일 인증 포함
    - UD (업데이트와 삭제): 마이페이지 관리 및 캘린더 페이지 내 일정 관리
    - 달력, 날짜, 시간, 장소 관리를 위한 https://fullcalendar.io/demos 캘린더 API 활용
    - 일정 CRUD (추가, 조회, 수정, 삭제)
    - 알림 기능: 일정 목록에 대한 알림 표시
- **추가 기능(선택)**:
    - SNS 연동: 네이버, 카카오, 구글
    (참고: https://developers.naver.com/docs/login/devguide/devguide.md)
    - 실시간 날씨 정보 표시
    - 실시간 데이터 반영
    - 다른 사용자에게 일정 공유 및 메일 전송 기능
    
    ```java
    com.example
    **├── config**
    │   ├── RestTemplateConfig.java
    │		├── SecurityConfig.java
    │   └── UserPasswordEncoder.java
    ├**── controller**
    │   ├── HomeController.java
    │		├── UserController.java
    │		├── UserApiController.java
    │   └── PlannerApiController.java
    ├**── domain**
    │   ├── Alarm.java
    │   ├── Plan.java
    │   ├── SnsInfo.java
    │   ├── User.java
    │   └── UserLog.java
    **├── dto**
    │   ├── EventDto.java
    │   └── LoginDto.java
    ├─**─ emailverify**
    │   ├── EmailConfig.java
    │   ├── EmailService.java
    │   └── EmailVerificationController.java
    ├**── oauth2**
    │   ├── exception
    │   ├── handler
    │   ├── service
    │   ├── user
    │   ├── util
    │   └── HttpCookieOauth2AuthorizationRequestRepository.java
    ├── **repository**
    │   ├── PlannerRepository.java
    │   ├── SnsInfoRepository.java
    │   ├── UserLogRepository.java
    │   └── UserRepository.java
    ├── **service**
    │   ├── PlannerService.java
    │   └── UserService.java
    ├── **util**
    │   └── BooleanToNumberConverter.java
    └── PlannerApplication.java
    ```
    
    ### 1. 로그인, 회원가입 페이지
    
    ### 1-1 도메인창
    
    - **내용**: 서비스 소개, 플래너 사용법, 주요 기능 소개 등.
    - **디자인 요소**: 플래너 관련 이미지 및 아이콘, 서비스 로고.
    - **구성 요소**: Header (네비게이션 포함), Footer (저작권 정보, 연락처 정보).
    
    ### 1-2 로그인창
    
    - **기능**: 사용자 이메일 및 비밀번호 입력을 통한 로그인 처리.
    - **유효성 검사**: 입력된 사용자 정보의 유효성 검사.
    - **세션 처리**: 로그인 상태 유지를 위한 세션 처리.
    - **SNS 연동**: 네이버, 구글, 카카오 등 SNS 계정을 통한 로그인 지원.
    
    ### 1-3 회원가입창
    
    - **회원가입 처리**: 사용자 정보 입력 및 처리.
    - **유효성 검사**: 입력된 회원 정보의 유효성 검사 (예: 이메일 형식, 비밀번호 강도).
    - **이메일 중복검사**: 기존 회원 데이터와의 중복 검사.
    - **이메일 인증**: 회원가입 절차의 일환으로 이메일 인증 처리.
    
    ### 1-4 비밀번호 찾기창
    
    - **이메일 인증**: 사용자 식별을 위한 이메일 인증 절차.
    - **비밀번호 변경**: 인증 후 비밀번호 변경 기능.
    
    ### 2. 플래너 페이지
    
    ### 2-1 메인 플래너
    
    - **이벤트 CRUD**: 생성, 조회, 수정, 삭제 기능.
    - **이벤트 상호작용**: 클릭, 드래그, 리사이즈를 통한 이벤트 관리.
    - **이벤트 고급 기능**: 월간, 주간, 일간, 리스트 일정, 반복 일정, 알람 설정.
    - **Google Calendar 연동**: Google Calendar와의 일정 동기화.
    
    ### 2-2 일정 입력 폼
    
    - **데이터 연동**: 입력된 이벤트 데이터를 Oracle DB와 연동.
    - **유효성 검사**: 입력된 이벤트 데이터의 유효성 검사.
    - **서버 CRUD 연동**: 백엔드 서버와의 CRUD 연동 처리.
    
    ### 2-3 미니 플래너
    
    - **동기화**: 메인 캘린더와 동기화되어 표시되는 미니 캘린더.
    - **기능**: 메인 플래너의 요약 보기 및 빠른 날짜 이동 기능.
    
    ## 담당기능
    
    **김강민 : 엔티티, SNS 연동(Foreign Key, DB 세팅, Oauth, Security)**
    
    **노용철 : 유효성 검사, 로그인, 회원가입 처리(login, signup, passwordUpdate)**
    
    **민애경 : 이메일 인증, 페이지 설계 (index, header, footer, domain)**
    
    **이범신 : 미니플래너, 구글플래너, 입력폼(API), 유효성처리(날짜 및 시간)**
    
    **최재호 : 메인플래너, 서버, DB연동(AJAX, event 함수, 필요 & 사용 속성)**
    
    ## **기능구현**
    
    ### **프로젝트 구성 요소 및 팀원 역할 분담**
    
    ### **김강민**
    
    - **담당 기능**: 엔티티 설계, SNS 연동
    - **세부 업무**:
        - 데이터베이스 스키마 설계 및 설정
        - 외래 키와 데이터베이스 설정
        - OAuth를 이용한 SNS 로그인 기능 구현 (네이버, 구글, 카카오)
        - Spring Security를 활용한 인증 및 보안 설정
    - **담당 클래스**:
        - domain: User, SnsInfo
        - config: SecurityConfig
        - oauth2: 관련 모든 패키지 및 클래스
    - **설명**: 시스템의 보안 구성과 사용자 인증을 담당합니다.
    - User와 SnsInfo 엔티티를 설계하여 사용자 데이터와 SNS 로그인 정보를 관리합니다. SecurityConfig 클래스를 통해 시스템의 보안 설정을 구성하며,
    - oauth2 패키지 내의 클래스들을 사용하여 OAuth2를 통한 SNS 로그인 기능을 구현합니다.
    
    ### **노용철**
    
    - **담당 기능**: 유효성 검사, 로그인 및 회원가입 처리
    - **세부 업무**:
        - 클라이언트 및 서버 측에서의 유효성 검사 로직 구현
        - 로그인 및 회원가입 기능 구현
        - 비밀번호 갱신 로직 개발
    - **담당 클래스**:
        - controller: UserController, UserApiController
        - service: UserService
        - dto: LoginDto
    - **설명**: 사용자 관리 기능을 담당합니다. UserController와 UserApiController를 통해 로그인, 회원가입 요청을 처리합니다.
    - UserService에서는 로그인 및 회원가입 로직을 구현하며, LoginDto를 사용하여 로그인 데이터의 전달을 관리합니다.
    
    ### **민애경**
    
    - **담당 기능**: 이메일 인증 유효성 구현, 페이지 디자인
    - **세부 업무**:
        - 이메일을 이용한 사용자 인증 시스템 구현
        - 웹사이트의 메인 페이지, 헤더, 푸터, 도메인 소개 페이지 디자인
    - **담당 클래스**:
        - emailverify: EmailConfig, EmailService, EmailVerificationController
        - controller: HomeController
    - **설명**: 이메일 인증 유효성 구현 및 프로젝트의 프론트엔드 디자인을 담당합니다. EmailVerificationController를 통해 이메일 인증 관련 요청을 처리하고,
    - EmailService에서 이메일 인증 로직을 구현합니다. HomeController를 통해 메인 페이지와 도메인 소개 페이지의 라우팅을 관리합니다.
    - SMTP, Application, build Gradle 설정, Controller, Service, Config
    - 이메일 인증 => 이메일주소 수집 -> 인증번호 생성 -> 저장 -> 전송 -> 인증코드 입력 -> 검증 -> 유효하면 삭제
    - 인덱스,헤더,푸터
    - 
    
    ### **이범신**
    
    - **담당 기능**: 미니 플래너, Google Calendar 연동, 입력 폼 및 유효성 검사
    - **세부 업무**:
        - 미니 플래너 개발 및 메인 캘린더와의 동기화 구현
        - Google Calendar API를 활용한 일정 동기화 기능 구현
        - 이벤트 입력 폼 개발 및 날짜 및 시간에 대한 유효성 검사 로직 구현
    - **담당 클래스**:
        - controller: PlannerApiController
        - service: PlannerService
        - dto: EventDto
    - **설명**: 플래너 기능의 핵심을 담당합니다. PlannerApiController를 통해 플래너 관련 요청을 처리하고, PlannerService에서는 이벤트 CRUD 로직을 구현합니다.
    - EventDto는 이벤트 데이터 전달을 위해 사용됩니다. 또한, Google Calendar API와의 연동을 구현하여 외부 캘린더와의 일정 동기화를 지원합니다.
    
    ### **최재호**
    
    - **담당 기능**: 메인 플래너, 서버 및 DB 연동
    - **세부 업무**:
        - 메인 플래너의 이벤트 CRUD 기능 개발
        - AJAX를 이용한 비동기 서버 통신 구현
        - 백엔드 서버와 Oracle DB 간의 데이터 연동 로직 개발
    - **담당 클래스**:
        - repository: PlannerRepository, UserRepository
        - util: BooleanToNumberConverter
    
    **설명**
    
    : 백엔드 서버와 데이터베이스 연동을 담당합니다. PlannerRepository와 UserRepository를 통해 데이터베이스와의 CRUD 작업을 수행합니다.
   BooleanToNumberConverter는 데이터베이스 저장 시 Boolean 값을 숫자로 변환하는 데 사용되는 유틸리티 클래스입니다.
