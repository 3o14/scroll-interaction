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
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: { // css값 정리
        messageA_opacity: [0, 1], // messageA의 투명도의 시작값, 종료값
      }
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

    let totalScrollHeight = 0;
    // 아무 곳에서 새로고침 했을 때 현재 currentScence 설정
    for (let i = 0; i < scenceInfo.length; i++) {
      totalScrollHeight += scenceInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScence = i;
        break;
      }
    }

    document.body.setAttribute("id", `show-scene-${currentScence}`);
  }


  function playAnimation() {
    switch(currentScence) {
        case 0:
            console.log("0 paly");
            break;
        
        case 1:
            console.log("1 paly");
            break;
        
        case 2:
            console.log("2 paly");
            break;
        
        case 3:
            console.log("3 paly");
            break;
        
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScence; i++) {
      prevScrollHeight += scenceInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + scenceInfo[currentScence].scrollHeight) {
      currentScence++;
      console.log(currentScence);
      //   document.body.setAttribute("id", `show-scene-${currentScence}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScence == 0) return;
      currentScence--;
      //   document.body.setAttribute("id", `show-scene-${currentScence}`);
    }

    document.body.setAttribute("id", `show-scene-${currentScence}`);

    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.scrollY;
    scrollLoop();
  });

  // setLayout() : 각 scroll-section 높이 설정
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout); // 이미지나 영상 등의 파일이 화면에 로드 된 후에 setLayout을 실행하기 위함
})();
