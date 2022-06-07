let appStoreLogo = $("#app-store-logo");

const shareData = {
 
    text: 'Learn web development on MDN!',
    url: `${window.location.href}`
  }

  const b = document.querySelector('#logo-container');
  

  // Share must be triggered by "user activation"
  b.addEventListener('click', async () => {
   window.location.assign(`https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`)
//       window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&t=${shareData.text}`);
//     try {
//       await navigator.share(shareData)
     
//     } catch(err) {
//       console.log(err)
//     }
  });

function getMobileOperatingSystem() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }

  return "android";
}

// Check for device OS and show app store image according to respective device
if (getMobileOperatingSystem() === "ios") {
  $(appStoreLogo).attr("src", "images/apple-store-logo.png");
} else {
  console.log(getMobileOperatingSystem());
  $(appStoreLogo).attr("src", "images/icon-google play.png");
}

let video = document.querySelector(".video");
let btn = $(".play-pause");
let t;

let pileSelected = false;

if (video) {
  let openFirst = true;
  $(".play-pause").click(function () {
    // $(video).attr('src', 'images/Astro-deepak.mp4')
    if (openFirst) {
      $("#controls").removeClass("hide");
      openFirst = false;
      $(".button button").fadeOut();
      $("#fullscreen-toggle").css("display", "block");
    }

    if (video.paused) {
      $(".button button").fadeOut();

      btn.removeClass("play");

      btn.addClass("pause");
      $(".button button").removeClass("pause");
      video.play();
      if (t) {
        clearTimeout(t);
      }
      $(".controls").fadeIn();

      //$('.button button').fadeIn();
    } else {
      btn.removeClass("pause");
      btn.addClass("play");
      video.pause();
    }
  });

  $("#video-container").click(function () {
    $(".controls").fadeIn();
    //$('.button button').fadeIn();
    $("#toggle-fullscreen").css("display", "block");

    if (t) {
      clearTimeout(t);
    }
    if (video.paused) {
      return;
    }

    t = setTimeout(() => {
      $(".controls").fadeOut();
      $("#toggle-fullscreen").css("display", "none");

      $(".button button").fadeOut();
    }, 3000);
  });

  video.addEventListener("timeupdate", function () {
    let progress = video.currentTime / video.duration;
    $(".progress").css("width", `${progress * 100 + "%"}`);
    let distance = video.duration - video.currentTime;

    let { mins, sec } = getTimeLeft(distance);

    $("#time-remaining").text(mins + ":" + sec);

    if (video.ended) {
      if (t) {
        clearInterval(t);
      }

      $(".controls").fadeIn();
      btn.removeClass("pause");
      btn.addClass("play");
      let { mins, sec } = getTimeLeft(video.duration);
      $("#time-remaining").text(mins + ":" + sec);

      // if pile is viewed once dont show pile selection again
      if (pileSelected) {
        $(".button button").fadeIn();
        return;
      }

      $("#overlay-options").removeClass("hide-overlay");

      $("#overlay-options").addClass("show-overlay");
    }
  });

  $(".progress-bar").click(function (e) {
    var rt = $(".progress-bar").outerWidth();

    var xPos = e.pageX - $(this).offset().left;
    $(".progress").css("width", xPos);

    video.currentTime = xPos * (video.duration / rt);
  });

  video.addEventListener("loadedmetadata", function () {
    let { mins, sec } = getTimeLeft(video.duration);
    $("#time-remaining").text(mins + ":" + sec);
  });

  function getTimeLeft(distance) {
    let mins = Math.floor((distance % (60 * 60)) / 60);
    let seconds = Math.floor(distance % 60);
    let sec = seconds < 10 ? "0" + seconds : seconds;

    const obj = {
      mins,
      sec,
    };
    return obj;
  }
}

// perform pile selection tasks
const pile1 = $("#pile1");
const pile2 = $("#pile2");
const pile3 = $("#pile3");
pile1.click(() => {
  pileSelected = true;
  $(video).attr("src", "images/pile1.mp4");
    video.onloadedmetadata = function() {
        video.play();
        openFirst = true;
        $("#overlay-options").removeClass("show-overlay");
        $("#overlay-options").addClass("hide-overlay");
        btn.removeClass("play");
        btn.addClass("pause");
    };
    
});
pile2.click(() => {
  pileSelected = true;

  $(video).attr("src", "images/pile2.mp4");
  video.onloadedmetadata = function() {
    video.play();
    openFirst = true;
    $("#overlay-options").removeClass("show-overlay");
    $("#overlay-options").addClass("hide-overlay");
    btn.removeClass("play");
    btn.addClass("pause");
};
});
pile3.click(() => {
  pileSelected = true;

  $(video).attr("src", "images/pile3.mp4");
  video.onloadedmetadata = function() {
    video.play();
    openFirst = true;
    $("#overlay-options").removeClass("show-overlay");
    $("#overlay-options").addClass("hide-overlay");
    btn.removeClass("play");
    btn.addClass("pause");
};
});



let el = document.getElementById("comments-container");

if (isScrolledIntoView(el)) {
  $("#post-comment").addClass("post-comment-show");
}

$(window).scroll(function () {
  let el = document.getElementById("comments-container");

  if (isScrolledIntoView(el)) {
    $("#post-comment").addClass("post-comment-show");
    return;
  } else if ($("#post-comment").hasClass("post-comment-show")) {
    $("#post-comment").removeClass("post-comment-show");
  }
});

function isScrolledIntoView(el) {
  let rect = el.getBoundingClientRect();
  let elemTop = rect.top;
  let elemBottom = rect.bottom;

  let isVisible = elemTop <= window.innerHeight - 40;

  return isVisible;
}
