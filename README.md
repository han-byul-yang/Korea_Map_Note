# :pushpin: korea map note
방문한 위치에 마커로 나만의 노트를 남기는 메모 지도 사이트

## 1. 배포 사이트
https://korea-map-note.netlify.app

## 2. 제작 기간 & 참여 인원
- 2022.9.13 - 11.28(+ 리팩토링)
- 개인 프로젝트

## 3. 사용 기술 및 라이브러리
- react v18
- typescript
- **라우팅**
  - react-router-dom v6
- **스타일**
   - scss
   - css module
- **상태 관리**
  - recoil
- **코딩 컨벤션**
   - eslint
   - prettier
   - stylelint
- **Api**
   - axios
   - tanstack-query v4
- **Auth & DB**
   - firebase v9
- **기타**
   - react-kakao-maps-sdk
   - react-slick
   - dayjs
   - react-datepicker

## 4. 화면 예시 및 구현 방법

### 4.1 로그인/회원가입
#### 4.1.1 회원가입

![ezgif com-gif-maker (57)](https://user-images.githubusercontent.com/67466789/210095985-82d0b786-d9cd-44df-a15d-12ed09b2f1e0.gif)

- 이메일과 `최소 한 개 이상의 문자와 숫자로 8자 이상의 비밀번호`를 입력하고 회원가입 버튼을 누르면 회원가입이 된다. 이후 자동으로 로그인이 된 후, 지도 노트 메인 화면으로 이동한다. 
- 가입 이메일이 이미 있는 경우/ 가입 과정에서 오류가 있는 경우 에러 메세지 모달을 띄워준다. 

#### 4.1.2 로그인

![ezgif com-gif-maker (58)](https://user-images.githubusercontent.com/67466789/210096143-aea82157-eb5a-44c3-b063-0f38d296cee0.gif)

- 회원가입한 이메일 및 비밀번호를 입력하면 지도 노트 화면으로 이동한다.  
- 가입 이메일이 없는 경우/ 가입 비밀번호가 틀린 경우/ 유저가 없는 경우/ 가입 과정에서 오류가 있는 경우 에러 메세지 모달을 띄워준다.

### 4.2 메모 위치 선택을 위한 지도 위에 마커 띄우기
- 지도 위에 마커를 띄워서 해당 위치에 메모를 작성할 수 있다.

#### 4.2.1 사용자 위치 지도 마커 표시 
현재 위치 수집 허용 -> 현재 위치 파악 -> 지도에 마커 표시
/사진
- 위치 정보를 수집할 수 없거나, 위치 수집 허용을 불허가하면 에러 메세지 모달을 띄워준다.

#### 4.2.2 지도에 직접 지도 마커 표시
지도 위 특정 위치 클릭 -> 지도에 마커 표시 

![ezgif com-gif-maker (48)](https://user-images.githubusercontent.com/67466789/210060559-de224c09-84c8-4858-881a-5a7afbc1724e.gif)

- 지도 위를 직접 클릭을 하면 원하는 마커의 위치를 선택할 수 있다. 
- 선택 시 지도의 줌인을 통해 구체적인 지명을 확인할 수 있다. 

#### 4.2.3 검색으로 지도 마커 표시
장소 검색 -> 지도에 위치 결과 마커 표시

![ezgif com-gif-maker (49)](https://user-images.githubusercontent.com/67466789/210060850-778272e8-0044-4c0f-b902-72de2d8a10be.gif)

- 검색 후 결과로 지도 위 장소 위치에 마커가 표시된다. 

### 4.3 장소 검색
서치 폼에 장소 키워드 입력 -> 드롭다운에서 장소 클릭 -> 지도 줌 인 및 이동, 지도에 마커 표시

![ezgif com-gif-maker (50)](https://user-images.githubusercontent.com/67466789/210061071-06b6b236-d7b5-439e-b8db-9325ed12055c.gif)

- 키워드 장소를 입력하면 드롭다운으로 검색된 장소 결과들이 나열되어 보여진다.
- 드롭다운 목록에서 원하는 장소를 클릭하면 지도가 줌인 되면서 해당 장소의 위치로 이동하고, 그곳에 마커가 표시된다. 

### 4.4 마커의 기본 주소 및 도로명 주소 확인
마커 클릭 -> 기본 주소 및 도로명 주소 인포윈도우 표시

![ezgif com-gif-maker (51)](https://user-images.githubusercontent.com/67466789/210061206-14907cb1-18ad-49d3-8791-c46a27cdef2e.gif)

- 기본 주소나 도로명 주소가 없는 경우 빈칸으로 표시가 된다.  
 
### 4.5 메모 추가
마커 클릭 -> 인포윈도우에서 메모 추가 클릭 -> 메모 추가 폼에 메모 입력 -> 저장 및 `실시간으로` 지도에 사진 마커 표시

![ezgif com-gif-maker (52)](https://user-images.githubusercontent.com/67466789/210063108-a103a25d-7a9f-4377-a65e-205027bca678.gif)

- 메모 입력 후 메모 추가 버튼을 클릭하면 저장 여부 확인 모달이 띄워진다. 확인 버튼을 누르면 성공적으로 저장이 되었다는 안내 모달과 함께 메모가 `실시간으로` 생성된다. 
  
  > firebase/firestore의 onSnapshot을 사용하여 firestore의 데이터 변경을 실시간으로 감지하도록 하였다. 이로서 메모 추가 시 지도에 실시간으로 마커가 표시된다. :round_pushpin: [코드 보기](https://github.com/han-byul-yang/Korea_Map_Note/blob/45db1fcfb892d112c8792ae37fa815f8010bccb3/src/routes/Main/KaKaoMap/index.tsx#L59)

#### 4.5.1 장소 이름
- 장소 이름의 경우 필수로 작성해야한다. 미 입력 후 메모 추가 버튼 클릭 시 안내 모달이 띄워진다. 
- 검색을 통해 표시된 마커에 메모를 추가를 하는 경우 장소 이름이 검색된 장소 이름으로 자동 입력된다. 또한 이는 변경이 가능하다.

#### 4.5.2 메모 내용 

#### 4.5.3 해시태그 & 색상 변경
- 해시태그의 색상을 선택할 수 있다. 
- 중복되는 해시태그를 입력한 경우 자동으로 입력이 되지 않는다. 
- 입력한 해시태그를 클릭하면 해당 해시태그는 삭제가 된다. 

#### 4.5.4 주소 자동 입력
- 기본 주소와 도로명 주소는 자동으로 입력이 된다. 

#### 4.5.5 날짜 선택
- 하루를 선택할 수도, 기한으로 선택할 수도 있다. 

#### 4.5.6 사진 추가 
- 사진 업로드는 4장이 최대이다. 4장 이상 업로드를 하게 되면 에러 메세지 모달이 띄워진다. 
- 미리 보기로 사진과 이름을 확인할 수 있으며 삭제가 가능하다. 

### 4.6 메모 수정
메모 보기 폼에서 수정을 원하는 메모의 설정 클릭 -> 메모 수정 선택 -> 메모 수정 폼에 메모 수정 -> 수정 및 `실시간으로` 지도에 사진 마커 수정

![ezgif com-gif-maker (53)](https://user-images.githubusercontent.com/67466789/210064093-cf181b75-a6b1-44cf-b380-84ae1646df58.gif)

- 메모 입력 후 메모 수정 버튼을 클릭하면 수정 여부 확인 모달이 띄워진다. 수정 버튼을 누르면 성공적으로 수정이 되었다는 안내 모달과 함께 메모가 `실시간으로` 수정된다. 
- 메모 수정 폼이 열리면서 메모의 여행 장소, 태그, 여행 날짜, 내용, 장소, 사진이 폼에 자동으로 표시된다. 
  
    > firebase/firestore의 onSnapshot을 사용하여 firestore의 데이터 변경을 실시간으로 감지하도록 하였다. 이로서 메모 수정 시 지도에 실시간으로 마커가 표시된다. :round_pushpin: [코드 보기](https://github.com/han-byul-yang/Korea_Map_Note/blob/45db1fcfb892d112c8792ae37fa815f8010bccb3/src/routes/Main/KaKaoMap/index.tsx#L59)

### 4.7 메모 보기
마커 클릭 -> 인포윈도우에서 메모 보기 클릭 -> 메모 보기 폼 오픈

![ezgif com-gif-maker (54)](https://user-images.githubusercontent.com/67466789/210064449-3fb69643-229d-49b8-a1b7-0806c6827943.gif)

- 선택한 마커의 위치에 저장했던 메모들이 나열되어 보여진다.
- 저장했던 메모의 여행 장소, 여행 날짜, 태그, 내용이 보여진다.  
  
  > text를 인자로 받아 줄바꿈이 적용된 트리요소로 리턴해주는 재사용 가능한 util 함수를 생성하였다. :round_pushpin: [코드 보기](https://github.com/han-byul-yang/world_map_note/blob/45db1fcfb892d112c8792ae37fa815f8010bccb3/src/utils/organizedText.tsx#L3)

- 업로드 날짜(~분 전, ~시간 전)가 메모의 하단에 표시된다. 

  > date(타입은 string)를 인자로 받아 받은 date가 현재 시간 기준 얼마나 지났는지 리턴해주는 재사용 가능한 updateDate util 함수를 생성하였다. 24시간이 지났으면 일자를 기준으로, 지나지 않은 경우 초, 분, 시간을 기준으로 리턴해준다. :round_pushpin: [코드 보기](https://github.com/han-byul-yang/world_map_note/blob/45db1fcfb892d112c8792ae37fa815f8010bccb3/src/utils/updatedDate.ts#L3)

### 4.7.1 메모의 사진 크게 보기

![ezgif com-gif-maker (55)](https://user-images.githubusercontent.com/67466789/210064587-f959345c-c682-4cc2-ac0a-621185e5d6ca.gif)

- 메모의 사진을 클릭하면 사진을 큰 크기로 확인할 수 있다. 
- 두 개 이상의 사진의 경우 옆으로 넘기면서 확인할 수 있다. 

### 4.8 메모 삭제
메모 보기 폼에서 삭제를 원하는 메모의 설정 클릭 -> 메모 삭제 선택 -> 삭제 및 `실시간으로` 지도에서 사진 마커 제거

![ezgif com-gif-maker (56)](https://user-images.githubusercontent.com/67466789/210064678-a4106d08-9883-47b1-9040-0b92c1c27008.gif)

- 설정에서 메모 삭제를 선택하면 삭제 여부 확인 모달이 띄워진다. 확인 버튼을 누르면 메모가 `실시간으로` 삭제된다. 

### 4.9 모바일 화면
#### 4.9.1 장소 검색
![ezgif com-gif-maker (59)](https://user-images.githubusercontent.com/67466789/210096748-142fca3f-9468-430a-8b7d-720619b6e83f.gif)

#### 4.9.2 메모 추가
![ezgif com-gif-maker (61)](https://user-images.githubusercontent.com/67466789/210097037-afb61f00-ad80-4d94-8447-9bd4ac72d2e3.gif)

#### 4.9.3 메모 수정
![ezgif com-gif-maker (62)](https://user-images.githubusercontent.com/67466789/210098223-0a98ed8d-758d-4b9e-8c18-3259b2ae650e.gif)

#### 4.9.4 메모 보기
![ezgif com-gif-maker (63)](https://user-images.githubusercontent.com/67466789/210098333-7f480c48-684b-4b13-b836-299532195efd.gif)


## 5. 트러블 슈팅 & 고민한 부분
### 5.1. tanstack query 디바운싱 적용 :bookmark_tabs:[블로그 글](https://velog.io/@han-byul-yang/world-map-note-%EA%B0%9C%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B84)
 불필요한 ajax 요청을 피하기 위해 장소 서치 시 유저의 타이핑 사이에 일정한 간격이 생겼을 때 api 요청을 해주고 싶었다. 하지만 호출 시 사용하는 tanstack query useQuery의 option에는 이럴 때 사용할 수 있는 디바운싱 기능을 제공하고 있지 않았다. 이에 query key에 디바운싱이 적용된 키워드를 전달하여, 마지막 키워드 입력 시간이 앞 입력 시간과 300ms이상 차이가 날 때 useQuery는 api 호출을 해주게 하였다.

### 5.2. 기타
  - Api 호출 시 인풋창에 캐싱 적용하여 로딩 시 나타나는 드롭다운 깜빡임 현상 해결
  - Target를 제외한 바깥 요소 클릭 시 어떠한 동작을 해줄 수 있도록 하는 useClickOutside hook 생성으로 로직 중복 제거 및 재사용성 증가
  - 특정 화면 크기 여부(모바일, 태블릿)를 확인할 수 있는 useResize hook 생성으로 로직 중복 제거 및 재사용성 증가
  - 메세지 종류(에러, 안내, 경고)에 따른 모달을 띄워줄 수 있는 재사용 가능한 MessageModal 생성
