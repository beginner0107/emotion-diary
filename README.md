# React App 으로 일기장 만들기(연습)

<h2>5/15일</h2>

1. "react-router-dom" 추가
2. Edit, New, Diary, Home 페이지 생성
3. RouteTest 컴포넌트 생성 -> App.js에서 import 페이지 이동 기능 추가
4. header 날짜 조정 기능, + - 버튼, 일정에 맞는 리스트를 DiaryList 컴포넌트 넘기는 부분
5. 일정에 맞는 일기를 메인 화면에 보여주는 컴포넌트 완성
<img width="499" alt="image" src="https://user-images.githubusercontent.com/81161819/169503468-68292c1d-8e04-4a27-bc1f-9e24ee6c9328.png">

<h2> 5/16일</h2>
1. 일기를 작성, 수정에 필요한 DiaryEditor 컴포넌트 추가<br/>
2. /home, /new, /edit page에 감정 선택을 보여줄 수 있는 EmotionItem 컴포넌트 추가<br/>
3. 일기 날짜별 정렬, 감정 점수 별 정렬, 일기 목록 보여주는 기능 추가(<strong>정렬 기능</strong>)
<img width="480" alt="image" src="https://user-images.githubusercontent.com/81161819/169506221-db645b5f-9d7d-4999-82e7-569f80a7e316.png">
<img width="484" alt="image" src="https://user-images.githubusercontent.com/81161819/169506246-36a85ea1-9335-4d95-9a2d-7e37f30f0706.png">
<img width="516" alt="image" src="https://user-images.githubusercontent.com/81161819/169506278-d9b0ac06-649e-4a6a-b200-2c0888b21da5.png">

<h2> 5/17일</h2>
1. 일기 수정 페이지(/edit)을 완성하기 위해 DiaryEditor 컴포넌트를 수정
<img width="512" alt="image" src="https://user-images.githubusercontent.com/81161819/169507526-dae8beea-32e0-42d6-b447-62e9ca1e1c61.png">
2. 일기 상세보기 페이지(/diary) useContext를 사용하셔 diaryList를 가지고 오고 이를 화면에 보여주는 기능 추가

```javascript
 const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);
```
3. 불필요하게 랜더링 되는 부분을 useMemo를 통해 수정
 - /home page에서 날짜를 변경 했을 때, 불필요하게 DiaryItem이 다시 랜더링 되는 부분
 - /new /edit page에서 DiaryEditor의 자식 컴포넌트인 EmotionItem이 재 랜더링 되는 부분(useCallback 사용)
4. 각 페이지 title 변경
5. 파이어베이스를 통한 배포<br/>
https://ahn-inflearn-project.web.app/


<h2>사용한 React기술 정리</h2>

 - React에서 사용자 입력을 처리할 수 있는 useStae함수
 - useRef를 통한 유효성 체크 로직 작성 - 아무것도 입력하지 않으면 자동으로 focus
![image](https://user-images.githubusercontent.com/81161819/169510910-2b3ae291-a9b5-4578-a748-bece51a18c02.png)

- React Lifecycle(생애주기)을 제어할 수 있는 useEffect
![image](https://user-images.githubusercontent.com/81161819/169510712-06199c42-d08d-48e9-83c7-b57d59fed0d0.png)

* Mount : 화면에 나타나는 것 : 초기화 작업<br>
* Update : 업데이트(리렌더) : 예외 처리 작업<br>
* unMount : 화면에서 사라지는 것 : 메모리 정리 작업<br>

- 연산결과를 재사용하는 useMemo : 불필요하게 재 랜더링 되는 부분을 해결(Memorization)
- React.memo : 고착 컴포넌트(컴포넌트 재사용)
- useCallback() : 함수 메모이제이션, React컴포넌트 함수 안에 함수가 선언이 되어 있을 때 해당 컴포넌트가 랜더링될 때마다 새로운 함수가 생성되는 부분을 해결할 수 있게 해주는 함수.
- 복잡한 상태 관리 로직 분리하는 useReducer
![image](https://user-images.githubusercontent.com/81161819/169514673-53f76f3a-c2a7-4929-b73c-c223c68424a6.png)
- 거쳐가기만 하는 Prop들을 Context(문맥)으로 관리하는 useContext
