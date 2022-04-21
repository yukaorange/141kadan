$(function () {
  // loading画面
  $(window).on('load', function () {
    endLoading()
  })
  // ローディング非表示処理
  function endLoading() {
    $('.loading').fadeOut(3000)
  }




  // 日付選択カレンダー
  // 選択可能日（始期）を設定
  let minDate = new Date();
  minDate = minDate.setDate(minDate.getDate());

  flatpickr("#flatpickr", {
    locale: "ja", //日本語化
    dateFormat  : 'Y.m.d（D）',//フォーマット
    minDate     : minDate,//選択可能始期
    mode: "range",
  });
  //===========================
  //aos
  //===========================
  AOS.init({
    duration:1000,
    easing:'ease-out',
  });
  //===========================
  // スクロールでサブヘッダー表示
  //===========================
  $(window).scroll(function () {
    // 閾値
    let height = 200;
    // スクロール値を変数に代入
    let scroll = $(this).scrollTop();
    // 閾値とスクロール値を比較し、処理分岐
    if (scroll >= height) {
      $(".sh").addClass("_active");
      $(".sh").removeClass("_inactive");
    } else {
      $(".sh").removeClass("_active");
      $(".sh").addClass("_inactive");
    }
  });
  //===========================
  //トグルボタン/スマホメニュー
  //===========================
  $(".header-toggle,.sh-toggle,.mobile-toggle,.ph-toggle").click(function () {
    // 各所のトグルボタンをクリック(OPEN)
    toggleBtn();
    slideOpen();
  });
  $(".mobile-toggle").click(function () {
    // モバイル時のトグルボタンクリック(CLOSE)
    toggleBtn();
    slideClose();
  });
  $(".mobile-bg").click(function () {
    // モバイル時のスライド背景クリック時(CLOSE)
    toggleBtn();
    slideClose();
  });

  function toggleBtn() {
    $(".toggle-btn").toggleClass("_active");
  }

  function slideOpen() {
    $(".mobile-bg").fadeIn();
    $(".mobile-links").fadeIn();
    $(".body").addClass("no-scroll");
  }

  function slideClose() {
    $(".mobile-bg").fadeOut();
    $(".mobile-links").fadeOut();
    $(".body").removeClass("no-scroll");
  }

  // //===========================
  // //モーダル表示・非表示
  // //===========================
  $("._reserve").click(function () {
    // 予約ボタンクリックでモーダル起動
    ModalOpen();
    return false;
  });
  $(".modal-bg").click(function () {
    // 背景クリックでモーダル閉じ
    ModalClose();
  });
  $(".modal-close").click(function () {
    ModalClose();
  });

  function ModalOpen() {
    $(".modal-bg").fadeIn();
    $(".modal-container").fadeIn();
    $(".body").addClass("no-scroll");
  }

  function ModalClose() {
    $(".modal-bg").fadeOut();
    $(".modal-container").fadeOut();
    $("body").removeClass("no-scroll");
  }

  //===========================
  //フォーム バリデーション
  //===========================
  const submit = $(".form-submit");
  let selected = $('#plan option:selected')
  $("#form input").change(function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('.form-date input[type="text"]').val() !== "" &&
      selected.val() == ""
    ) {
      submit.prop("disabled", false);
      submit.removeClass("_disabled");
    }
    else {
      submit.prop("disabled", true);
      submit.addClass("_disabled");
    }
  });
  // プラットピッカー閉じた時に入力チェック
  $(".modal-container").click(function(){
    formcheck();
  });
  function formcheck (){
    if($('.form-date input[type="text"]').val() ==""){
      submit.prop("disabled", true);
      submit.addClass("_disabled");
    }
  }
  //===========================
  //フォーム送信後
  //===========================
  $("#form").submit(function (event) {
    let formData = $("#form").serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeM_YTBAYQ4JQECgPrI8Fn-qBmCmbz7Tgn4gPpxFl1UDC2OZg/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".form-end").slideDown("slow");
          $(".form-submit").fadeOut("fast");
        },
        200: function () {
          $(".form-false").slideDown();
        },
      },
    });
    event.preventDefault();
  });
  //===========================
  //タブ切り替え
  //===========================

  $(".news-tab").click(function () {
    // クリックされたタブの順番（0はじまり）を変数に格納
    var index = $(".news-tab").index(this);

    //タブのcssのを一旦削除
    $(".news-tab").removeClass("_selected");

    //クリックされたタブにクリック済みcssを適用する
    $(this).addClass("_selected");

    //コンテンツを一旦非表示にし、クリックされた順番のコンテンツのみを表示
    $(".news-list").removeClass("_selected").eq(index).addClass("_selected");
  });
});
