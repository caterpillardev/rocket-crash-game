import S from "./index.module.scss";

const LoadingPage = () => {
  return (
    <div className={S.root}>
      <div className={S.container}>
        <div className={S.container_text}>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
