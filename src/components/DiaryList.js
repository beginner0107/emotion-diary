const DiaryList = ({ diaryList }) => {
  diaryList = diaryList.map((it) => {
    return <div key={it.id}>{it.content}</div>;
  });

  return <div>{diaryList}</div>;
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
