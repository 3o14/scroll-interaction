(() => {

    let yOffset = 0; // window.scrollY 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 높이의 합
    let currentScence = 0; // 현재 활성화된 섹션 인덱스

  // 한 scroll-section에 담을 정보 리스트
  const scenceInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        //objs: 화면에 표시할 각 section별 객체 담음
        // container 섹션의 아이디를 담음
        container: document.querySelector("#scroll-section-0"),
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    for (let i = 0; i < scenceInfo.length; i++) {
      // 각 scroll section의 높이 세팅 = heightNum(지정한 비율) * 화면의 높이
      scenceInfo[i].scrollHeight = scenceInfo[i].heightNum * window.innerHeight;
      // 각 section의 높이를 지정
      scenceInfo[
        i
      ].objs.container.style.height = `${scenceInfo[i].scrollHeight}px`;
    }
    console.log("window.innerHeight: ", window.innerHeight);
    console.log(scenceInfo);
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScence; i++) {
      prevScrollHeight += scenceInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + scenceInfo[currentScence].scrollHeight) {
        currentScence++;
        console.log(currentScence);
    }

    if (yOffset < prevScrollHeight) {
        if(currentScence == 0) return;
        currentScence--;
    }
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.scrollY;
    scrollLoop();
  });

  setLayout();
})();
