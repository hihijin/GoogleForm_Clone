# Google Form clone하여 주요 기능 구현하기

구글 설문조사 기능을 만듭니다. (상위 메뉴바는 구현대상에서 제외입니다) 
1. 설문지 제목, 설명 추가, 편집
2. 질문을 추가하면 질문이 추가됩니다.
3. 질문 복사 기능
4. 질문 삭제 기능
5. 필수 옵션 설정 기능 (단답형, 장문형, 객관식 질문, 체크박스, 드롭다운)
6. 미리 보기 기능에서 해당 설문지를 미리볼 수 있어야 합니다
7.  [제출] 버튼 눌렀을 경우 사용자가 작성한 데이터를 보여 줍니다.
8.  양식 지우기
9.  질문 순서 변경 (드레그엔 드랍) 

---

### **실행 방법**

```bash
npm install
npm run start
```



### 폴더 구조
```
GoogleForm_Clone
    src
     ├─ components
     │  ├─ answer
     │  │  ├─ Answer1.tsx
     │  │  ├─ Answer2.tsx
     │  │  ├─ Answer3.tsx
     │  │  ├─ Answer4.tsx
     │  │  └─ Answer5.tsx
     │  ├─ preview
     │  │  ├─ PreSubmit.tsx
     │  │  ├─ PreviewQuestion.tsx
     │  │  └─ PreviewTitle.tsx
     │  ├─ question
     │  │  ├─ Question.tsx
     │  │  ├─ Questions.tsx
     │  │  └─ QuestionTitle.tsx
     │  ├─ sidebar
     │  │  └─ Sidebar.tsx
     │  └─ submit
     │     ├─ SubmitBtn.tsx
     │     └─ SubmitTitle.tsx
     ├─ pages
     │  ├─ Loading.tsx
     │  ├─ Mainpage.tsx
     │  ├─ Preview.tsx
     │  └─ SubmitPage.tsx
     ├─ react-app-env.d.ts
     ├─ reducer
     │  ├─ nowQuestionReducer.ts
     │  ├─ QuestionReducer.ts
     │  └─ TitleReducer.ts
     ├─ store
     │  └─ Store.ts
     └─ type
     │  ├─ Ianswer.ts
     │  ├─ Iquestion.ts
     │  └─ Ititle.ts
     ├─ Global.css
     ├─ index.tsx
     └─ App.tsx

```

### Tech
- React
- TypeScript
- Redux toolkit
- Styled-components
- MUI
- eslint
- prettier

### Dependencies
```
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@material-ui/core": "^4.12.4",
    "@material-ui/icons": "^4.11.3",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.13.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.36",
    "@types/react": "^18.2.12",
    "@types/react-dom": "^18.2.5",
    "@types/react-router-dom": "^5.3.3",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.0",
    "react-router-dom": "^6.13.0",
    "react-scripts": "5.0.1",
    "react-spinners": "^0.13.8",
    "redux-persist": "^6.0.0",
    "styled-components": "^6.0.0-rc.3",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
```

---

### 구현 영상 GIF
**1. 설문지 제목, 설명 추가, 편집**
<br/>
![ezgif com-gif-maker](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/c87c47e8-d2c9-4a35-af69-e03a25515595)


**2. 질문을 추가하면 질문이 추가됩니다.**
<br/>
![ezgif com-crop](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/3440aea4-4989-4244-a1d4-82a8a42330d8)

    
**3. 질문 복사 기능**
<br/>
![ezgif com-gif-maker](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/d83951cb-c5ec-4a97-9dc9-a7203f30109e)


**4. 질문 삭제 기능**
<br/>
![ezgif com-crop](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/44a2561e-44dd-475e-969f-8e3474f20440)


**5. 필수 옵션 설정 기능**
<br/>
단답형, 장문형, 객관식 질문, 체크박스, 드롭다운
<br/>
![ezgif com-gif-maker](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/25c475d2-9e94-4e1b-9b5d-92c7058614d4)


**6. 미리 보기 기능에서 해당 설문지를 미리볼 수 있어야 합니다**
<br/>
![ezgif com-gif-maker](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/8875e644-a01c-4b28-aeaa-3e5f1db55d23)


**7.  [제출] 버튼 눌렀을 경우 사용자가 작성한 데이터를 보여 줍니다.**
<br/>
![ezgif com-crop](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/68f03599-725c-4b09-a1ed-27022bc5b8de)


**8.  양식 지우기**
<br/>
![ezgif com-crop](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/aea608aa-8cab-4b57-a6b8-ca7b8bd5167c)


**9.  질문 순서 변경 (드레그엔 드랍)**
<br/>
> react-dnd 라이브러리를 쓰지 않고 구현했습니다.
<br/>

![ezgif com-crop](https://github.com/hihijin/GoogleForm_Clone/assets/117073214/fe619599-da70-4424-8f3f-b04da7b5b984)








